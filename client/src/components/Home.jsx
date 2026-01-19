import { motion } from "framer-motion";
import TextScramble from "./TextScramble";

const Home = () => {
  return (
    <section
      id="home"
      className="min-vh-100 d-flex align-items-center justify-content-center text-center px-3 pt-5"
    >
      <div>
        <motion.h1
          className="display-3 display-md-2 display-lg-1 fw-bold font-orbitron text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <TextScramble
            text="Weidson Cordeiro, Desenvolvedor Full Stack"
            startDelay={1000}
            scrambleSpeed={40}
          />

          <br />
          <span className="h4 text-space-light font-exo">
            Weidson Cordeiro, Desenvolvedor Full Stack
          </span>
        </motion.h1>
      </div>
    </section>
  );
};

export default Home;
