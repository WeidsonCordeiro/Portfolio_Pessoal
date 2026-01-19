import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaFigma,
} from "react-icons/fa";
import { SiC, SiVite, SiTypescript } from "react-icons/si";

const frontendSkills = [
  { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
  { name: "JavaScript", icon: FaJsSquare, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Vue.js", icon: FaVuejs, color: "#4FC08D" },
  { name: "Figma", icon: FaFigma, color: "#F24E1E" },
  { name: "Vite", icon: SiVite, color: "#646CFF" },
];

const backendSkills = [
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "C", icon: SiC, color: "#A8B9CC" },
];

const SkillCard = ({ skill, index }) => (
  <motion.div
    className="d-flex flex-column align-items-center p-3"
    style={{
      backgroundColor: "rgba(30, 30, 63, 0.3)",
      backdropFilter: "blur(10px)",
      borderRadius: "0.5rem",
      minHeight: "150px",
      justifyContent: "center",
    }}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{
      scale: 1.1,
      boxShadow: "0 0 20px rgba(107, 33, 168, 0.7)",
    }}
  >
    <skill.icon size={40} color={skill.color} />
    <span className="mt-3 fw-semibold">{skill.name}</span>
  </motion.div>
);

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-vh-100 d-flex align-items-center justify-content-center container-fluid px-3 py-4"
    >
      <InView triggerOnce>
        {({ inView, ref }) => (
          <div ref={ref} className="w-100">
            <motion.h2
              className="display-5 font-orbitron fw-bold mb-5 text-center"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1 }}
            >
              Habilidades
            </motion.h2>
            <h3
              className="h3 font-orbitron fw-bold mb-4 text-center"
              style={{ color: "#6b21a8" }}
            >
              Frontend
            </h3>
            <div className="row row-cols-2 row-cols-md-4 row-cols-lg-8 g-4 mb-5">
              {frontendSkills.map((skill, index) => (
                <div key={skill.name} className="col">
                  <SkillCard skill={skill} index={index} />
                </div>
              ))}
            </div>
            <h3 className="h3 font-orbitron fw-bold mb-4 text-center text-success">
              Backend
            </h3>
            <div className="row row-cols-2 row-cols-md-4 row-cols-lg-8 g-4">
              {backendSkills.map((skill, index) => (
                <div key={skill.name} className="col">
                  <SkillCard skill={skill} index={index} />
                </div>
              ))}
            </div>
          </div>
        )}
      </InView>
    </section>
  );
};

export default Skills;
