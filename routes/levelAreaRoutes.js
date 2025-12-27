import express from 'express';
import { createlevelArea, getlevelArea, getlevelAreaById, updatelevelArea, deletelevelArea } from '../controllers/levelAreaController.js';

const router = express.Router();

router.post('/', createlevelArea); // Crear un level de nivel
router.get('/', getlevelArea); // Obtener todos los leveles de nivel
router.get('/:id', getlevelAreaById); // Obtener un level de nivel por ID
router.put('/:id', updatelevelArea); // Actualizar un level de nivel
router.delete('/:id', deletelevelArea); // Eliminar un level de nivel

export default router;