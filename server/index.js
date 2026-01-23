const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();
// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.post("/api/setEmail", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validação
    if (!name || !email || !message) {
      return res.status(400).json({
        errors: ["Nome, e-mail e mensagem são obrigatórios"],
      });
    }

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        errors: ["E-mail inválido"],
      });
    }

    const url = "https://api.emailjs.com/api/v1.0/email/send";

    let templateParams = {
      name,
      email,
      message,
    };

    // Verifique se as variáveis de ambiente estão definidas
    if (
      !process.env.EMAILJS_API_SERVICE_KEY ||
      !process.env.EMAILJS_API_TEMPLATE_PORTIFOLIO_KEY ||
      !process.env.EMAILJS_API_PUBLIC_KEY
    ) {
      console.error("Variáveis de ambiente do EmailJS não configuradas");
      return res.status(500).json({
        errors: ["Configuração do servidor incompleta"],
      });
    }

    const requestBody = {
      service_id: process.env.EMAILJS_API_SERVICE_KEY,
      template_id: process.env.EMAILJS_API_TEMPLATE_PORTIFOLIO_KEY,
      user_id: process.env.EMAILJS_API_PUBLIC_KEY,
      template_params: templateParams,
    };

    // Adicione accessToken se tiver a chave privada
    if (process.env.EMAILJS_API_PRIVATE_KEY) {
      requestBody.accessToken = process.env.EMAILJS_API_PRIVATE_KEY;
    }

    const response = await fetch(url, requestBody);

    const responseText = await response.text();
    console.log(response);
    console.log(responseText);
    console.log("Resposta do EmailJS:", response.status, responseText);

    if (!response.ok) {
      throw new Error(`EmailJS retornou ${response.status}: ${responseText}`);
    }

    // Tente parsear como JSON se possível
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }

    res.status(200).json({
      success: "Email enviado com sucesso!",
      data: responseData,
    });
  } catch (err) {
    console.error("Erro detalhado no /api/setEmail:", err);
    res.status(500).json({
      errors: [err.message],
      details: "Verifique as configurações do EmailJS",
    });
  }
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "API funcionando",
    env_vars: {
      has_service_key: !!process.env.EMAILJS_API_SERVICE_KEY,
      has_template_key: !!process.env.EMAILJS_API_TEMPLATE_PORTIFOLIO_KEY,
      has_public_key: !!process.env.EMAILJS_API_PUBLIC_KEY,
      port: process.env.PORT,
    },
    node_version: process.version,
  });
});

//Middleware de Tratamento de Erros Global:
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ errors: [err.message] });
});

// Test route under /api
app.get("/api", (req, res) => {
  res.send("API is working!");
});

app.listen(port, () => {
  console.log(`🚀 Server run in http://localhost:${port}`);
});

module.exports = app;
