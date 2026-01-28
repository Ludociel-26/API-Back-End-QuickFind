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
});

export default levelArea;
