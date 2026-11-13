import SiteHelmet from "./components/SiteHelmet";
import GalaxyBackground from "./components/GalaxyBackground";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <SiteHelmet />
      <div className="app-shell position-relative" style={{ minHeight: "100vh" }}>
        <GalaxyBackground />
        <div className="app-shell-content">
          <Header />
          <main id="main-content">
            <Home />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
