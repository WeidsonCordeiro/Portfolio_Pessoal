import SchedulerDesktop from "../assets/img/schedulerpro/desktop-week.png";
import Site_AgencyTravel from "../assets/img/Site_AgencyTravel.png";
import Site_RocharteInvestimentos from "../assets/img/Site_rocharte_investimentos.png";
import Site_ListaFilmes from "../assets/img/Site_ListaFilmes.png";
import Projeto_MiniBlog from "../assets/img/Projeto_MiniBlog.png";
import Projeto_ReactGram from "../assets/img/Projeto_ReactGram.png";
import Projeto_SocialMedia from "../assets/img/Projeto_SocialMedia.png";

export const projects = [
  {
    id: 0,
    slug: "schedulerpro",
    featured: true,
    flagship: true,
    linksPending: true,
    image: SchedulerDesktop,
    github: "#",
    demo: "#",
    technologies: [
      "React 19",
      "TypeScript",
      "Vite",
      "Redux Toolkit",
      "Node.js",
      "Express 5",
      "MongoDB",
      "Redis",
      "JWT",
      "Vitest",
    ],
  },
  {
    id: 1,
    slug: "agency-travel",
    image: Site_AgencyTravel,
    github: "https://github.com/WeidsonCordeiro/Site_Oficial_Agency_Travel",
    demo: "https://agencytravelfly.netlify.app/",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 2,
    slug: "rocharte",
    image: Site_RocharteInvestimentos,
    github:
      "https://github.com/WeidsonCordeiro/Site_Oficial_Rochart_Investimentos",
    demo: "https://rochartinvestimentos.vercel.app/",
    technologies: ["HTML", "Bootstrap", "JavaScript", "Node.js"],
  },
  {
    id: 3,
    slug: "movie-list",
    image: Site_ListaFilmes,
    github: "https://github.com/WeidsonCordeiro/Lista_de_Filmes",
    demo: "https://movieslib-delta.vercel.app/",
    technologies: ["React", "CSS", "TMDb"],
  },
  {
    id: 4,
    slug: "mini-blog",
    flagship: true,
    image: Projeto_MiniBlog,
    github: "https://github.com/WeidsonCordeiro/Projeto_MiniBlog",
    demo: "https://miniblog-lake-eight.vercel.app/",
    technologies: ["React", "CSS", "Firebase"],
  },
  {
    id: 5,
    slug: "reactgram",
    flagship: true,
    image: Projeto_ReactGram,
    github: "https://github.com/WeidsonCordeiro/Projeto_ReactGram",
    demo: "https://reactgram-blond.vercel.app",
    technologies: ["React", "CSS", "MongoDB", "Node.js", "Cloudinary"],
  },
  {
    id: 6,
    slug: "social-media",
    flagship: true,
    image: Projeto_SocialMedia,
    github: "https://github.com/WeidsonCordeiro/Projeto_Social_Media",
    demo: "https://socialmedia-eta-flax.vercel.app/",
    technologies: [
      "React",
      "CSS",
      "MongoDB",
      "Node.js",
      "Cloudinary",
      "Socket.io",
    ],
  },
];
