import { DataTypes } from 'sequelize';
import { sequelize } from '../config/postgresdb.js';

const Role = sequelize.define('Role', {
    rol_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
});

export default Role;