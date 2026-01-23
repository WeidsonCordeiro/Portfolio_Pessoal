//Hooks
import { useState } from "react";

//Animations
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";

//Icons
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { HiMiniDocumentArrowDown } from "react-icons/hi2";

//Utils
import { requestConfig } from "../utils/config";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const pdfFileNamePortugues = "CV-BR-Weidson Cordeiro.pdf";

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    // Validação básica no frontend
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(["Todos os campos são obrigatórios"]);
      setIsLoading(false);
      return;
    }

    // Validação de email simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(["Por favor, insira um email válido"]);
      setIsLoading(false);
      return;
    }

    const formData = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    const config = requestConfig("POST", formData, null);
    try {
      const res = await fetch(`/api/setEmail`, config);
      const result = await res.json();

      if (result.errors) {
        setError(result.errors);
        return;
      }

      // Limpa campos
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Erro ao enviar E-mail:", error);
      setError("Erro ao enviar E-mail. Tente novamente!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-vh-100 d-flex align-items-center justify-content-center container-fluid px-3 py-4 pb-5"
    >
      <InView triggerOnce>
        {({ inView, ref }) => (
          <div ref={ref} className="w-100" style={{ maxWidth: "600px" }}>
            <motion.h2
              className="display-5 fw-bold mb-5 text-center transition-custom"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Contato
            </motion.h2>

            <motion.form
              onSubmit={handleSubmit}
              className="d-flex flex-column gap-4 transition-custom"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="mb-3 input-fields-custom">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`form-control p-3 ${name ? "filled" : ""}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="name" className="form-label">
                  Nome
                </label>
              </div>

              <div className="mb-3 input-fields-custom">
                <input
                  type="email"
                  name="_replyto"
                  id="email"
                  className={`form-control p-3 ${email ? "filled" : ""}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email" className="form-label">
                  E-mail
                </label>
              </div>

              <div className="mb-3 input-fields-custom">
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  className={`form-control p-3 ${message ? "filled" : ""}`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <label htmlFor="message" className="form-label">
                  Mensagem
                </label>
              </div>

              <motion.button
                type="submit"
                className="btn fw-bold box-shadow-custom p-3 btn-contact-custom transition-custom"
              >
                Enviar Mensagem
              </motion.button>
            </motion.form>

            <motion.div
              className="d-flex justify-content-center gap-4 mt-5 transition-custom"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <a
                href="https://github.com/WeidsonCordeiro"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="box-shadow-custom text-white" size={32} />
              </a>
              <a
                href="https://www.linkedin.com/in/weidson-cordeiro-45390244/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin
                  className="box-shadow-custom text-white"
                  size={32}
                />
              </a>
              <a href="mailto:weidson.ac@gmail.com">
                <FaEnvelope
                  className="box-shadow-custom text-white"
                  size={32}
                />
              </a>
              <a href={`/${pdfFileNamePortugues}`} download>
                <HiMiniDocumentArrowDown
                  className="box-shadow-custom text-white"
                  size={32}
                />
              </a>
            </motion.div>
          </div>
        )}
      </InView>
    </section>
  );
};

export default Contact;
