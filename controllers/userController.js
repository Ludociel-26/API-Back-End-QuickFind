import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try {
      const userId = req.userID;
      console.log("ID recibido en getUserData:", userId, "Tipo:", typeof userId);
  
      if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID not found' });
      }
  
      // Buscamos el usuario en la base de datos usando el id obtenido del token
      const user = await userModel.findOne({ where: { id: Number(userId) } });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Devolvemos solo los datos esenciales: id, name y role (rol_id)
      return res.json({
        success: true,
        userData: {
          id: user.id,
          name: user.name,
          email: user.email,
          isAccountVerified: user.is_account_verified,
          role: user.rol_id  // Aquí retornamos el rol del usuario
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };