import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SITE_URL = "https://portifolio-green-seven-45.vercel.app/";

const setMeta = (selector, attribute, name, content) => {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

export default function SiteHelmet() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "pt-PT" ? "pt-PT" : "en";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t("seo.title");

    setMeta('meta[name="description"]', "name", "description", t("seo.description"));
    setMeta('meta[property="og:title"]', "property", "og:title", t("seo.ogTitle"));
    setMeta(
      'meta[property="og:description"]',
      "property",
      "og:description",
      t("seo.description"),
    );
    setMeta('meta[property="og:locale"]', "property", "og:locale", lang === "pt-PT" ? "pt_PT" : "en_US");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", t("seo.ogTitle"));
    setMeta(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      t("seo.description"),
    );

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Weidson Cordeiro",
      url: SITE_URL,
      jobTitle: t("seo.jobTitle"),
      knowsAbout: t("seo.knowsAbout", { returnObjects: true }),
      sameAs: [
        "https://github.com/WeidsonCordeiro",
        "https://www.linkedin.com/in/weidson-cordeiro-45390244/",
      ],
      email: "mailto:weidson.ac@gmail.com",
    };

    let script = document.getElementById("portfolio-jsonld");
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "portfolio-jsonld";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }, [lang, t]);

  return null;
}
