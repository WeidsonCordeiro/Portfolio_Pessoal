import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiTypescript,
  SiVite,
  SiMongodb,
  SiFirebase,
  SiVitest,
  SiRedux,
} from "react-icons/si";

export const skillGroups = [
  {
    id: "frontend",
    skills: [
      { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
      { name: "JavaScript", icon: FaJsSquare, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "Vite", icon: SiVite, color: "#646CFF" },
    ],
  },
  {
    id: "backend",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "#339933" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "Redux", icon: SiRedux, color: "#764ABC" },
    ],
  },
  {
    id: "quality",
    skills: [
      { name: "Vitest", icon: SiVitest, color: "#FCC72B" },
      { name: "REST APIs", icon: FaNodeJs, color: "#6b21a8" },
    ],
  },
];
