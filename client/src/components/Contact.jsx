import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { HiMiniDocumentArrowDown } from "react-icons/hi2";
import { requestConfig } from "../utils/config";
import CV_En from "../assets/doc/CV_EN_Weidson_Cordeiro.pdf";
import CV_Pt from "../assets/doc/CV_BR_Weidson_Cordeiro.pdf";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SERVER_ERROR_CODES = {
  VALIDATION_REQUIRED: "errors.required",
  INVALID_EMAIL: "errors.invalidEmail",
  SEND_FAILED: "errors.sendFailed",
};

const resolveErrorKey = (errors) => {
  if (!errors) return "contact.errorGeneric";
  const first = Array.isArray(errors) ? errors[0] : errors;
  if (typeof first === "string" && SERVER_ERROR_CODES[first]) {
    return SERVER_ERROR_CODES[first];
  }
  if (typeof first === "string") {
    return "errors.validationFallback";
  }
  return "errors.validationFallback";
};

const Contact = () => {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorKey, setErrorKey] = useState(null);
  const [success, setSuccess] = useState(false);
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
    setErrorKey(null);
    setSuccess(false);

    const formData = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    if (!formData.name || !formData.email || !formData.message) {
      setErrorKey("errors.required");
      setIsLoading(false);
      return;
    }
    if (!EMAIL_REGEX.test(formData.email)) {
      setErrorKey("errors.invalidEmail");
      setIsLoading(false);
      return;
    }

    const config = requestConfig("POST", formData, null);
    try {
      const res = await fetch(`/api/sendEmailContacto`, config);
      const result = await res.json();

      if (!res.ok || result.errors) {
        setErrorKey(resolveErrorKey(result.errors));
        return;
      }

      setName("");
      setEmail("");
      setMessage("");
      setSuccess(true);
    } catch (err) {
      console.error("Contact form error:", err);
      setErrorKey("contact.errorGeneric");
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
            {errorKey && (
              <div className="errormsg mt-1 mb-2">
                <p>{t(errorKey)}</p>
              </div>
            )}
            {success && (
              <div className="successmsg mt-1 mb-2">
                <p>{t("contact.success")}</p>
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
