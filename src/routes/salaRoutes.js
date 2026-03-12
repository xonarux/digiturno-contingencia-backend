import { Router } from 'express';
import { consultarSalas, registrarSala, eliminarSala, actualizarSala, obtenerSalaPorId, obtenerPerfilesDeAtencionPorSala } from '../controllers/salaController.js';
const router = Router();

router.get('/salas', consultarSalas);
router.get('/salas/:id', obtenerSalaPorId);
router.post('/salas', registrarSala);
router.delete('/salas/:id', eliminarSala);
router.put('/salas/:id', actualizarSala);
router.get('/salas/:id_sala/perfiles_atencion', obtenerPerfilesDeAtencionPorSala);
export default router;
