import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";
import { FaInstagram } from "react-icons/fa";

const About = () => {
  const instagramUsername = "anderson_souza42";
  const imagePath = "/imagen/B7D9F2CB-2C71-4338-9868-6637A3AD414B.jpeg";

  return (
    <section
      id="about"
      className="min-vh-100 d-flex align-items-center justify-content-center container-fluid px-3 py-4"
    >
      <InView triggerOnce>
        {({ inView, ref }) => (
          <motion.div
            ref={ref}
            className="w-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="display-5 font-orbitron fw-bold mb-5 text-center">
              Quem Sou Eu
            </h2>

            <div className="row align-items-center align-items-md-start gap-5 max-w-4xl mx-auto">
              <div className="col-12 col-md-4 text-center">
                <motion.img
                  src={imagePath}
                  alt="Weidson Cordeiro"
                  className="w-100 rounded-circle border border-4 mx-auto d-block mb-3"
                  style={{ borderColor: "#6b21a8", maxWidth: "300px" }}
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                />

                <motion.a
                  href={`https://www.instagram.com/${instagramUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-inline-flex align-items-center gap-2 text-space-light"
                  style={{ textDecoration: "none", fontSize: "0.95rem" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <FaInstagram className="me-2" />@{instagramUsername}
                </motion.a>
              </div>
              <div className="col-12 col-md-8">
                <div
                  style={{ fontSize: "1.1rem" }}
                  className="text-space-light text-center text-md-start"
                >
                  {inView && (
                    <TypeAnimation
                      sequence={[
                        "Sou Weidson, desenvolvedor Full Stack que transforma código em constelações de experiências digitais. Exploro o universo do frontend e backend com tecnologias modernas, criando interfaces cósmicas e imersivas que conectam imaginação e inovação.",
                        3000,
                      ]}
                      wrapper="p"
                      speed={50}
                      repeat={0}
                      cursor={true}
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </InView>
    </section>
  );
};

export default About;
