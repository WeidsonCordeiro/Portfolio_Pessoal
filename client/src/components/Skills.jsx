//Animations
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";

//Icons
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

const skills = [
  { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
  { name: "JavaScript", icon: FaJsSquare, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  // { name: "Vue.js", icon: FaVuejs, color: "#4FC08D" },
  // { name: "Figma", icon: FaFigma, color: "#F24E1E" },
  // { name: "Vite", icon: SiVite, color: "#646CFF" },
];

const SkillCard = ({ skill, index }) => (
  <motion.div
    className="d-flex flex-column align-items-center p-3 skill-card box-shadow-custom"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
  >
    <skill.icon size={48} color={skill.color} />
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
              className="display-5 fw-bold mb-5 text-center transition-custom"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Habilidades
            </motion.h2>
            <motion.h3
              className="h3 fw-bold mb-4 text-center text-success transition-custom"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              style={{ color: "#6b21a8" }}
            >
              Fullstack
            </motion.h3>
            <div className="skills-grid mb-5">
              {skills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>
        )}
      </InView>
    </section>
  );
};

export default Skills;
