import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaJsSquare,
  FaReact, 
  FaVuejs, 
  FaNodeJs, 
  FaFigma 
} from 'react-icons/fa';
import { SiC, SiVite, SiTypescript } from 'react-icons/si'; 


const frontendSkills = [
  { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
  { name: 'JavaScript', icon: FaJsSquare, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  { name: 'Vue.js', icon: FaVuejs, color: '#4FC08D' },
  { name: 'Figma', icon: FaFigma, color: '#F24E1E' }, 
  { name: 'Vite', icon: SiVite, color: '#646CFF' }, 
];

const backendSkills = [
  { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
  { name: 'C', icon: SiC, color: '#A8B9CC' }, 
];

const Skills = () => {
  return (
    <section 
      id="skills" 
      className="min-h-screen flex items-center justify-center container mx-auto px-4 py-16"
    >
      <InView triggerOnce>
        {({ inView, ref }) => (
          <div ref={ref} className="w-full">
            <motion.h2 
              className="text-4xl font-orbitron font-bold mb-12 text-center"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1 }}
            >
              Habilidades
            </motion.h2>
            <h3 className="text-3xl font-orbitron font-bold mb-8 text-center text-space-purple">
              Frontend
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 mb-16"> {/* <-- ATUALIZADO PARA 8 COLUNAS */}
              {frontendSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="flex flex-col items-center p-4 bg-space-blue/30 backdrop-blur-sm rounded-lg"
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }} 
                  
                  whileHover={{ 
                    scale: 1.1, 
                    rotateY: 15, 
                    boxShadow: "0 0 20px rgba(107, 33, 168, 0.7)" 
                  }}
                >
                  <skill.icon className="w-12 h-12" style={{ color: skill.color }} />
                  <span className="mt-4 font-semibold">{skill.name}</span>
                </motion.div>
              ))}
            </div>
            <h3 className="text-3xl font-orbitron font-bold mb-8 text-center text-green-500">
              Backend
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8"> {/* <-- ATUALIZADO PARA 8 COLUNAS */}
              {backendSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="flex flex-col items-center p-4 bg-space-blue/30 backdrop-blur-sm rounded-lg"
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: (frontendSkills.length + index) * 0.1 }}
                  
                  whileHover={{ 
                    scale: 1.1, 
                    rotateY: 15, 
                    boxShadow: "0 0 20px rgba(34, 197, 94, 0.7)"
                  }}
                >
                  <skill.icon className="w-12 h-12" style={{ color: skill.color }} />
                  <span className="mt-4 font-semibold">{skill.name}</span>
                </motion.div>
              ))}
            </div>

          </div>
        )}
      </InView>
    </section>
  );
};

export default Skills;