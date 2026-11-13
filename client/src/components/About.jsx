import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import perfil from "../assets/img/Perfil.jpg";

const About = () => {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="section-block d-flex align-items-center justify-content-center container-fluid px-3 py-4"
    >
      <div className="w-100">
        <h2 className="display-5 fw-bold mb-5 text-center">{t("about.title")}</h2>

        <motion.div
          className="row align-items-center gap-5 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="col-12 col-md-5 text-center">
            <img
              src={perfil}
              alt={t("hero.name")}
              className="w-100 rounded-circle border border-4 mx-auto d-block mb-3 img-about-custom"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
          <div className="col-12 col-md-6">
            <p className="text-center lh-base text-md-start fs-5">{t("about.bio")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
