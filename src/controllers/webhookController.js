import Turno from '../models/turno.js';
import Sala from '../models/sala.js';

const verificarSecreto = (req, res) => {
    const secreto = req.headers['x-webhook-secret'];
    if (!process.env.WEBHOOK_SECRET || secreto !== process.env.WEBHOOK_SECRET) {
        res.status(401).json({ error: 'No autorizado' });
        return false;
    }
    return true;
};

// POST /api/webhook/turno
// Llamado desde produccion cuando se crea un turno pendiente
const recibirTurno = async (req, res) => {
    if (!verificarSecreto(req, res)) return;

    try {
        const { nombre, cedula, destino, nombre_sala } = req.body;

        if (!nombre || !cedula || !destino || !nombre_sala) {
            return res.status(400).json({ error: 'Faltan campos requeridos: nombre, cedula, destino, nombre_sala' });
        }

        const sala = await Sala.findByNombre(nombre_sala);
        console.log('[webhook] sala encontrada:', sala);
        if (!sala) {
            return res.status(404).json({ error: `Sala "${nombre_sala}" no encontrada en contingencia` });
        }

        // Si ya existe un turno con esa cedula en estado "En espera", no duplicar
        const existente = await Turno.findByCedula(cedula);
        if (existente && existente.estado === 'En espera') {
            return res.status(409).json({ error: 'Ya existe un turno pendiente con esa cedula', turno: existente });
        }

        console.log('[webhook] creando turno con id_sala:', sala.id);
        const nuevoTurno = await Turno.create({ nombre, cedula, destino, id_sala: sala.id });
        res.status(201).json({ mensaje: 'Turno registrado en contingencia', turno: nuevoTurno });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE /api/webhook/turno/:cedula
// Llamado desde produccion cuando se termina/atiende un turno
const eliminarTurno = async (req, res) => {
    if (!verificarSecreto(req, res)) return;

    try {
        const { cedula } = req.params;

        const turno = await Turno.findByCedula(cedula);
        if (!turno) {
            return res.status(404).json({ error: 'Turno no encontrado en contingencia' });
        }

        await Turno.destroyByCedula(cedula);
        res.status(200).json({ mensaje: 'Turno eliminado de contingencia', cedula });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { recibirTurno, eliminarTurno };
