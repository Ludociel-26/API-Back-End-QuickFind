// Initialize email templates
export const EMAIL_WELCOME_TEMPLATE = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido a HotelBits</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
            color: #1e293b;
            line-height: 1.5;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background-color: #EFF6FF;
        }

        .logo {
            font-size: 24px;
            font-weight: 600;
            color: #1e293b;
            text-decoration: none;
        }

        .login-button {
            font-size: 34px;
            font-weight: 600;
            width: 36px;
            height: 36px;
            border: 0;
            outline: none;
            text-decoration: none;
        }

        .content {
            padding: 40px 20px;
            text-align: center;
        }

        .welcome-icon {
            width: 150px;
            height: 130px;
            margin: 0 auto 20px;
        }

        .title {
            font-size: 24px;
            font-weight: 600;
            color: #081B5D;
            margin-bottom: 20px;
        }

        .message {
            color: #475569;
            margin-bottom: 20px;
            font-size: 16px;
        }

        .highlight-box {
            background-color: #EFF6FF;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            font-size: 18px;
            color: #3B82F6;
        }

        .tips {
            background-color: #EFF6FF; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
            text-align: left; 
        }

        .tips h2 {
            color: #1e293b; 
            font-size: 20px; 
            margin-bottom: 15px; 
        }

        .tips ul {
            margin: 0; 
            padding-left: 20px; 
            color: #475569; 
        }

        .tips li {
            margin-bottom: 10px; 
        }

        .footer {
             background-color: #1e293b; 
             color: white; 
             padding: 40px 20px; 
             text-align: center; 
         }

         .social-links { 
           margin-top:-30px;
           display:flex; 
           justify-content:center; 
           gap :10px;
           }
        
         .social-icon { 
           width :40px; 
           height :40px; 
           }
        
         .footer-links { 
           color :#94a3b8; 
           font-size :14px; 
           margin-top :20px; 
           }
        
         .footer-links a { 
           color :#94a3b8; 
           text-decoration :none; 
           margin :0 10px; 
           }
        
         @media (max-width :600px) { 
           .container { 
              width :100%; 
              padding :10px; 
              }
            
           .header { 
              padding :15px; 
              }
        
           .content { 
              padding :20px 15px; 
              }
           }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <a href="http://localhost:5173/login" class="logo">🏨HotelBits</a>
        </div>

        <div class="content">
          <img src="http://localhost:4000/assets/hicono.png" style="width: 96px; height: 83px;" alt="Bienvenido a HotelBits" class="welcome-icon">
          
          <h1 class="title">👋 Bienvenido a HotelBits, {{name}}!</h1>
          
          <p class="message">Tu dirección de correo electrónico es {{email}}.</p>
          <p class="message">Nos complace darle la bienvenida a la familia HotelBits. Su cuenta ha sido creada exitosamente y ahora tiene acceso a nuestros servicios exclusivos en línea.</p>
          
          <div class="highlight-box">
                <strong>¡Estamos felices de tenerte aquí! Prepárate para vivir experiencias increíbles con HotelBits.</strong>
          </div>

          <p class="message">
                No pierda la oportunidad de comenzar su experiencia en HotelBits.
          </p>

          <h2 class="title">Consejos para Aprovechar al Máximo su Experiencia HotelBits</h2>

          <div class="tips">
              <h2>🌟 Explore Nuestras Ofertas Especiales:</h2>
              <ul>
                  <li>Visite regularmente nuestra sección de ofertas para encontrar las mejores tarifas y promociones exclusivas.</li>
                  <li>Suscríbase a nuestro boletín para recibir ofertas directamente en su correo electrónico.</li>
              </ul>

              <h2>📱 Beneficios al hacer reservaciones desde su Móvil:</h2>
              <ul>
                  <li>Acceda a funciones exclusivas y realice reservas fácilmente desde su dispositivo móvil.</li>
              </ul>

              <h2>💼 Programa de Fidelidad:</h2>
              <ul>
                  <li>Únase a nuestro programa de fidelidad para ganar puntos en cada estancia y disfrutar de beneficios exclusivos.</li>
              </ul>

              <p>Si necesita más información o tiene alguna pregunta, no dude en contactarnos:</p>
              <p><strong>📧 Correo Electrónico:</strong> <a href="mailto:support@hotelbits.com">support@hotelbits.com</a></p>
              <p><strong>📞 Teléfono:</strong> +1 (800) 123-4567</p>
          </div>

      </div>

      <div class="footer">
             <div class="social-links">
                <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png" alt="Facebook" class="social-icon"></a>
                <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" alt="Instagram" class="social-icon"></a>
                <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2491px-Logo_of_Twitter.svg.png" alt="Twitter" class="social-icon"></a>
             </div>
             <div class="footer-links">
                 <a href="#">Política de Privacidad</a>
                 •
                 <a href="#">Contáctenos</a>
             </div>
             <p>&copy; 2025 HotelBits. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
`

export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificación de Correo Electrónico - HotelBits</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
            color: #1e293b;
            line-height: 1.5;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background-color: #EFF6FF;
        }

        .logo {
            font-size: 24px;
            font-weight: 600;
            color: #1e293b;
            text-decoration: none;
        }

        .login-button {
            font-size: 34px;
            font-weight: 600;
            width: 36px;
            height: 36px;
            border: 0;
            outline: none;
            text-decoration: none;
        }

        .content {
            padding: 40px 20px;
            text-align: center;
        }

        .verify-icon {
            width: 150px;
            height: 130px;
            margin: 0 auto 20px;
        }

        .title {
            font-size: 24px;
            font-weight: 600;
            color: #081B5D;
            margin-bottom: 20px;
        }

        .verification-box {
            background-color: #EFF6FF;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            font-size: 24px;
            font-weight: 600;
            color: #3B82F6;
            letter-spacing: 2px;
        }

        .message {
            color: #475569;
            margin-bottom: 20px;
            font-size: 16px;
        }

        .account-tips {
            background-color: #EFF6FF; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
            text-align: left; 
        }

        .account-tips h2 {
            color: #1e293b; 
            font-size: 20px; 
            margin-bottom: 15px; 
        }

        .account-tips ul {
            margin: 0; 
            padding-left: 20px; 
            color: #475569; 
        }

        .account-tips li {
            margin-bottom: 10px; 
        }

        .footer {
             background-color: #1e293b; 
             color: white; 
             padding: 40px 20px; 
             text-align: center; 
         }

         .social-links { 
           margin-top:-30px;
           display:flex; 
           justify-content:center; 
           gap :10px;
           }
        
         .social-icon { 
           width :40px; 
           height :40px; 
           }
        
         .footer-links { 
           color :#94a3b8; 
           font-size :14px; 
           margin-top :20px; 
           }
        
         .footer-links a { 
           color :#94a3b8; 
           text-decoration :none; 
           margin :0 10px; 
           }
        
         @media (max-width :600px) { 
           .container { 
              width :100%; 
              padding :10px; 
              }
            
           .header { 
              padding :15px; 
              }
        
           .content { 
              padding :20px 15px; 
              }
           }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <a href="http://localhost:5173/login" class="logo">🏨HotelBits</a>
        </div>

        <div class="content">
          <img src="http://localhost:4000/assets/verifiedmail.svg" alt="Verificación de correo" class="verify-icon">
          
          <h1 class="title">Verificación de Correo Electrónico</h1>
          
          <h1 class="message">👋 Estimado/a {{name}}.</h1>

          <p class="message">Tu dirección de correo electrónico es: {{email}}.</p>
          <p class="message">Gracias por registrarte en HotelBits. Para completar tu registro y activar tu cuenta, por favor verifica tu dirección de correo electrónico utilizando el siguiente código de verificación:</p>
          
          <div class="verification-box">
                <strong>{{otp}}</strong>
          </div>

          <p class="message">
                Este código es válido por los próximos <strong>30 minutos</strong>. Si no has solicitado esta verificación, por favor ignora este correo o contacta a nuestro equipo de soporte inmediatamente.
          </p>

          <h2 class="title">🔒 Consejos para Proteger tu Cuenta</h2>

          <div class="account-tips">
              <h2>✅ Mantén Segura tu Contraseña:</h2>
              <ul>
                  <li>Crea una contraseña fuerte combinando letras, números y caracteres especiales.</li>
              </ul>

              <h2>🔐 Configura tu Contraseña:</h2>
              <ul>
                  <li>No guardes tu contraseña en dispositivos públicos o compartidos.</li>
              </ul>

              <h2>📲 Evita el Acceso No Autorizado:</h2>
              <ul>
                  <li>No guardes tu contraseña en dispositivos públicos o compartidos.</li>
              </ul>

              <p>📢 ¿Olvidaste tu Contraseña o Sospechas de un Robo?</p>
              <p>Si crees que tu cuenta ha sido comprometida o necesitas recuperar tu acceso, contáctanos de inmediato:</p>
              <p><strong>📧 Correo Electrónico:</strong> <a href="mailto:support@hotelbits.com">support@hotelbits.com</a></p>
              <p><strong>📞 Teléfono:</strong> +1 (800) 123-4567</p>
          </div>

      </div>

      <div class="footer">
             <div class="social-links">
                <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png" alt="Facebook" class="social-icon"></a>
                <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" alt="Instagram" class="social-icon"></a>
                <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2491px-Logo_of_Twitter.svg.png" alt="Twitter" class="social-icon"></a>
             </div>
             <div class="footer-links">
                 <a href="#">Política de Privacidad</a>
                 •
                 <a href="#">Contáctenos</a>
             </div>
             <p>&copy; 2025 HotelBits. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
`

export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cambio de Contraseña</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
            color: #1e293b;
            line-height: 1.5;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background-color: #EFF6FF;
        }

        .logo {
            font-size: 24px;
            font-weight: 600;
            color: #1e293b;
            text-decoration: none;
        }

        .login-button {
            font-size: 34px;
            font-weight: 600;
            width: 36px;
            height: 36px;
            border: 0;
            outline: none;
            text-decoration: none;
        }

        .content {
            padding: 40px 20px;
            text-align: center;
        }

        .password-icon {
            width: 150px;
            height: 130px;
            margin: 0 auto 20px;
        }

        .title {
            font-size: 24px;
            font-weight: 600;
            color: #081B5D;
            margin-bottom: 20px;
        }

        .otp-box {
            background-color: #EFF6FF;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            font-size: 24px;
            font-weight: 600;
            color: #3B82F6;
            letter-spacing: 2px;
        }

        .message {
            color: #475569;
            margin-bottom: 20px;
            font-size: 16px;
        }

        .security-tips {
            background-color: #EFF6FF; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
            text-align: left; 
        }

        .security-tips h2 {
            color: #1e293b; 
            font-size: 20px; 
            margin-bottom: 15px; 
        }

        .security-tips ul {
            margin: 0; 
            padding-left: 20px; 
            color: #475569; 
        }

        .security-tips li {
            margin-bottom: 10px; 
        }

        .footer {
             background-color: #1e293b; 
             color: white; 
             padding: 40px 20px; 
             text-align: center; 
         }

         .social-links { 
           margin-top:-30px; /* Ajuste para que no se vea muy separado */
           display:flex; 
           justify-content:center; 
           gap :10px; /* Espaciado entre iconos */
           }
        
         .social-icon { 
           width :40px; 
           height :40px; 
           }
        
         .footer-links { 
           color :#94a3b8; 
           font-size :14px; 
           margin-top :20px; 
           }
        
         .footer-links a { 
           color :#94a3b8; 
           text-decoration :none; 
           margin :0 10px; 
           }
        
         @media (max-width :600px) { 
           .container { 
              width :100%; 
              padding :10px; 
              }
            
           .header { 
              padding :15px; 
              }
        
           .content { 
              padding :20px 15px; 
              }
           }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <a href="http://localhost:5173/login" class="logo">🏨HotelBits</a>
        </div>

        <div class="content">
          <img src="http://localhost:4000/assets/password.png" alt="Cambio de contraseña" class="password-icon">
          
          <h1 class="message">👋 Estimado/a {{name}}.</h1>
          
          <p class="message">Tu dirección de correo electrónico es: {{email}}.</p>
          <p class="message">Hemos recibido su solicitud para restablecer la contraseña de su cuenta en HotelBits. Para continuar con el proceso, utilice el siguiente código OTP (One-Time Password):</p>
          
          <p class="message">🔑 Su OTP para restablecer su contraseña es:</p>
          
          <div class="otp-box">
                <strong>{{otp}}</strong>
          </div>

          <p class="message">
                Este código es válido por los próximos <strong>10 minutos</strong>. Si no solicitó un restablecimiento de contraseña, le recomendamos ignorar este correo y comunicarse con nuestro equipo de soporte inmediatamente.
          </p>

          <h1 class="title">Consejos para Mantener Segura Su Contraseña</h1>

          <div class="security-tips">
              <h2>🔒 Cree una Contraseña Segura:</h2>
              <ul>
                  <li>Use al menos 12 caracteres combinando letras mayúsculas, minúsculas, números y símbolos.</li>
                  <li>Evite usar información personal o palabras comunes.</li>
              </ul>

              <h2>🔄 Cambie Su Contraseña Regularmente:</h2>
              <ul>
                  <li>Actualice su contraseña cada 3-6 meses para minimizar riesgos.</li>
              </ul>

              <h2>🤫 No Comparta Su Contraseña:</h2>
              <ul>
                  <li>Mantenga sus credenciales privadas y nunca las comparta con terceros.</li>
              </ul>

              <p>Si necesita más ayuda o tiene alguna pregunta, no dude en contactarnos:</p>
              <p><strong>📧 Correo Electrónico:</strong> <a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="9be8f4ebf4e9effedbf3f4effef7f9f2efe8b5f8f4f6">[email&#160;protected]</a></p>
              <p><strong>📞 Teléfono:</strong> +1 (800) 123-4567</p>
          </div>

      </div>

      <div class="footer">
             <div class="social-links">
                <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png" alt="Facebook" class="social-icon"></a>
                <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png" alt="Instagram" class="social-icon"></a>
                <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2491px-Logo_of_Twitter.svg.png" alt="Twitter" class="social-icon"></a>
             </div>
             <div class="footer-links">
                 <a href="#">Política de Privacidad</a>
                 •
                 <a href="#">Contáctenos</a>
             </div>
             <p>&copy; 2025 HotelBits. Todos los derechos reservados.</p>
        </div>
         </div>
    </div>
<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script></body>
</html>
`