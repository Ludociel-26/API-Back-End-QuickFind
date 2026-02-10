import express from 'express';
import userAuth from '../middleware/userAuth.js';
import requireRole from '../middleware/requireRole.js';
import {
  getUserData,
  getAllUsers,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const userRouter = express.Router();

const ADMIN_ROLE = 3; // Definimos la constante para claridad

// Ruta para el propio usuario (Perfil)
userRouter.get('/data', userAuth, getUserData);

// === GESTIÓN DE USUARIOS (Solo Admin ID 3) ===

// 1. Obtener lista completa
userRouter.get(
  '/all-users',
  userAuth,
  requireRole([ADMIN_ROLE]), // array con IDs permitidos
  getAllUsers,
);

// 2. Editar usuario
userRouter.put(
  '/update-user/:id',
  userAuth,
  requireRole([ADMIN_ROLE]),
  updateUser,
);

// 3. Eliminar usuario
userRouter.delete(
  '/delete-user/:id',
  userAuth,
  requireRole([ADMIN_ROLE]),
  deleteUser,
);

export default userRouter;
