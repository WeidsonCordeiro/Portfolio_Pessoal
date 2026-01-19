import { useState } from "react";
import GalaxyBackground from "./components/GalaxyBackground";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CosmicLoader from "./components/CosmicLoader";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  const [isContentReady, setIsContentReady] = useState(false);

  const handleLoadComplete = () => {
    setIsContentReady(true);
  };

  return (
    <div
      className="position-relative"
      style={{ zIndex: 0, minHeight: "100vh" }}
    >
      {!isContentReady && <CosmicLoader onLoadComplete={handleLoadComplete} />}

      {isContentReady && (
        <>
          <GalaxyBackground />
          <MusicPlayer />
          <Header />

          <main>
            <Home />
            <About />
            <Skills />
            <Projects />
            <Resume />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
