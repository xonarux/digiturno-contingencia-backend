import db from '../config/database.js';

const Sala = {};
Sala.findAll = async () => {
    const [rows] = await db.query('SELECT * FROM Salas');
    return rows;
};

Sala.findByPk = async (id) => {
    const [rows] = await db.query('SELECT * FROM Salas WHERE id = ?', [id]);
    return rows[0];
};
Sala.create = async ({ nombre }) => {
    const [result] = await db.query(
        'INSERT INTO Salas (nombre) VALUES (?)',
        [nombre]
    );
    return {
        id: result.insertId,
        nombre,
    };
};
Sala.destroy = async (id) => {
    await db.query('DELETE FROM Salas WHERE id = ?', [id]);
};

Sala.update = async (id, { nombre }) => {
    await db.query(
        'UPDATE Salas SET nombre = ? WHERE id = ?',
        [nombre, id]
    );
    return Sala.findByPk(id);
};

//Consultar los perfiles de atencion de las cajas que tienen el id_sala de una sala

Sala.findByNombre = async (nombre) => {
    const [rows] = await db.query('SELECT * FROM Salas WHERE nombre = ?', [nombre]);
    return rows[0];
};

Sala.getPerfilesAtencionBySalaId = async (id_sala) => {
    const [rows] = await db.query(
        `SELECT DISTINCT perfil_atencion FROM Cajas WHERE id_sala = ?`,
        [id_sala]
    );
    return rows.map(row => row.perfil_atencion);
};

export default Sala;
