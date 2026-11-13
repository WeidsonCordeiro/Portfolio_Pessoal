import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { skillGroups } from "../data/skills";

const SkillCard = ({ skill }) => {
  const Icon = skill.icon;
  return (
    <div className="d-flex flex-column align-items-center p-3 skill-card box-shadow-custom">
      <Icon size={48} color={skill.color} aria-hidden="true" />
      <span className="mt-3 fw-semibold">{skill.name}</span>
    </div>
  );
};

const Skills = () => {
  const { t } = useTranslation();

  return (
    <section
      id="skills"
      className="section-block d-flex align-items-center justify-content-center container-fluid px-3 py-4"
    >
      <div className="w-100">
        <h2 className="display-5 fw-bold mb-5 text-center">{t("skills.title")}</h2>

        {skillGroups.map((group) => (
          <div key={group.id} className="mb-5">
            <h3 className="h4 fw-bold mb-4 text-center skills-group-title">
              {t(`skills.groups.${group.id}`)}
            </h3>
            <motion.div
              className="skills-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06 } },
              }}
            >
              {group.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <SkillCard skill={skill} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
