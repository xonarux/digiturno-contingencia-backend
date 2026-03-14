import { Router } from 'express';
import webhookController from '../controllers/webhookController.js';

const router = Router();

// Recibe un turno nuevo desde produccion
router.post('/webhook/turno', webhookController.recibirTurno);

// Elimina un turno cuando se atiende en produccion
router.delete('/webhook/turno/:cedula', webhookController.eliminarTurno);

export default router;
