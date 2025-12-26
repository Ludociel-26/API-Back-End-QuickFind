import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_WELCOME_TEMPLATE, EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/emailTemplates.js';
import logger from '../logger.js';

// Registro de usuario
export const register = async (req, res) => {
    const { name, surname, country, birth_date, email, password, phone_lada, phone_number } = req.body;
    if (!name || !surname || !country || !birth_date || !email || !password || !phone_lada || !phone_number) {
        return res.json({ success: false, message: 'Missing Details' });
    }
    try {
    // Verifica si el usuario con el correo ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.json({ success: false, message: "User already exists" });
    }

    // Verifica si el número de teléfono ya está en uso
    const existingUserByPhone = await User.findOne({ where: { phone_number } });
    if (existingUserByPhone) {
        return res.json({ success: false, message: "Phone number is already in use. Please try again." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ 
        name, 
        surname, 
        country, 
        birth_date, 
        email, 
        password: hashedPassword, 
        phone_lada, 
        phone_number,
        rol_id: 1  // Asigna el rol por defecto
    });

    // Genera el token JWT
    const token = jwt.sign({ id: user.id, role: user.rol_id}, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Guarda el token en el campo auth_token
    user.auth_token = token;

    await user.save();  // Guarda el usuario con el token actualizado

    // Configura la cookie del token
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // Enviar correo de bienvenida
    const mailOptions = {
        from: `"🏨HotelBits" <${process.env.SENDER_EMAIL}>`,
        to: email,
        subject: '✨ Te damos la bienvenida a HotelBits 🏨',
        // text: `Welcome to Hotel website. Your account has been created with email id: ${email}`,
        html: EMAIL_WELCOME_TEMPLATE.replace("{{name}}", user.name).replace("{{email}}", user.email)
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true });

    } catch (error) {
    res.json({ success: false, message: error.message });
    }
};
// Inicio de sesión
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Missing email or password in login attempt');
        return res.json({ success: false, message: 'Email and password are required' });
    }
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.json({ success: false, message: 'Invalid email' });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id, role: user.rol_id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true, role: user.rol_id });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Cerrar sesión
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({ success: true, message: "Logged Out" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Enviar OTP de verificación al correo del usuario
export const sendVerifyOtp = async (req, res) => {
    try {
        // Verificar si req.body existe y extraer userId (si se envió en el body)
        const userIdFromBody = req.body?.userId || null;
        const finalUserId = userIdFromBody || req.userID;

        if (!finalUserId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        console.log("Buscando usuario con ID:", finalUserId);


        const user = await User.findByPk(req.userID);

        // Verificar si el usuario existe
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account Already verified" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verify_otp = otp;
        user.verify_otp_expire_at = Date.now() + 24 * 60 * 60 * 1000; // 24 horas

        // Enviar correo para validar correo por OTP
        await user.save();
        const mailOption = {
            from: `"✉️ Verifica email de contacto en 🏨HotelBits"<${process.env.SENDER_EMAIL}>`,
            to: user.email,
            subject: '🔐 Protege tu cuenta: verifica tu email ahora',
            // text: `Your OTP is ${otp}. Verify your account using this OTP.`,
            html: EMAIL_VERIFY_TEMPLATE.replace("{{name}}", user.name).replace("{{email}}", user.email).replace("{{otp}}", otp)
        };
        await transporter.sendMail(mailOption);

        res.json({ success: true, message: 'Verification OTP Sent on Email' });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Verificar el correo electrónico usando el OTP
export const verifyEmail = async (req, res) => {
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ success: false, message: "OTP is required" });
    }
    try {
        const user = await User.findByPk(req.userID);

        if (!user) {
            return res.json({ success: false, message: 'User  not found' });
        }

        if (user.verify_otp === '' || user.verify_otp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if (user.verify_otp_expire_at < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired' });
        }

        user.is_account_verified = true;
        user.verify_otp = '';
        user.verify_otp_expire_at = 0;

        await user.save();
        return res.json({ success: true, message: 'Email verified successfully' });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Verificar si el usuario está autenticado
export const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Enviar OTP para restablecimiento de contraseña
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: 'Email is required' });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.json({ success: false, message: 'User  not found' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.reset_otp = otp;
        user.reset_otp_expire_at = Date.now() + 15 * 60 * 1000; // 15 minutos

        await user.save();

        const mailOption = {
            from: `"Solicitud de restablecimiento de contraseña de tu cuenta de 🏨HotelBits"<${process.env.SENDER_EMAIL}>`,
            to: user.email,
            subject: 'Cambia tu contraseña de forma segura',
            // text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password.`
            html: PASSWORD_RESET_TEMPLATE.replace("{{name}}", user.name).replace("{{email}}", user.email).replace("{{otp}}", otp)
        };

        await transporter.sendMail(mailOption);

        return res.json({ success: true, message: 'OTP sent to your email' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Restablecer la contraseña del usuario
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: 'Email, OTP, and new password are required' });
    }
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.json({ success: false, message: 'User  not found' });
        }

        if (user.reset_otp === "" || user.reset_otp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if (user.reset_otp_expire_at < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.reset_otp = '';
        user.reset_otp_expire_at = 0;

        await user.save();

        return res.json({ success: true, message: 'Password has been reset successfully' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};