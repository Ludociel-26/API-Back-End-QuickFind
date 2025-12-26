const requireRole = (allowedRoles = []) => {
    return (req, res, next) => {
        if (!req.userRole) {
            return res.status(401).json({ success: false, message: 'No se encontró información de rol. Autentícate nuevamente.' });
        }
        if (!allowedRoles.includes(req.userRole)) {
            return res.status(403).json({ success: false, message: 'Acceso denegado: no tienes permisos para esta acción.' });
        }
        next();
    };
};

export default requireRole;