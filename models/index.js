import { sequelize } from '../config/postgresdb.js';

// Importamos los modelos (asegúrate de que las rutas sean correctas)
import User from './userModel.js';
import Role from './userRole.js'; // Archivo userRole.js exporta Role
import LevelArea from './levelArea.js'; // Archivo levelArea.js exporta levelArea

// ==========================================
// DEFINICIÓN DE ASOCIACIONES (RELACIONES)
// ==========================================

// 1. Un Usuario pertenece a un Rol
User.belongsTo(Role, {
  foreignKey: 'rol_id', // El campo en la tabla Users
  as: 'roleDetail', // Alias para acceder a los datos (ej: user.roleDetail.name)
});

// 2. Un Usuario pertenece a un Area (LevelArea)
User.belongsTo(LevelArea, {
  foreignKey: 'area_id', // El campo en la tabla Users
  as: 'areaDetail', // Alias para acceder a los datos
});

// Opcional: Definir la inversa (si alguna vez necesitas "Todos los usuarios de un rol")
Role.hasMany(User, { foreignKey: 'rol_id' });
LevelArea.hasMany(User, { foreignKey: 'area_id' });

// Sincronización (Opcional, ten cuidado en producción con {alter: true})
// await sequelize.sync({ alter: true });

// Exportamos los modelos con sus relaciones ya configuradas
export { User, Role, LevelArea };
