import jwt from "jsonwebtoken";

const userAuth = async (req, res, next)=>{
    console.log("Cookies recibidas:", req.cookies); // <-- DEBUG
    
    const {token} = req.cookies;

    if (!token) {
        console.log("❌ No se recibió token en cookies.");
        return res.json({ success: false, message: 'Not Authorized. Login Again'})
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token decodificado:", tokenDecode); // <-- DEBUG

        if(tokenDecode.id){
            req.userID = Number (tokenDecode.id);
            req.userRole = tokenDecode.role;
            console.log("✅ req.userID asignado:", req.userID);
            console.log("Rol del usuario:", req.userRole); // Para depuración
            next();
        }else{
            console.log("❌ ID no encontrado en token.");
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
        }

    } catch (error) {
        console.log("❌ Error al verificar el token:", error.message);
        return res.status(401).json({ success: false, message: "Invalid Token" });
    }
}

export default userAuth;