import { User as userModel, Role, LevelArea } from '../models/index.js';

// =======================================================================
// 1. OBTENER DATOS DEL USUARIO LOGUEADO (Navbar / Sesión)
// =======================================================================
export const getUserData = async (req, res) => {
  try {
    const userId = req.userID;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: 'User ID not found' });
    }

    const user = await userModel.findOne({
      where: { id: Number(userId) },
      include: [
        {
          model: Role,
          as: 'roleDetail',
          attributes: ['name'],
        },
        {
          model: LevelArea,
          as: 'areaDetail',
          attributes: ['level'],
        },
      ],
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    // Estructura ORDENADA específicamente como la pediste:
    return res.json({
      success: true,
      userData: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAccountVerified: user.is_account_verified,

        // --- GRUPO ROL (ID + Nombre) ---
        role: user.rol_id,
        roleName: user.roleDetail ? user.roleDetail.name : 'Sin Rol',

        // --- GRUPO ÁREA (ID + Nombre) ---
        area: user.area_id,
        areaName: user.areaDetail ? user.areaDetail.level : 'Sin Área',
      },
    });
  } catch (error) {
    console.error('Error en getUserData:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// =======================================================================
// 2. OBTENER TODOS LOS USUARIOS (Admin Table)
// =======================================================================
export const getAllUsers = async (req, res) => {
  try {
    const rawUsers = await userModel.findAll({
      attributes: [
        'id',
        'email',
        'rol_id',
        'area_id',
        'name',
        'surname',
        'country',
        'birth_date',
        'is_account_verified',
        'is_active',
      ],
      include: [
        { model: Role, as: 'roleDetail', attributes: ['name'] },
        { model: LevelArea, as: 'areaDetail', attributes: ['level'] },
      ],
      order: [['id', 'ASC']],
    });

    // Mapeo para garantizar el orden de las propiedades en el JSON de respuesta
    const users = rawUsers.map((user) => ({
      id: user.id,
      email: user.email,

      // Grupo Rol
      rol_id: user.rol_id,
      role_name: user.roleDetail ? user.roleDetail.name : null,

      // Grupo Área
      area_id: user.area_id,
      area_level: user.areaDetail ? user.areaDetail.level : null,

      // Resto de datos
      name: user.name,
      surname: user.surname,
      country: user.country,
      birth_date: user.birth_date,
      is_account_verified: user.is_account_verified,
      is_active: user.is_active,
    }));

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error('Error en getAllUsers:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Error al obtener usuarios' });
  }
};

// =======================================================================
// 3. OBTENER USUARIO POR ID (Edición Admin)
// =======================================================================
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findOne({
      where: { id: Number(id) },
      attributes: { exclude: ['password'] },
      include: [
        { model: Role, as: 'roleDetail', attributes: ['name'] },
        { model: LevelArea, as: 'areaDetail', attributes: ['level'] },
      ],
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'Usuario no encontrado' });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// =======================================================================
// 4. ACTUALIZAR USUARIO
// =======================================================================
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      surname,
      email,
      rol_id,
      area_id,
      is_active,
      is_account_verified,
      country,
      birth_date,
    } = req.body;

    const user = await userModel.findByPk(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'Usuario no encontrado' });

    if (name !== undefined) user.name = name;
    if (surname !== undefined) user.surname = surname;
    if (email !== undefined) user.email = email;
    if (country !== undefined) user.country = country;
    if (birth_date !== undefined) user.birth_date = birth_date;
    if (rol_id !== undefined) user.rol_id = rol_id;
    if (area_id !== undefined) user.area_id = area_id;
    if (is_active !== undefined) user.is_active = is_active;
    if (is_account_verified !== undefined)
      user.is_account_verified = is_account_verified;

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Usuario actualizado correctamente',
    });
  } catch (error) {
    console.error('Error en updateUser:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Error al actualizar usuario' });
  }
};

// =======================================================================
// 5. ELIMINAR USUARIO
// =======================================================================
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (Number(id) === req.userID) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'No puedes eliminar tu propia cuenta.',
        });
    }

    const user = await userModel.findByPk(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'Usuario no encontrado' });

    await user.destroy();

    return res
      .status(200)
      .json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error en deleteUser:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Error al eliminar usuario' });
  }
};
