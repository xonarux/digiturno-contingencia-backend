import { Router } from 'express';
import { consultarCaja, registrarCaja, eliminarCaja, actualizarCaja, consultarCajaPorSala, consultarCajaPorId } from '../controllers/cajaController.js';
const router = Router();

router.get('/cajas', consultarCaja);
router.get('/cajas/:id', consultarCajaPorId);
router.post('/cajas', registrarCaja);
router.delete('/cajas/:id', eliminarCaja);
router.put('/cajas/:id', actualizarCaja);
router.get('/cajas/sala/:sala_id', consultarCajaPorSala);

export default router;
