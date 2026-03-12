import db from '../config/database.js';

const Caja = {};

Caja.findAll = async () => {
    const [rows] = await db.query('SELECT * FROM Cajas');
    return rows;
};

Caja.findCajaPorSala = async (sala_id) => {
    const [rows] = await db.query('SELECT * FROM Cajas WHERE id_sala = ?', [sala_id]);
    return rows;
};

Caja.findByPk = async (id) => {
    const [rows] = await db.query('SELECT * FROM Cajas WHERE id = ?', [id]);
    return rows[0];
};

Caja.create = async ({ nombre, sala_id, perfil_atencion }) => {
    const [result] = await db.query(
        'INSERT INTO Cajas (nombre, id_sala, perfil_atencion) VALUES (?, ?, ?)',
        [nombre, sala_id, perfil_atencion]
    );
    return {
        id: result.insertId,
        nombre,
        id_sala: sala_id,
        perfil_atencion,
    };
};

Caja.update = async (id, { nombre, sala_id, perfil_atencion }) => {
    await db.query(
        'UPDATE Cajas SET nombre = ?, id_sala = ?, perfil_atencion = ? WHERE id = ?',
        [nombre, sala_id, perfil_atencion, id]
    );
    return Caja.findByPk(id);
};

Caja.destroy = async (id) => {
    await db.query('DELETE FROM Cajas WHERE id = ?', [id]);
};

export default Caja;