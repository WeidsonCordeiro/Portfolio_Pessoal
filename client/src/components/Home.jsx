import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="section-block section-block-hero d-flex align-items-center justify-content-center text-center px-3 pt-5"
    >
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="hero-eyebrow mb-2">{t("hero.eyebrow")}</p>
          <h1 className="display-4 fw-bold text-white mb-3">
            <span className="text-shimmer">{t("hero.name")}</span>
          </h1>
          <p className="fs-4 text-white-50 mb-2">{t("hero.tagline")}</p>
          <p className="fs-5 mb-2">{t("hero.role")}</p>
          <p className="mb-4 hero-focus">{t("hero.focus")}</p>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <a href="#projects" className="btn btn-contact-custom px-4 py-2">
              {t("hero.ctaProjects")}
            </a>
            <a href="#contact" className="btn btn-hero-outline px-4 py-2">
              {t("hero.ctaContact")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
