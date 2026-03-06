import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: 'Not Authorized. Login Again' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      // 🛡️ VERIFICACIÓN EN TIEMPO REAL A LA BASE DE DATOS
      const user = await User.findByPk(tokenDecode.id);

      // Si el usuario no existe o fue deshabilitado (is_active: false)
      if (!user || !user.is_active) {
        res.clearCookie('token', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        // Retornamos exactamente este mensaje para que el Front-end dispare el Modal
        return res.status(403).json({
          success: false,
          message: 'ACCOUNT_DISABLED_FORCE_LOGOUT',
        });
      }

      // Si todo está bien, lo dejamos pasar
      req.userID = Number(tokenDecode.id);
      req.userRole = tokenDecode.role;
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: 'Not Authorized. Login Again' });
    }
  } catch (error) {
    // 🚩 AWS STYLE: Detección estricta de caducidad
    if (error.name === 'TokenExpiredError') {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      });
      return res
        .status(401)
        .json({ success: false, message: 'SESSION_EXPIRED' });
    }

    return res.status(401).json({ success: false, message: 'Invalid Token' });
  }
};

export default userAuth;
