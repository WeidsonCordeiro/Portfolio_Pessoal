import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { HiMiniDocumentArrowDown } from "react-icons/hi2";
import { requestConfig } from "../utils/config";
import CV_En from "../assets/doc/CV_EN_Weidson_Cordeiro.pdf";
import CV_Pt from "../assets/doc/CV_BR_Weidson_Cordeiro.pdf";

const formatErrors = (errors, t) => {
  if (!errors) return t("contact.errorGeneric");
  if (Array.isArray(errors)) return errors.join(" ");
  if (typeof errors === "string") return errors;
  return t("errors.validationFallback");
};

const Contact = () => {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cv = useMemo(
  () =>
      i18n.language === "pt-PT"
        ? {
            href: CV_Pt,
            fileName: "CV-PT-Weidson-Cordeiro.pdf",
            aria: t("contact.cvAriaPt"),
          }
        : {
            href: CV_En,
            fileName: "CV-EN-Weidson-Cordeiro.pdf",
            aria: t("contact.cvAriaEn"),
          },
    [i18n.language, t],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const formData = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    const config = requestConfig("POST", formData, null);
    try {
      const res = await fetch(`/api/sendEmailContacto`, config);
      const result = await res.json();

      if (!res.ok || result.errors) {
        setError(formatErrors(result.errors, t));
        return;
      }

      setName("");
      setEmail("");
      setMessage("");
      setSuccess(t("contact.success"));
    } catch (err) {
      console.error("Contact form error:", err);
      setError(t("contact.errorGeneric"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!success) return undefined;
    const timer = setTimeout(() => setSuccess(null), 4000);
    return () => clearTimeout(timer);
  }, [success]);

  return (
    <section
      id="contact"
      className="section-block d-flex align-items-center justify-content-center container-fluid px-3 py-4 pb-5"
    >
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <h2 className="display-5 fw-bold mb-5 text-center">{t("contact.title")}</h2>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="d-flex flex-column gap-4"
          aria-busy={isLoading}
        >
          <div className="mb-3 input-fields-custom">
            <input
              type="text"
              name="name"
              id="name"
              className={`form-control p-3 ${name ? "filled" : ""}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              autoComplete="name"
              required
            />
            <label htmlFor="name" className="form-label">
              {t("contact.name")}
            </label>
          </div>

          <div className="mb-3 input-fields-custom">
            <input
              type="email"
              name="_replyto"
              id="email"
              className={`form-control p-3 ${email ? "filled" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
              required
            />
            <label htmlFor="email" className="form-label">
              {t("contact.email")}
            </label>
          </div>

          <div className="mb-3 input-fields-custom">
            <textarea
              name="message"
              id="message"
              rows={5}
              className={`form-control p-3 ${message ? "filled" : ""}`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
              required
            />
            <label htmlFor="message" className="form-label">
              {t("contact.message")}
            </label>
          </div>

          <div aria-live="polite" aria-atomic="true">
            {error && (
              <div className="errormsg mt-1 mb-2">
                <p>{error}</p>
              </div>
            )}
            {success && (
              <div className="successmsg mt-1 mb-2">
                <p>{success}</p>
              </div>
            )}
          </div>

          <motion.button
            type="submit"
            className="btn fw-bold box-shadow-custom p-3 btn-contact-custom transition-custom"
            disabled={isLoading}
          >
            {isLoading ? t("contact.submitting") : t("contact.submit")}
          </motion.button>
        </form>

        <div className="d-flex justify-content-center gap-4 mt-5">
          <a
            href="https://github.com/WeidsonCordeiro"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("contact.githubAria")}
          >
            <FaGithub className="box-shadow-custom text-white" size={32} />
          </a>
          <a
            href="https://www.linkedin.com/in/weidson-cordeiro-45390244/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("contact.linkedinAria")}
          >
            <FaLinkedin className="box-shadow-custom text-white" size={32} />
          </a>
          <a href="mailto:weidson.ac@gmail.com" aria-label={t("contact.emailAria")}>
            <FaEnvelope className="box-shadow-custom text-white" size={32} />
          </a>
          <a
            href={cv.href}
            download={cv.fileName}
            aria-label={cv.aria}
          >
            <HiMiniDocumentArrowDown
              className="box-shadow-custom text-white"
              size={32}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
