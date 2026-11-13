import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      className="w-100 p-3 mt-5"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        className="container-fluid text-center"
        style={{
          fontSize: "0.9rem",
          paddingTop: "1rem",
          paddingBottom: "2rem",
        }}
      >
        <p className="mb-3" style={{ fontSize: "0.85rem" }}>
          {t("footer.thanks")}
        </p>

        <p style={{ color: "#6b21a8" }}>{t("footer.rights")}</p>
      </div>
    </footer>
  );
};

export default Footer;
