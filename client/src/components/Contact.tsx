import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
const Contact = () => {
  return (
    <section 
      id="contact" 
      className="min-h-screen flex items-center justify-center container mx-auto px-4 py-16 pb-24"
    >
      <InView triggerOnce>
        {({ inView, ref }) => (
          <div ref={ref} className="w-full max-w-2xl">
            <motion.h2 
              className="text-4xl font-orbitron font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
            >
              Contato
            </motion.h2>

            <motion.form
              action="https://formspree.io/f/mvgveyeq" 
              method="POST"
              className="flex flex-col gap-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              
              <div className="relative">
                <input 
                  type="text" 
                  name="name"
                  id="name"
                  required
                  className="w-full p-3 bg-space-blue/30 border border-space-blue rounded-lg
                             text-white placeholder-transparent peer
                             focus:outline-none focus:ring-2 focus:ring-space-purple"
                  placeholder="Nome"
                />
                <label 
                  htmlFor="name"
                  className="absolute left-3 -top-2.5 bg-space-dark px-1
                             text-sm text-space-light transition-all
                             peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base
                             peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-space-purple"
                >
                  Nome
                </label>
              </div>

              <div className="relative">
                <input 
                  type="email" 
                  name="_replyto" 
                  id="email"
                  required
                  className="w-full p-3 bg-space-blue/30 border border-space-blue rounded-lg
                             text-white placeholder-transparent peer
                             focus:outline-none focus:ring-2 focus:ring-space-purple"
                  placeholder="E-mail"/>
                <label 
                  htmlFor="email"
                  className="absolute left-3 -top-2.5 bg-space-dark px-1
                             text-sm text-space-light transition-all
                             peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base
                             peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-space-purple"
                >
                  E-mail
                </label>
              </div>
              
              <div className="relative">
                <textarea 
                  name="message"
                  id="message"
                  rows={5}
                  required
                  className="w-full p-3 bg-space-blue/30 border border-space-blue rounded-lg
                             text-white placeholder-transparent peer
                             focus:outline-none focus:ring-2 focus:ring-space-purple"
                  placeholder="Mensagem"
                />
                <label 
                  htmlFor="message"
                  className="absolute left-3 -top-2.5 bg-space-dark px-1
                             text-sm text-space-light transition-all
                             peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base
                             peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-space-purple"
                >
                  Mensagem
                </label>
              </div>

              <motion.button
                type="submit"
                className="px-6 py-3 bg-space-purple text-white font-bold font-orbitron rounded-lg shadow-lg shadow-space-purple/50 transition-all hover:bg-opacity-80"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(107, 33, 168, 1)"
                }}
              >
                Enviar Mensagem
              </motion.button>
            </motion.form>

            <motion.div 
              className="flex justify-center gap-8 mt-12"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <a href="https://github.com/Anderson-full" target="_blank" rel="noopener noreferrer">
                <FaGithub className="w-8 h-8 text-space-light transition-all hover:text-space-purple hover:scale-125" />
              </a>
              <a href="https://www.linkedin.com/in/anderson-souza-060489206/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="w-8 h-8 text-space-light transition-all hover:text-space-purple hover:scale-125" />
              </a>
              <a href="mailto:andersonfulldev@gmail.com">
                <FaEnvelope className="w-8 h-8 text-space-light transition-all hover:text-space-purple hover:scale-125" />
              </a>
            </motion.div>
          </div>
        )}
      </InView>
    </section>
  );
};

export default Contact;