// src/data/projects.js

import Site_AgencyTravel from "../assets/img/Site_AgencyTravel.png";
import Site_RocharteInvestimentos from "../assets/img/Site_Rocharte_investimentos.png";
import Site_ListaFilmes from "../assets/img/Site_ListaFilmes.png";
import Projeto_MiniBlog from "../assets/img/Projeto_MiniBlog.png";
import Projeto_ReactGram from "../assets/img/Projeto_ReactGram.png";
import Projeto_SocialMedia from "../assets/img/Projeto_SocialMedia.png";

export const projects = [
  {
    id: 1,
    title: "Agency Travel Fly",
    image: Site_AgencyTravel,
    shortDescription:
      "Website institucional para agência de viagens com foco em captação de clientes.",
    description:
      "Travel Agency Website é uma aplicação institucional desenvolvida para gestão de contatos e consultoria de passagens aéreas. O sistema é voltado para captação de clientes e solicitação de orçamentos personalizados, oferecendo uma experiência simples e eficiente de comunicação com a agência.",
    github: "https://github.com/WeidsonCordeiro/Site_Oficial_Agency_Travel.git",
    demo: "https://agencytravelfly.netlify.app/",
    technologies: ["HTML", "CSS", "JavaScript"],
    features: ["Landing page", "Design responsivo", "SEO básico"],
  },
  {
    id: 2,
    title: "Rocharte Investimentos Imobiliários",
    image: Site_RocharteInvestimentos,
    shortDescription:
      "Website institucional para imobiliária com geração de leads e integração de e-mail.",
    description:
      "Rocharte Investimentos Imobiliários é uma aplicação full-stack voltada para captação de clientes e gestão de contatos. Integra a API Mailjet para envio de mensagens e newsletters, proporcionando uma experiência eficiente na geração de leads.",
    github:
      "https://github.com/WeidsonCordeiro/Site_Oficial_Rochart_Investimentos.git",
    demo: "https://rochartinvestimentos.vercel.app/",
    technologies: ["HTML", "Bootstrap", "JavaScript", "Node.js"],
    features: [
      "Integração com API de e-mail (Mailjet)",
      "Geração e gestão de leads",
      "Envio automático de mensagens",
      "Formulário de contato avançado",
      "Design responsivo",
    ],
  },
  {
    id: 3,
    title: "Lista de Filmes",
    image: Site_ListaFilmes,
    shortDescription:
      "Aplicação web para busca e exibição de filmes utilizando API externa.",
    description:
      "MovieList é uma aplicação que consome a API do TMDb para exibir, buscar e visualizar detalhes de filmes.",
    github: "https://github.com/WeidsonCordeiro/Lista_de_Filmes.git",
    demo: "https://movieslib-delta.vercel.app/",
    technologies: ["React", "CSS", "TMDb"],
    features: [
      "Integração com API externa (TMDb)",
      "Busca dinâmica de filmes",
      "Listagem atualizada em tempo real",
      "Página de detalhes dos filmes",
      "Navegação SPA com React",
    ],
  },
  {
    id: 4,
    title: "Mini Blog",
    image: Projeto_MiniBlog,
    shortDescription:
      "Aplicação de blog com autenticação e CRUD de posts usando Firebase.",
    description:
      "MiniBlog é uma aplicação full-stack de blog desenvolvida com React e Firebase.",
    github: "https://github.com/WeidsonCordeiro/Projeto_MiniBlog",
    demo: "https://miniblog-lake-eight.vercel.app/",
    technologies: ["React", "CSS", "Firebase"],
    features: [
      "Autenticação com Firebase (login e registro de usuários)",
      "CRUD completo de posts com upload de imagens",
      "Persistência de dados com Firebase Firestore",
      "Dashboard do usuário para gerenciamento de posts",
      "Proteção de rotas para usuários autenticados",
      "Gerenciamento de estado com Context API",
    ],
  },
  {
    id: 5,
    title: "Projeto ReactGram",
    image: Projeto_ReactGram,
    shortDescription:
      "Rede social inspirada no Instagram com upload de imagens e interação entre usuários.",
    description: "ReactGram é uma aplicação full-stack inspirada no Instagram.",
    github: "https://github.com/WeidsonCordeiro/Projeto_ReactGram.git",
    demo: "https://reactgram-blond.vercel.app",
    technologies: ["React", "CSS", "MongoDB", "Node.js", "Cloudinary"],

    features: [
      "Autenticação com JWT (login, registro e logout automático)",
      "Proteção de rotas no frontend e backend",
      "CRUD completo de posts com upload de imagens",
      "Sistema de likes e comentários",
      "Feed dinâmico com atualização via Redux",
      "Dashboard do usuário com gerenciamento de perfil",
      "Persistência de dados com MongoDB",
      "Gerenciamento de estado global com Redux Toolkit",
      "Mensagens de feedback e controle de loading",
    ],
  },
  {
    id: 6,
    title: "Projeto Social Media",
    image: Projeto_SocialMedia,
    shortDescription:
      "Plataforma de rede social com atualização em tempo real via Socket.io.",
    description:
      "Social Media é uma aplicação full-stack inspirada em redes sociais.",
    github: "https://github.com/WeidsonCordeiro/Projeto_Social_Media.git",
    demo: "https://socialmedia-eta-flax.vercel.app/",
    technologies: [
      "React",
      "CSS",
      "MongoDB",
      "Node.js",
      "Cloudinary",
      "Socket.io",
    ],

    features: [
      "Autenticação com JWT (login, registro e logout automático)",
      "Proteção de rotas (frontend e backend)",
      "CRUD completo de posts",
      "Sistema de likes e comentários",
      "Gerenciamento avançado de comentários (edição e exclusão com permissões)",
      "Feed dinâmico atualizado em tempo real",
      "Upload de imagens (perfil, capa e posts)",
      "Dashboard do usuário com edição de perfil",
      "Listagem de amigos online (Socket.io)",
      "Gerenciamento de estado global (Context API)",
      "Mensagens de feedback e controle de loading",
      "Persistência de dados com MongoDB",
    ],
  },
];

// {
//   id: 1,

//   title: "ReactGram",

//   role: "Full Stack Developer",

//   period: "2024",

//   status: "Completed",

//   imageUrl: "...",

//   technologies: [...],

//   features: [...],

//   description: "...",

//   githubUrl: "...",

//   deployUrl: "..."
// }
