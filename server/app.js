const express = require("express");
const cors = require("cors");
const Mailjet = require("node-mailjet");
const { validatePayload } = require("./middlewares/handleValidation");
require("dotenv").config();
const port = process.env.PORT || 5000;

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/sendEmailContacto", async (req, res) => {
  const { name, email, message } = req.body;

  const validationResult = validatePayload({ name, email, message });

  if (validationResult) {
    return res.status(400).json({
      success: false,
      errors: [validationResult],
    });
  }

  try {
    // Email para você (recebendo o contato)
    const requestToYou = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.MAILJET_FROM_EMAIL,
              Name: "Portifólio - Formulário de Contato",
            },
            ReplyTo: {
              Email: email,
              Name: name,
            },
            To: [
              {
                Email: process.env.MAILJET_FROM_EMAIL, // Você recebe o email
                Name: "Weidson Cordeiro",
              },
            ],
            Subject: `Novo contato de ${name}`,
            HTMLPart: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px;">
              <h2 style="color: #2c3e50;">📬 Novo Contato Recebido</h2>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Data:</strong> ${new Date().toLocaleString(
                  "pt-BR"
                )}</p>
              </div>
              
              <div style="background: #fff; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                <h3 style="color: #34495e; margin-top: 0;">Mensagem:</h3>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p><small>Para responder, utilize: <a href="mailto:${email}">${email}</a></small></p>
              </div>
            </div>
          `,
            TextPart: `
            NOVO CONTATO
            Nome: ${name}
            Email: ${email}
            Data: ${new Date().toLocaleString("pt-BR")}
            
            MENSAGEM:
            ${message}
            
            Para responder: ${email}
          `,
          },
        ],
      });

    // Email de confirmação para O VISITANTE (opcional, mas bom)
    const requestToVisitor = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.MAILJET_FROM_EMAIL,
              Name: "Weidson Cordeiro",
            },
            To: [
              {
                Email: email,
                Name: name,
              },
            ],
            Subject: "Recebi sua mensagem!",
            HTMLPart: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px;">
              <h2 style="color: #2c3e50;">✅ Mensagem Recebida</h2>
              
              <p>Olá <strong>${name}</strong>,</p>
              
              <p>Recebi sua mensagem através do formulário de contato do meu Portifólio.</p>
              
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><em>"${message.substring(0, 100)}${
              message.length > 100 ? "..." : ""
            }"</em></p>
              </div>
              
              <p>Vou analisar sua mensagem e responderei o mais breve possível.</p>
              
              <p>Atenciosamente,<br>
              <strong>Weidson Cordeiro</strong><br>
              <small>Desenvolvedor FullStack</small></p>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
              
              <p style="font-size: 12px; color: #7f8c8d;">
                Esta é uma confirmação automática. Por favor, não responda este email.<br>
                Para entrar em contato: <a href="mailto:${
                  process.env.MAILJET_FROM_EMAIL
                }">${process.env.MAILJET_FROM_EMAIL}</a>
              </p>
            </div>
          `,
            TextPart: `
            Olá ${name},
            
            Recebi sua mensagem através do formulário de contato do meu Portifólio.
            
            Sua mensagem: "${message.substring(0, 100)}"
            
            Vou analisar e responderei o mais breve possível.
            
            Atenciosamente,
            Weidson Cordeiro
            
            ---
            Confirmação automática. Não responda este email.
          `,
          },
        ],
      });

    console.log("Emails de contato enviados com sucesso!");

    res.status(200).json({
      success: [true],
      message: ["Emails de contato enviados com sucesso!"],
    });
  } catch (errors) {
    console.error("Erro ao enviar contato:", errors);

    res.status(500).json({
      success: false,
      errors: ["Falha ao enviar mensagem"],
      details: [errors.message],
    });
  }
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
