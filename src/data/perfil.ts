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
      "Desarrollé con un compañero una app de escritorio en C# para la autoevaluación semanal de empleados, con PDF (WebView2), dashboards y registro histórico. La hicimos en dos semanas sin experiencia previa en C#, y hoy la usan 4 empresas en Cusco.",
      "Coordiné a 2 practicantes en el desarrollo de una web WordPress para un restaurante.",
      "Participé en la web corporativa de Grupo Copacabana, publicada en producción, con contenido gestionado desde Strapi y chatbot integrado.",
      "Optimicé el sitio según Lighthouse: rendimiento de 66 a 94, accesibilidad de 87 a 96 y SEO de 91 a 100.",
      "Estuve a cargo de la arquitectura y el frontend de la web de un centro comercial de Cusco, con el stack que elegí (Next.js y Supabase). El proyecto no se concluyó por problemas internos de la empresa.",
    ],
    stack: ["C#", "WebView2", "Astro", "JavaScript", "Strapi", "Tailwind CSS", "SASS", "React", "Next.js", "Supabase", "WordPress", "GitLab"],
    trofeo: "SEO 100",
  },
  {
    empresa: "Grupo Sima",
    cargo: "Practicante de Desarrollo de Software",
    periodo: "Oct. 2026 – Actualidad",
    logros: [
      "Terminé el ERP de Sima Inmobiliaria, que otro programador había dejado a medias: ventas, cuotas, clientes, inmuebles, propietarios y cuentas bancarias. Corregí facturas, boletas y medios de pago, y creé el dashboard.",
      "Corregí la facturación electrónica de Sima Parking con SUNAT (ASMX y certificados digitales): eliminé valores fijos en el código y falsos aceptados, y agregué el envío de boletas con PDF, XML y CDR.",
      "En curso: implementar la lógica del ERP y la facturación electrónica en Plaza Sima.",
    ],
    stack: ["C#", "ASP.NET Core MVC", "ASMX", "Entity Framework", "React (Vite)", "SUNAT", "IIS"],
    trofeo: "Boletas SUNAT en producción",
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
    nombre: "Flow 360 · CRM de lealtad",
    descripcion: "Programa de lealtad para una barbería: cada cliente tiene un QR personal de un solo uso, 5 cortes desbloquean uno gratis, con panel de cliente y de administración.",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    estado: "Proyecto real · demo con datos de ejemplo",
    enlace: "https://flow360-crm.vercel.app",
    imagen: "/img/web-flow360.png",
  },
  {
    nombre: "Importaciones Gian · Tienda en línea",
    descripcion: "Tienda de electrodomésticos con catálogo, filtros y búsqueda, carrito persistente y pedido por WhatsApp.",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    estado: "Proyecto real · demo con datos de ejemplo",
    enlace: "https://e-commerce-gian-wsl.vercel.app",
    imagen: "/img/web-importaciones-gian.png",
  },
  {
    nombre: "Shipibo Yarinacocha · Sitio cultural",
    descripcion: "Sitio multipágina sobre el pueblo Shipibo-Konibo: artesanías, turismo, talleres y galería, con contenido en Sanity CMS y elementos 3D.",
    stack: ["Next.js", "Sanity CMS", "GSAP", "Three.js"],
    estado: "Proyecto real · demo con datos de ejemplo",
    enlace: "https://shipibo-agents.vercel.app",
    imagen: "/img/web-shipibo.png",
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
