export type Trabajo = {
  empresa: string;
  cargo: string;
  periodo: string;
  modalidad?: string;
  logros: string[];
  stack: string[];
  trofeo?: string;
};

export type Proyecto = {
  nombre: string;
  descripcion: string;
  stack: string[];
  estado: string;
  enlace?: string;
  imagen?: string;
};

export type GrupoHabilidades = {
  nombre: string;
  items: string[];
};

export const perfil = {
  nombre: "Jairo Perez",
  titulo: "Desarrollador Web Junior",
  stackPrincipal: ["React", "Next.js", "TypeScript", "JavaScript", "C#"],
  ubicacion: "San Juan de Lurigancho, Lima",
  resumen:
    "Construyo aplicaciones web con React y Next.js, y sistemas empresariales con C# y ASP.NET Core. Cada trabajo es un nivel superado: aquí está el recorrido.",
  foto: "/img/jairo-perez.jpg",
  cv: "/CV_Jairo_Perez.pdf",
  correo: "jairoo.andrea1204@gmail.com",
  whatsapp: "51904354430",
  github: "https://github.com/jair000",
  linkedin: "https://www.linkedin.com/in/jairope",
};

export const trabajos: Trabajo[] = [
  {
    empresa: "CuscoCode / CodePerú",
    cargo: "Practicante de Desarrollo de Software",
    periodo: "Jul. 2026 – Set. 2026",
    logros: [
      "Participé en la web corporativa de Grupo Copacabana, publicada en producción, con contenido gestionado desde Strapi y chatbot integrado.",
      "Optimicé el sitio según Lighthouse: rendimiento de 66 a 94, accesibilidad de 87 a 96 y SEO de 91 a 100.",
      "Diseñé y desarrollé componentes y módulos para una plataforma web de retail con React, Next.js y Supabase.",
    ],
    stack: ["Astro", "JavaScript", "Strapi", "Tailwind CSS", "SASS", "React", "Next.js", "Supabase", "GitLab"],
    trofeo: "SEO 100",
  },
  {
    empresa: "Grupo Sima",
    cargo: "Practicante de Desarrollo de Software",
    periodo: "Oct. 2026 – Actualidad",
    logros: [
      "Completé en aproximadamente dos semanas las funcionalidades pendientes del ERP de Cima Inmobiliaria: ventas, cuotas, clientes, inmuebles, propietarios y cuentas bancarias.",
      "Corregí un error en el sistema de Cima Parking que impedía el envío de comprobantes electrónicos a SUNAT.",
      "Amplié la facturación electrónica para emitir boletas además de facturas, con generación de PDF, XML y CDR.",
    ],
    stack: ["C#", "ASP.NET Core MVC", "Entity Framework", "React (Vite)", "SUNAT", "IIS"],
    trofeo: "ERP en 2 semanas",
  },
];

export const habilidades: GrupoHabilidades[] = [
  { nombre: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Astro", "Tailwind CSS", "Bootstrap", "SASS"] },
  { nombre: "Backend", items: ["C#", "ASP.NET Core MVC", "Entity Framework", "Node.js", "Express", "APIs REST", "Strapi"] },
  { nombre: "Datos", items: ["SQL", "PostgreSQL", "Supabase", "MySQL", "MongoDB"] },
  { nombre: "Herramientas", items: ["Git", "GitHub", "Figma", "Lighthouse"] },
];

export const proyectos: Proyecto[] = [
  {
    nombre: "Web corporativa · Grupo Copacabana",
    descripcion: "Sitio en producción con CMS headless, chatbot y optimización Lighthouse de 66 a 94 en rendimiento.",
    stack: ["Astro", "Strapi", "Tailwind CSS"],
    estado: "En producción",
    enlace: "https://grupocopacabana.com.pe/",
    imagen: "/img/web-copacabana.png",
  },
  {
    nombre: "E-commerce para pequeño negocio",
    descripcion: "Tienda en línea con catálogo de productos y base de datos en Supabase, desarrollada de principio a fin.",
    stack: ["React", "Next.js", "Supabase"],
    estado: "Terminado · pendiente de despliegue",
  },
  {
    nombre: "Tienda de Halloween",
    descripcion: "Maqueta visual de una tienda temática hecha con HTML, CSS y JavaScript puro.",
    stack: ["HTML", "CSS", "JavaScript"],
    estado: "Demo",
    enlace: "https://jair000.github.io/halloween_proyecto/",
    imagen: "/img/web-halloween.png",
  },
];

export const educacion = [
  { lugar: "Instituto Certus", programa: "Desarrollo de Software", estado: "En curso" },
  { lugar: "Soy Henry", programa: "Bootcamp Full Stack", estado: "" },
  { lugar: "IESTP Manuel Seoane Corrales", programa: "Diseño Gráfico", estado: "" },
];
