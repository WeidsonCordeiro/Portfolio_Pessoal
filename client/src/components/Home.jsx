//Animations
import { motion } from "framer-motion";

const Home = () => {
  return (
    <section
      id="home"
      className="min-vh-100 d-flex align-items-center justify-content-center text-center px-3 pt-5"
    >
      <div>
        <motion.h1
          className="display-3 display-md-2 display-lg-1 fw-bold text-white transition-custom"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="text-shimmer">
            Weidson Cordeiro, Transformando Ideias em Realidade
          </span>
          <br />
          <span className="fs-4">Full Stack Developer | React & Node.js</span>
        </motion.h1>
      </div>
    </section>
  );
};

export default Home;
