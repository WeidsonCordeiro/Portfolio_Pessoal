
import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';
import { FaDownload } from 'react-icons/fa'; 
import { IoRocketSharp } from 'react-icons/io5';

const educationItems = [
  {
    year: '2025 - 2027 (Previsto)',
    title: 'Analise e Desenvolvimento de Sistemas',
    description: 'Faculdade Unichristus',
  },
  {
    year: 'Cursando',
    title: 'Curso Avançado de Front End',
    description: 'Origamid',
  },
  {
    year: '2017 - 2019',
    title: 'Técnico em Informática',
    description: 'EEEP Rita Matos Luna',
  },
  {
    year: 'Concluído',
    title: 'Cursos Complementares (Bradesco)',
    description: 'Soluções de IA no GitHub, Modelagem de Dados e LGPD',
  },
];

const experienceItems = [
  {
    year: 'Atual',
    title: 'Desenvolvedor Freelancer', 
    description: 'Desenvolvimento de projetos web Full Stack e Landing Pages.',
  },
  {
    year: 'Duração: 6 meses',
    title: 'Estagio/Suporte técnico em informática',
    description: 'Secretaria da Educação (SEDUC)',
  },
];

interface ColumnProps {
  items: typeof educationItems;
  inView: boolean;
  textColor: string; 
  bgColor: string;   
}

const TimelineColumn = ({ items, inView, textColor, bgColor }: ColumnProps) => {
  return (
    <div className="relative">
      <div className="absolute left-5 top-0 h-full w-0.5 bg-space-blue -translate-x-1/2" />

      {items.map((item, index) => (
        <motion.div
          key={index}
          className="mb-10 pl-12 relative" 
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
        >
      
          <div className={`absolute left-0 top-1 z-10 -translate-x-1/2 ${bgColor}`}>
            <div className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center text-white shadow-lg`}>
              <IoRocketSharp className="w-5 h-5" />
            </div>
          </div>
          
          
          <p className={`text-sm ${textColor} mb-1 font-exo`}>{item.year}</p>
          <h3 className="font-orbitron text-lg font-bold text-space-light">{item.title}</h3>
          <p className="text-sm text-gray-400">{item.description}</p>
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
      className="min-h-screen flex items-center justify-center container mx-auto px-4 py-16"
    >
      <InView triggerOnce>
        {({ inView, ref }) => (
          <div ref={ref} className="w-full max-w-5xl">
            <motion.h2 
              className="text-4xl font-orbitron font-bold mb-12 text-center"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1 }}
            >
              Currículo
            </motion.h2>

           
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a
                href={`/${pdfFileName}`} 
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-space-purple text-white font-bold font-orbitron rounded-lg shadow-lg shadow-space-purple/50 transition-all hover:bg-opacity-80 hover:shadow-xl"
              >
                <FaDownload />
                Baixar Currículo (PDF)
              </a>
            </motion.div>

        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              
              
              <div>
                <h3 className="text-3xl font-orbitron font-bold mb-8 text-center text-space-purple">
                  Formação & Cursos
                </h3>
                
                <TimelineColumn 
                  items={educationItems} 
                  inView={inView} 
                  textColor="text-space-purple" 
                  bgColor="bg-space-purple" 
                />
              </div>

            
              <div>
                <h3 className="text-3xl font-orbitron font-bold mb-8 text-center text-green-500">
                  Experiências
                </h3>
               
                <TimelineColumn 
                  items={experienceItems} 
                  inView={inView} 
                  textColor="text-green-500" 
                  bgColor="bg-green-500" 
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