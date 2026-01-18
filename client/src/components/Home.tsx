import { motion } from 'framer-motion';
import TextScramble from './TextScramble'; 

const Home = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center text-center relative px-4 pt-32"
    >
      <div>
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold font-orbitron text-white leading-tight" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.5 }} 
        >
          
          <TextScramble 
            text="Explorando o universo com código"
            startDelay={1000} 
            scrambleSpeed={40}  
          />
          
          <br />
          <span className="text-3xl md:text-4xl lg:text-5xl text-space-light font-exo">
            Anderson de Souza Bezerra, Desenvolvedor Full Stack
          </span>
        </motion.h1>
      </div>
      
    </section>
  );
};

export default Home;