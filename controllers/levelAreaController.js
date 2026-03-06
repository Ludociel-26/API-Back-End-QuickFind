import { LevelArea } from '../models/index.js';

export const createlevelArea = async (req, res) => {
  try {
    const level = await LevelArea.create(req.body);
    res.status(201).json({ success: true, area: level });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getlevelArea = async (req, res) => {
  try {
    const leveles = await LevelArea.findAll({
      order: [['area_id', 'ASC']], // Evita que las filas cambien de lugar en la tabla al editar
    });
    // Estructura adaptada para tu frontend
    res.status(200).json({ success: true, areas: leveles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getlevelAreaById = async (req, res) => {
  try {
    const level = await LevelArea.findByPk(req.params.id);
    if (!level) {
      return res
        .status(404)
        .json({ success: false, message: 'Área no encontrada' });
    }
    res.status(200).json({ success: true, area: level });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatelevelArea = async (req, res) => {
  try {
    const { id } = req.params;
    // Extraemos explícitamente los campos permitidos por seguridad
    const { level, descripcion, color } = req.body;

    const area = await LevelArea.findByPk(id);
    if (!area) {
      return res
        .status(404)
        .json({ success: false, message: 'Área no encontrada' });
    }

    await area.update({ level, descripcion, color });

    res.status(200).json({ success: true, area });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletelevelArea = async (req, res) => {
  try {
    const level = await LevelArea.findByPk(req.params.id);
    if (!level) {
      return res
        .status(404)
        .json({ success: false, message: 'Área no encontrada' });
    }
    await level.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
