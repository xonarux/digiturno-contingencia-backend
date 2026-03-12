import Caja from '../models/caja.js';

export async function consultarCaja(req, res) {
    try {
        const caja = await Caja.findAll();
        res.status(200).json(caja);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function consultarCajaPorId(req, res) {
    try {
        const { id } = req.params;
        const caja = await Caja.findByPk(id);
        if (caja) {
            res.status(200).json(caja);
        } else {
            res.status(404).json({ error: 'Caja no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function consultarCajaPorSala(req, res) {
    try {
        const { sala_id } = req.params;
        const caja = await Caja.findCajaPorSala(sala_id);
        res.status(200).json(caja);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function actualizarCaja(req, res) {
    try {
        const { id } = req.params;
        const { nombre, sala_id, perfil_atencion } = req.body;
        const caja = await Caja.findByPk(id);
        if (caja) {
            caja.nombre = nombre;
            caja.sala_id = sala_id;
            caja.perfil_atencion = perfil_atencion;
            await Caja.update(id, { nombre, sala_id, perfil_atencion });
            res.status(200).json(caja);
        } else {
            res.status(404).json({ error: 'Caja no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function registrarCaja(req, res) {
    try {
        const { nombre, sala_id, perfil_atencion } = req.body;
        const nuevaCaja = await Caja.create({ nombre, sala_id, perfil_atencion });
        res.status(201).json(nuevaCaja);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function eliminarCaja(req, res) {
    try {
        const { id } = req.params;
        const caja = await Caja.findByPk(id);
        if (caja) {
            await Caja.destroy();
            res.status(200).json({ message: 'Caja eliminada correctamente' });
        } else {
            res.status(404).json({ error: 'Caja no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
