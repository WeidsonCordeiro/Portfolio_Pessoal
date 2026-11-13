import { useTranslation } from "react-i18next";
import desktopImg from "../assets/img/schedulerpro/desktop-week.png";
import mobileImg from "../assets/img/schedulerpro/mobile.png";

export default function SchedulerProSpotlight({ onOpenScheduler }) {
  const { t } = useTranslation();
  const key = "projects.schedulerSpotlight";
  const capabilities = t(`${key}.capabilities`, { returnObjects: true });

  return (
    <section className="scheduler-spotlight mb-5" aria-labelledby="scheduler-spotlight-title">
      <div className="scheduler-spotlight-grid">
        <div>
          <p className="scheduler-spotlight-kicker mb-2">{t(`${key}.subtitle`)}</p>
          <h3 id="scheduler-spotlight-title" className="scheduler-spotlight-title">
            {t(`${key}.title`)}
          </h3>
          <p className="scheduler-spotlight-text">{t(`${key}.description`)}</p>
          <p className="scheduler-spotlight-architecture">
            <strong>{t(`${key}.architectureLabel`)}: </strong>
            {t(`${key}.architecture`)}
          </p>
          <ul className="scheduler-spotlight-list">
            {Array.isArray(capabilities) &&
              capabilities.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="d-flex flex-wrap gap-2 mt-3">
            <button
              type="button"
              className="btn btn-project-details"
              onClick={onOpenScheduler}
            >
              {t("projects.viewDetails")}
            </button>
            <span className="scheduler-spotlight-note">{t("projects.githubSoon")}</span>
          </div>
        </div>
        <div className="scheduler-spotlight-gallery">
          <img
            src={desktopImg}
            alt={t("projects.items.schedulerpro.title")}
            loading="lazy"
            decoding="async"
            className="scheduler-spotlight-image"
          />
          <img
            src={mobileImg}
            alt={`${t("projects.items.schedulerpro.title")} mobile`}
            loading="lazy"
            decoding="async"
            className="scheduler-spotlight-image scheduler-spotlight-image-mobile"
          />
        </div>
      </div>
    </section>
  );
}
