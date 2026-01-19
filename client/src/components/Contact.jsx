import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-vh-100 d-flex align-items-center justify-content-center container-fluid px-3 py-4 pb-5"
    >
      <InView triggerOnce>
        {({ inView, ref }) => (
          <div ref={ref} className="w-100" style={{ maxWidth: "600px" }}>
            <motion.h2
              className="display-5 font-orbitron fw-bold mb-5 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
            >
              Contato
            </motion.h2>

            <motion.form
              action="https://formspree.io/f/mvgveyeq"
              method="POST"
              className="d-flex flex-column gap-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="form-control"
                  placeholder="Nome"
                  style={{
                    backgroundColor: "rgba(30, 30, 63, 0.3)",
                    borderColor: "#1e1e3f",
                    color: "#fff",
                  }}
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  name="_replyto"
                  id="email"
                  required
                  className="form-control"
                  placeholder="E-mail"
                  style={{
                    backgroundColor: "rgba(30, 30, 63, 0.3)",
                    borderColor: "#1e1e3f",
                    color: "#fff",
                  }}
                />
              </div>

              <div className="mb-3">
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  required
                  className="form-control"
                  placeholder="Mensagem"
                  style={{
                    backgroundColor: "rgba(30, 30, 63, 0.3)",
                    borderColor: "#1e1e3f",
                    color: "#fff",
                  }}
                />
              </div>

              <motion.button
                type="submit"
                className="btn fw-bold font-orbitron"
                style={{
                  backgroundColor: "#6b21a8",
                  color: "#fff",
                  border: "none",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(107, 33, 168, 1)",
                }}
              >
                Enviar Mensagem
              </motion.button>
            </motion.form>

            <motion.div
              className="d-flex justify-content-center gap-4 mt-5"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <a
                href="https://github.com/Anderson-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub
                  className="text-space-light"
                  size={32}
                  style={{ transition: "all 0.3s" }}
                />
              </a>
              <a
                href="https://www.linkedin.com/in/anderson-souza-060489206/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin
                  className="text-space-light"
                  size={32}
                  style={{ transition: "all 0.3s" }}
                />
              </a>
              <a href="mailto:andersonfulldev@gmail.com">
                <FaEnvelope
                  className="text-space-light"
                  size={32}
                  style={{ transition: "all 0.3s" }}
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
