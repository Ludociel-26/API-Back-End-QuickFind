import NivelFidelizacion from '../models/nivelFidelizacion.js';

export const createNivelFidelizacion = async (req, res) => {
    try {
        const nivel = await NivelFidelizacion.create(req.body);
        res.status(201).json(nivel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getNivelesFidelizacion = async (req, res) => {
    try {
        const niveles = await NivelFidelizacion.findAll();
        res.status(200).json(niveles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getNivelFidelizacionById = async (req, res) => {
    try {
        const nivel = await NivelFidelizacion.findByPk(req.params.id);
        if (!nivel) return res.status(404).json({ message: 'Nivel de fidelización no encontrado' });
        res.status(200).json(nivel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateNivelFidelizacion = async (req, res) => {
    try {
        const nivel = await NivelFidelizacion.findByPk(req.params.id);
        if (!nivel) return res.status(404).json({ message: 'Nivel de fidelización no encontrado' });
        await nivel.update(req.body);
        res.status(200).json(nivel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteNivelFidelizacion = async (req, res) => {
    try {
        const nivel = await NivelFidelizacion.findByPk(req.params.id);
        if (!nivel) return res.status(404).json({ message: 'Nivel de fidelización no encontrado' });
        await nivel.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};