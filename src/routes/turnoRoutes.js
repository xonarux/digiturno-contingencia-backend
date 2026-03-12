import { Router } from 'express';
import turnoController from '../controllers/turnoController.js';

const router = Router();

router.post('/turnos', turnoController.registrarTurno);
router.get('/turnos', turnoController.obtenerTurnos);
router.get('/turnos/:id', turnoController.obtenerTurnoPorId);
router.delete('/turnos/:id', turnoController.eliminarTurno);
router.put('/turnos/:id', turnoController.actualizarTurno);
router.patch('/turnos/:id/estado', turnoController.actualizarEstadoTurno);
router.delete('/turnos/cedula/:cedula', turnoController.eliminarTurnoPorCedula);
router.put('/turnos/cedula/:cedula', turnoController.actualizarTurnoPorCedula);
router.get('/turnos/perfil/:perfil_atencion', turnoController.obtenerTurnosbyPerfilAtencion);
router.get('/turnos/perfil_sala/:perfil_atencion/sala/:id_sala', turnoController.obtenerTurnosbyPerfilAtencionYSala);
router.get('turnos/sala/:id', turnoController.getTurnosPendientesEnSala);

export default router;
