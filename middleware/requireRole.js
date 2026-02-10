const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    // Verificamos si req.userRole existe (seteado previamente por userAuth)
    if (!req.userRole) {
      return res.status(401).json({
        success: false,
        message: 'No se encontró información de rol. Autentícate nuevamente.',
      });
    }

    // Verificamos si el rol del usuario está en la lista permitida
    // Nota: Asegúrate de que req.userRole y los valores en allowedRoles sean del mismo tipo (números)
    if (!allowedRoles.includes(req.userRole)) {
      return res.status(403).json({
        success: false,
        message:
          'Acceso denegado: no tienes permisos de Administrador para esta acción.',
      });
    }

    next();
  };
};

export default requireRole;
