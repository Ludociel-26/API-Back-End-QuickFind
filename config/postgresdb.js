import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

console.log("🔍 Cargando configuración de Sequelize...");

const sequelize = new Sequelize(process.env.POSTGRES_URI, {
    dialect: 'postgres',
    logging: false, // Puedes habilitar el logging si lo deseas
});

console.log("✅ Sequelize inicializado correctamente.");

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database Connected");

        // Agregar logs para verificar modelos
        console.log("🔍 Importando modelos...");
        await import('../models/index.js');
        console.log("✅ Modelos importados correctamente.");

        await sequelize.sync({ alter: true }); // <-- Actualizará las tablas si es necesario
        console.log("✅ Modelos sincronizados con la base de datos");
    } catch (error) {
        console.error("❌ Unable to connect to the database:", error);
    }
};

// Exportar la instancia de sequelize
export { sequelize };

// Exportar la función connectDB por defecto
export default connectDB;
/*
// The connectDB function is an async function that connects to the database using MongoDB.
import mongoose from "mongoose";

const connectDB = async ()=>{

    mongoose.connection.on('connected', ()=>console.log("Database Connected"));

    await mongoose.connect(`${process.env.MONGODB_URI}`);
};

export default connectDB;
*/