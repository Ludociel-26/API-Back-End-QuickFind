import { DataTypes } from 'sequelize';
import { sequelize } from '../config/postgresdb.js';

const levelArea = sequelize.define('levelArea', {
  area_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  level: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // NUEVO CAMPO: color
  color: {
    type: DataTypes.STRING(7), // Longitud máxima para #RRGGBB
    allowNull: false,
    defaultValue: '#fcfcfc', // Gris por defecto si no se manda nada
    validate: {
      is: /^#([0-9A-F]{3}){1,2}$/i, // Valida que sea un hex válido
    },
  },
});

export default levelArea;
