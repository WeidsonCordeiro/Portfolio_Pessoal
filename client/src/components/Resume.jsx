import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";
import { FaDownload } from "react-icons/fa";
import { IoRocketSharp } from "react-icons/io5";

const educationItems = [
  {
    year: "2025 - 2027 (Previsto)",
    title: "Analise e Desenvolvimento de Sistemas",
    description: "Faculdade Unichristus",
  },
  {
    year: "Cursando",
    title: "Curso Avançado de Front End",
    description: "Origamid",
  },
  {
    year: "2017 - 2019",
    title: "Técnico em Informática",
    description: "EEEP Rita Matos Luna",
  },
  {
    year: "Concluído",
    title: "Cursos Complementares (Bradesco)",
    description: "Soluções de IA no GitHub, Modelagem de Dados e LGPD",
  },
];

const experienceItems = [
  {
    year: "Atual",
    title: "Desenvolvedor Freelancer",
    description: "Desenvolvimento de projetos web Full Stack e Landing Pages.",
  },
  {
    year: "Duração: 6 meses",
    title: "Estagio/Suporte técnico em informática",
    description: "Secretaria da Educação (SEDUC)",
  },
];

const TimelineColumn = ({ items, inView, textColor, bgColor }) => {
  return (
    <div className="position-relative">
      <div
        className="position-absolute start-50 top-0 h-100"
        style={{
          width: "2px",
          backgroundColor: "#1e1e3f",
          transform: "translateX(-50%)",
        }}
      />

      {items.map((item, index) => (
        <motion.div
          key={index}
          className="mb-5 ps-4 position-relative"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
        >
          <div
            className={`position-absolute start-50 top-0 rounded-circle d-flex align-items-center justify-content-center text-white`}
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: bgColor,
              transform: "translateX(-50%)",
              zIndex: 10,
              boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
            }}
          >
            <IoRocketSharp size={20} />
          </div>

          <p className={`small mb-1 font-exo ${textColor}`}>{item.year}</p>
          <h3 className="font-orbitron h5 fw-bold text-space-light">
            {item.title}
          </h3>
          <p className="small text-secondary">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

const Resume = () => {
  const pdfFileName = "Curriculo para TI (1).pdf";

  return (
    <section
      id="resume"
      className="min-vh-100 d-flex align-items-center justify-content-center container-fluid px-3 py-4"
    >
      <InView triggerOnce>
        {({ inView, ref }) => (
          <div ref={ref} className="w-100" style={{ maxWidth: "1200px" }}>
            <motion.h2
              className="display-5 font-orbitron fw-bold mb-5 text-center"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1 }}
            >
              Currículo
            </motion.h2>

            <motion.div
              className="text-center mb-5"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a
                href={`/${pdfFileName}`}
                download
                className="btn btn-lg fw-bold font-orbitron d-inline-flex align-items-center gap-2"
                style={{
                  backgroundColor: "#6b21a8",
                  color: "#fff",
                  border: "none",
                  boxShadow: "rgba(107, 33, 168, 0.5) 0px 0px 30px",
                }}
              >
                <FaDownload />
                Baixar Currículo (PDF)
              </a>
            </motion.div>

            <div className="row">
              <div className="col-12 col-md-6">
                <h3
                  className="h4 font-orbitron fw-bold mb-4 text-center"
                  style={{ color: "#6b21a8" }}
                >
                  Formação & Cursos
                </h3>

                <TimelineColumn
                  items={educationItems}
                  inView={inView}
                  textColor="text-space-purple"
                  bgColor="#6b21a8"
                />
              </div>

              <div className="col-12 col-md-6">
                <h3 className="h4 font-orbitron fw-bold mb-4 text-center text-success">
                  Experiências
                </h3>

                <TimelineColumn
                  items={experienceItems}
                  inView={inView}
                  textColor="text-success"
                  bgColor="#28a745"
                />
              </div>
            </div>
          </div>
        )}
      </InView>
    </section>
  );
};

export default Resume;
