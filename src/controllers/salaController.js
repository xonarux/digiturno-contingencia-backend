import Sala from '../models/sala.js';

export const consultarSalas = async (req, res) => {
    try {
        const salas = await Sala.findAll();
        res.status(200).json(salas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const obtenerSalaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const sala = await Sala.findByPk(id);
        if (sala) {
            res.status(200).json(sala);
        } else {
            res.status(404).json({ error: 'Sala no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export async function registrarSala(req, res) {
    try {
        const { nombre } = req.body;
        const nuevaSala = await Sala.create({ nombre });
        res.status(201).json(nuevaSala);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function eliminarSala(req, res) {
    try {
        const { id } = req.params;
        const sala = await Sala.findByPk(id);
        if (sala) {
            await Sala.destroy(id);
            res.status(200).json({ message: 'Sala eliminada correctamente' });
        } else {
            res.status(404).json({ error: 'Sala no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export async function actualizarSala(req, res) {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const sala = await Sala.findByPk(id);
        if (sala) {
            sala.nombre = nombre;
            await Sala.update(id, { nombre });
            res.status(200).json(sala);
        } else {
            res.status(404).json({ error: 'Sala no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const obtenerPerfilesDeAtencionPorSala = async (req, res) => {
    try {
        const { id_sala } = req.params;
        const perfiles = await Sala.getPerfilesAtencionBySalaId(id_sala);
        res.status(200).json(perfiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

