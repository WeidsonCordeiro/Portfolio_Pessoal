import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'; 

dotenv.config();

const PORT = process.env.PORT || 3002; 
const NASA_API_KEY = process.env.NASA_API_KEY;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_TO = process.env.EMAIL_TO;

console.log('--- DIAGNÓSTICO DE E-MAIL ---');
console.log('User (Envio):', EMAIL_USER);
console.log('Pass (Lida?):', EMAIL_PASS && EMAIL_PASS.length > 5 ? 'LIDA (escondida)' : 'FALHA DE LEITURA'); 
console.log('To (Destino):', EMAIL_TO);
console.log('-----------------------------');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
})); 
app.use(express.json()); 

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});


app.get('/api/apod', async (req, res) => {
    res.status(500).json({ error: 'A API da NASA foi removida. O servidor está OK.' });
});

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!EMAIL_USER || !EMAIL_PASS) {
        console.error('❌ Credenciais de E-mail não configuradas no .env!');
        return res.status(500).json({ error: 'Serviço de e-mail indisponível. Credenciais do backend ausentes.' });
    }

    const mailOptions = {
        from: `"${name}" <${email}>`, 
        to: EMAIL_TO,                 
        subject: `[PORTFÓLIO GALÁXIA] Nova mensagem de: ${name}`,
        text: `E-mail: ${email}\n\nMensagem:\n${message}`,
        html: `
            <p>Você recebeu uma nova mensagem do seu Portfólio Galáxia!</p>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <hr>
            <p><strong>Mensagem:</strong></p>
            <p>${message}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ E-mail enviado com sucesso!');
        res.status(200).json({ message: 'Mensagem enviada com sucesso! Em breve entraremos em contato.' });
    } catch (error) {
        console.error('❌ Erro ao enviar E-mail (Verifique Senha de Aplicativo):', error);
        res.status(500).json({ error: 'Falha ao enviar e-mail. Acesso ao servidor de e-mail negado (verifique a Senha de App).' });
    }
});

app.listen(Number(PORT), () => { 
  console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
});