//Hooks
import { useEffect, useState } from "react";

//Animations
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";

//Icons
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { HiMiniDocumentArrowDown } from "react-icons/hi2";

//Utils
import { requestConfig } from "../utils/config";

//Documents
import CV_Portugues from "../assets/doc/CV_BR_Weidson_Cordeiro.pdf";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const pdfFileNamePortugues = "CV-BR-Weidson Cordeiro.pdf";

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    const formData = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    const config = requestConfig("POST", formData, null);
    try {
      const res = await fetch(`/api/sendEmailContacto`, config);
      const result = await res.json();

      if (result.errors) {
        console.log("Erros", error);
        setError(result.errors);
        return;
      }

      // Limpa campos
      setName("");
      setEmail("");
      setMessage("");
      setSuccess("E-mail enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar E-mail:", error);
      setError("Erro ao enviar E-mail. Tente novamente!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success]);

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
              noValidate
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
                {error && (
                  <div
                    className="errormsg mt-3"
                    style={{ display: error ? "block" : "none" }}
                  >
                    <p>{error}</p>
                  </div>
                )}
                {success && (
                  <div
                    className="successmsg mt-3"
                    style={{ display: success ? "block" : "none" }}
                  >
                    <p>{success}</p>
                  </div>
                )}
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
              <a href={CV_Portugues} download>
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
