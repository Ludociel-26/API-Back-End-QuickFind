import levelArea from '../models/levelArea.js';

export const createlevelArea = async (req, res) => {
    try {
        const level = await levelArea.create(req.body);
        res.status(201).json(level);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getlevelArea = async (req, res) => {
    try {
        const leveles = await levelArea.findAll();
        res.status(200).json(leveles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getlevelAreaById = async (req, res) => {
    try {
        const level = await levelArea.findByPk(req.params.id);
        if (!level) return res.status(404).json({ message: 'level de area no encontrado' });
        res.status(200).json(level);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatelevelArea = async (req, res) => {
    try {
        const level = await levelArea.findByPk(req.params.id);
        if (!level) return res.status(404).json({ message: 'level de area no encontrado' });
        await level.update(req.body);
        res.status(200).json(level);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deletelevelArea = async (req, res) => {
    try {
        const level = await levelArea.findByPk(req.params.id);
        if (!level) return res.status(404).json({ message: 'level de area no encontrado' });
        await level.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};