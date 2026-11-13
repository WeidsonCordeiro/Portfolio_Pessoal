export function localizeProject(project, t) {
  const key = `projects.items.${project.slug}`;
  const features = t(`${key}.features`, { returnObjects: true });

  return {
    ...project,
    title: t(`${key}.title`),
    shortDescription: t(`${key}.shortDescription`),
    description: t(`${key}.description`),
    features: Array.isArray(features) ? features : [],
  };
}
