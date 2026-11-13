import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useActiveSection } from "../hooks/useActiveSection";

const NAV_ITEMS = [
  { id: "home", href: "#home", labelKey: "nav.home" },
  { id: "about", href: "#about", labelKey: "nav.about" },
  { id: "experience", href: "#experience", labelKey: "nav.experience" },
  { id: "skills", href: "#skills", labelKey: "nav.skills" },
  { id: "projects", href: "#projects", labelKey: "nav.projects" },
  { id: "contact", href: "#contact", labelKey: "nav.contact" },
];

const Header = () => {
  const { t, i18n } = useTranslation();
  const activeId = useActiveSection();
  const currentLang = i18n.language === "pt-PT" ? "pt-PT" : "en";

  const setLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("portfolio-lang", lang);
  };

  return (
    <>
      <a href="#home" className="skip-link">
        {t("nav.skip")}
      </a>
      <motion.nav
        className="navbar navbar-expand-md fixed-top navbar-custom"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        aria-label={t("nav.main")}
      >
        <div className="container-fluid navbar-inner">
          <a
            href="#home"
            className="navbar-brand fw-bold text-white navbar-custom-logo"
          >
            {t("nav.brand")}
          </a>

          <div className="d-flex align-items-center gap-2">
            <div
              className="lang-switch"
              role="group"
              aria-label={t("nav.langSwitch")}
            >
              <button
                type="button"
                className={`lang-switch-btn ${currentLang === "en" ? "lang-switch-btn-active" : ""}`}
                aria-pressed={currentLang === "en"}
                onClick={() => setLanguage("en")}
              >
                EN
              </button>
              <span className="lang-switch-sep" aria-hidden="true">
                |
              </span>
              <button
                type="button"
                className={`lang-switch-btn ${currentLang === "pt-PT" ? "lang-switch-btn-active" : ""}`}
                aria-pressed={currentLang === "pt-PT"}
                onClick={() => setLanguage("pt-PT")}
              >
                PT
              </button>
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label={t("nav.menuOpen")}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto navbar-nav-compact">
              {NAV_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li className="nav-item" key={item.id}>
                    <a
                      href={item.href}
                      className={`nav-link nav-link-compact fw-semibold text-white ${isActive ? "nav-link-active" : ""}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {t(item.labelKey)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Header;
