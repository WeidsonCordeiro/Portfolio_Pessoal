import { useTranslation } from "react-i18next";
import { experienceItems } from "../data/experience";

const Experience = () => {
  const { t } = useTranslation();

  return (
    <section
      id="experience"
      className="section-block container-fluid px-3 py-5"
    >
      <h2 className="display-5 fw-bold mb-5 text-center">{t("experience.title")}</h2>
      <div className="row g-4 justify-content-center">
        {experienceItems.map((item) => {
          const key = `experience.items.${item.id}`;
          const highlights = t(`${key}.highlights`, { returnObjects: true });

          return (
            <article key={item.id} className="col-12 col-lg-4">
              <div className="experience-card box-shadow-custom h-100">
                <p className="experience-period mb-1">{t(`${key}.period`)}</p>
                <h3 className="experience-title mb-3">{t(`${key}.title`)}</h3>
                <p className="experience-description">{t(`${key}.description`)}</p>
                <ul className="experience-highlights">
                  {Array.isArray(highlights) &&
                    highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
