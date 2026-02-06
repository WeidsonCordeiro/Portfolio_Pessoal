//Animations
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";

//Images
import perfil from "../assets/img/Perfil.jpg";

const About = () => {
  return (
    <section
      id="about"
      className="min-vh-100 d-flex align-items-center justify-content-center container-fluid px-3 py-4"
    >
      <InView triggerOnce>
        {({ inView, ref }) => (
          <motion.div ref={ref} className="w-100">
            <motion.h2
              className="display-5 fw-bold mb-5 text-center transition-custom"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Quem Sou Eu
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="row align-items-center gap-5 max-w-4xl mx-auto transition-custom"
            >
              <div className="col-12 col-md-5 text-center">
                <motion.img
                  src={perfil}
                  alt="Weidson Cordeiro"
                  className="w-100 rounded-circle border border-4 mx-auto d-block mb-3 img-about-custom"
                />
              </div>
              <div className="col-12 col-md-6">
                <div className="text-center lh-base text-md-start fs-5">
                  {inView && (
                    <TypeAnimation
                      sequence={[
                        "Sou Weidson Cordeiro, desenvolvedor Full Stack com experiência em criar soluções digitais eficientes e modernas. Atuo no desenvolvimento frontend e backend, utilizando tecnologias atuais para entregar interfaces funcionais e experiências de usuário otimizadas.",
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
            </motion.div>
          </motion.div>
        )}
      </InView>
    </section>
  );
};

export default About;
