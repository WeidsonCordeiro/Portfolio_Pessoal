//Components
import GalaxyBackground from "./components/GalaxyBackground";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div
      className="position-relative"
      style={{ zIndex: 0, minHeight: "100vh" }}
    >
      <>
        <GalaxyBackground />
        <Header />
        <main>
          <Home />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </>
    </div>
  );
}

export default App;
