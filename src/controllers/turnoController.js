import Turno from '../models/turno.js';

const registrarTurno = async (req, res) => {
    try {
        const { nombre, cedula, destino, id_sala } = req.body;
        const nuevoTurno = await Turno.create({ nombre, cedula, destino, id_sala });
        res.status(201).json(nuevoTurno);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerTurnosbyPerfilAtencion = async (req, res) => {
    try {
        const { perfil_atencion } = req.params;
        const turnos = await Turno.findByPerfilAtencion(perfil_atencion);
        res.status(200).json(turnos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerTurnos = async (req, res) => {
    try {
        const turnos = await Turno.findAll();
        res.status(200).json(turnos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const obtenerTurnoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const turno = await Turno.findByPk(id);
        if (turno) {
            res.status(200).json(turno);
        } else {
            res.status(404).json({ error: 'Turno no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizarTurno = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, cedula, destino, id_sala } = req.body;
        const turno = await Turno.findByPk(id);
        if (turno) {
            turno.nombre = nombre;
            turno.cedula = cedula;
            turno.destino = destino;
            turno.id_sala = id_sala;
            await Turno.update(id, { nombre, cedula, destino, id_sala });
            res.status(200).json(turno);
        } else {
            res.status(404).json({ error: 'Turno no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizarEstadoTurno = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const turno = await Turno.findByPk(id);
        if (turno) {
            await Turno.patchEstado(id, estado);
            turno.estado = estado;
            res.status(200).json(turno);
        } else {
            res.status(404).json({ error: 'Turno no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarTurno = async (req, res) => {
    try {
        const { id } = req.params;
        const turno = await Turno.findByPk(id);
        if (turno) {
            await Turno.destroy(id);
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Turno no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarTurnoPorCedula = async (req, res) => {
    try {
        const { cedula } = req.params;
        const turno = await Turno.findByPk(cedula);
        if (turno) {
            await Turno.destroyByCedula(cedula);
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Turno no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizarTurnoPorCedula = async (req, res) => {
    try {
        const { cedula } = req.params;
        const { nombre, destino, id_sala, estado } = req.body;
        const turno = await Turno.findByCedula(cedula);
        if (turno) {
            turno.nombre = nombre;
            turno.destino = destino;
            turno.id_sala = id_sala;
            turno.estado = estado;
            await Turno.updateByCedula(cedula, { nombre, destino, id_sala, estado });
            res.status(200).json(turno);
        } else {
            res.status(404).json({ error: 'Turno no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerTurnosbyPerfilAtencionYSala = async (req, res) => {
    try {
        const { perfil_atencion, id_sala } = req.params;
        const turnos = await Turno.getTurnosByPerfilAtencionYSala(perfil_atencion, id_sala);
        res.status(200).json(turnos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTurnosPendientesEnSala = async (req, res) => {
    try {
        const { id } = req.params;
        const turnos = await Turno.getTurnosPendienteBySala(id);
        res.status(200).json(turnos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default {
    registrarTurno,
    obtenerTurnos,
    obtenerTurnoPorId,
    actualizarTurno,
    actualizarEstadoTurno,
    eliminarTurno,
    eliminarTurnoPorCedula,
    actualizarTurnoPorCedula,
    obtenerTurnosbyPerfilAtencion,
    obtenerTurnosbyPerfilAtencionYSala,
    getTurnosPendientesEnSala
}


