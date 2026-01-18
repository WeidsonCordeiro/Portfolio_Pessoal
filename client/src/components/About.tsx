import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';
import { FaInstagram } from 'react-icons/fa';

const About = () => {
 const instagramUsername = "anderson_souza42"; 
  const imagePath = "/imagen/B7D9F2CB-2C71-4338-9868-6637A3AD414B.jpeg";

  return (
    <section 
      id="about" 
      className="min-h-screen flex items-center justify-center container mx-auto px-4 py-16"
    >
      <InView triggerOnce>
        {({ inView, ref }) => (
          <motion.div
            ref={ref}
            className="w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-orbitron font-bold mb-10 text-center">
              Quem Sou Eu
            </h2>

          
            <div className="flex flex-col md:flex-row items-center md:items-start gap-12 max-w-4xl mx-auto">
              
            
              <div className="flex-shrink-0 w-full md:w-1/3 text-center">
                <motion.img
                  src={imagePath} 
                  alt="Anderson de Souza Bezerra"
                  className="w-40 h-40 md:w-full md:h-auto object-cover rounded-full md:rounded-lg mx-auto mb-4 border-4 border-space-purple shadow-galaxy-glow"
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                />

                <motion.a
                  href={`https://www.instagram.com/${instagramUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-space-light font-exo hover:text-space-purple transition-colors mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <FaInstagram className="w-5 h-5" />
                  @{instagramUsername}
                </motion.a>
              </div>
              <div className="md:w-2/3">
                <div className="text-lg md:text-xl text-space-light leading-relaxed text-center md:text-left">
                  {inView && (
                    <TypeAnimation
                      sequence={[
                        'Sou Anderson, desenvolvedor Full Stack que transforma código em constelações de experiências digitais. Exploro o universo do frontend e backend com tecnologias modernas, criando interfaces cósmicas e imersivas que conectam imaginação e inovação.',
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