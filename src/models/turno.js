import db from '../config/database.js';

const Turno = {};
Turno.findAll = async () => {
    const [rows] = await db.query('SELECT * FROM Turnos');
    return rows;
};

Turno.findByPk = async (id) => {
    const [rows] = await db.query('SELECT * FROM Turnos WHERE id = ?', [id]);
    return rows[0];
};

Turno.findByCedula = async (cedula) => {
    const [rows] = await db.query('SELECT * FROM Turnos WHERE cedula = ?', [cedula]);
    return rows[0];
};

Turno.findByPerfilAtencion = async (perfil_atencion) => {
    const [rows] = await db.query(
        `SELECT t.* FROM Turnos t
         JOIN Salas s ON t.id_sala = s.id
         WHERE s.perfil_atencion = ? AND t.estado = 'En espera'`,
        [perfil_atencion]
    );
    return rows;
};

Turno.create = async ({ nombre, cedula, destino, id_sala, estado }) => {
    const [result] = await db.query(
        'INSERT INTO Turnos (nombre, cedula, destino, id_sala, estado) VALUES (?, ?, ?, ?, ?)',
        [nombre, cedula, destino, id_sala, "En espera"]
    );
    console.log('[Turno.create] insertId:', result.insertId, '| affectedRows:', result.affectedRows);
    if (!result.affectedRows) {
        throw new Error('INSERT no afectó ninguna fila');
    }
    return {
        id: result.insertId,
        nombre,
        cedula,
        destino,
        id_sala,
    };
};

Turno.updateByCedula = async (cedula, { nombre, destino, id_sala, estado }) => {
    await db.query(
        'UPDATE Turnos SET nombre = ?, destino = ?, id_sala = ?, estado = ? WHERE cedula = ?',
        [nombre, destino, id_sala, estado, cedula]
    );
    const [rows] = await db.query('SELECT * FROM Turnos WHERE cedula = ?', [cedula]);
    return rows[0];
};

Turno.update = async (id, { nombre, cedula, destino, id_sala, estado }) => {
    await db.query(
        'UPDATE Turnos SET nombre = ?, cedula = ?, destino = ?, id_sala = ?, estado = ? WHERE id = ?',
        [nombre, cedula, destino, id_sala, estado, id]
    );
    return Turno.findByPk(id);
};

Turno.destroy = async (id) => {
    await db.query('DELETE FROM Turnos WHERE id = ?', [id]);
};

Turno.destroyByCedula = async (cedula) => {
    await db.query('DELETE FROM Turnos WHERE cedula = ?', [cedula]);
};

Turno.patchEstado = async (id, estado) => {
    await db.query(
        'UPDATE Turnos   SET estado = ? WHERE id = ?',
        [estado, id]
    );
    return Turno.findByPk(id);
};

Turno.getTurnosByPerfilAtencionYSala = async (perfil_atencion, id_sala) => {
    const [rows] = await db.query(
        `SELECT t.*, s.nombre AS nombre_sala FROM Turnos t
         JOIN Salas s ON t.id_sala = s.id
         WHERE t.destino = ? AND t.estado = 'En espera' AND t.id_sala = ?`,
        [perfil_atencion, id_sala]
    );

    return rows;
};

Turno.getTurnosPendientesEnSala = async (id) => {
    const [rows] = await db.query(
        `SELECT t.*, s.nombre AS nombre_sala FROM Turnos t
         JOIN Salas s ON t.id_sala = s.id
         WHERE t.estado = 'En espera' AND t.id_sala = ?`,
        [id]
    )
    return rows;
}

// Consultar turnos 

export default Turno;