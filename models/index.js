import { sequelize } from '../config/postgresdb.js';

// Importamos los modelos limpios
import User from './userModel.js';
import Role from './userRole.js'; // Con la extensión .js correcta
import LevelArea from './levelArea.js'; // Con la extensión .js correcta

// ==========================================
// DEFINICIÓN DE ASOCIACIONES (LOS SUBÍNDICES)
// ==========================================

// 1. Un Usuario pertenece a un Rol
User.belongsTo(Role, {
  foreignKey: 'rol_id',
  as: 'roleDetail', // CORREGIDO: Escrito exactamente igual que en el controlador (con 'e')
});

// 2. Un Usuario pertenece a un Area
User.belongsTo(LevelArea, {
  foreignKey: 'area_id',
  as: 'areaDetail', // Escrito exactamente igual que en el controlador
});

// Buenas prácticas: Definir también las relaciones inversas
// (Por si en el futuro quieres buscar "Todos los usuarios que tienen el rol de Admin")
Role.hasMany(User, { foreignKey: 'rol_id', as: 'usuarios' });
LevelArea.hasMany(User, { foreignKey: 'area_id', as: 'usuarios' });

// Exportamos la instancia de sequelize y los modelos ya relacionados
export { sequelize, User, Role, LevelArea };
