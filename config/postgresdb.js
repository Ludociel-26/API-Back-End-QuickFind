import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

console.log('🔍 Cargando configuración de Sequelize...');

const useSSL = process.env.DB_SSL === 'true';
const rejectUnauthorized = process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true';

const caPath = path.resolve('certs/global-bundle.pem');

const sequelize = new Sequelize(
  process.env.DB_NAME, // database
  process.env.DB_USER, // username
  process.env.DB_PASSWORD, // password
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: useSSL
        ? {
            require: true,
            rejectUnauthorized,
            ...(rejectUnauthorized && {
              ca: fs.readFileSync(caPath).toString(),
            }),
          }
        : false,
    },
  },
);

console.log('✅ Sequelize inicializado correctamente.');

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database Connected');

    console.log('🔍 Importando modelos...');
    await import('../models/index.js');
    console.log('✅ Modelos importados correctamente.');

    // await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados con la base de datos');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};

export { sequelize };
export default connectDB;

/*   await sequelize.sync({ alter: true }); 
'validar que no es necesario para quitarlo o no evitando que se borren datos' */

/*
// The connectDB function is an async function that connects to the database using MongoDB.
import mongoose from "mongoose";

const connectDB = async ()=>{

    mongoose.connection.on('connected', ()=>console.log("Database Connected"));

    await mongoose.connect(`${process.env.MONGODB_URI}`);
};

export default connectDB;
*/
