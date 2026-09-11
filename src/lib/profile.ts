// Single source of truth for Manuel's career data.
// Used both to render the site (bento grid) and to build the AI chat's
// system prompt, so the two can never drift out of sync.

export const person = {
  name: "Manuel Jiménez",
  role: "AI Engineer & Senior Backend Developer",
  headline:
    "AI Engineer · Senior Backend Developer · Agentic Workflows (LangGraph, CrewAI) · Python, FastAPI, NestJS, TypeScript · Meta API & CRM Automation · Scalable LLM Systems & RAG",
  location: "Venezuela",
  email: "manuel28042005@gmail.com",
  linkedin: "https://www.linkedin.com/in/manueljimenezlopez/",
  summary:
    "Desarrollador Backend certificado e Ingeniero en Informática, con experiencia en la creación de APIs REST y la integración de Inteligencia Artificial. He impulsado soluciones tecnológicas que integran IA y buenas prácticas de ingeniería backend, generando mejoras medibles en productividad, escalabilidad y experiencia de usuario.",
  tagline:
    "Construyo sistemas de IA agéntica y backends de alta concurrencia que se sostienen en producción.",
};

export type SkillCategory = "ai" | "backend" | "data" | "cloud";

export const skillCategoryMeta: Record<
  SkillCategory,
  { label: string; color: string; colorSoft: string }
> = {
  // Categorical slots (dark-mode, validated for CVD-safe adjacency; always
  // paired with a direct text label, never color alone).
  ai: { label: "IA & Agentes", color: "#3987e5", colorSoft: "rgba(57,135,229,0.14)" },
  backend: { label: "Backend", color: "#d95926", colorSoft: "rgba(217,89,38,0.14)" },
  data: { label: "Datos & Infra", color: "#199e70", colorSoft: "rgba(25,158,112,0.14)" },
  cloud: { label: "Cloud & DevOps", color: "#c98500", colorSoft: "rgba(201,133,0,0.14)" },
};

export interface Skill {
  name: string;
  category: SkillCategory;
}

export const skills: Skill[] = [
  // AI & agentes
  { name: "LangGraph", category: "ai" },
  { name: "CrewAI", category: "ai" },
  { name: "LangChain", category: "ai" },
  { name: "Smolagents", category: "ai" },
  { name: "Model Context Protocol", category: "ai" },
  { name: "RAG", category: "ai" },
  { name: "Anthropic Claude API", category: "ai" },
  { name: "OpenAI API", category: "ai" },
  { name: "Google Gemini API", category: "ai" },
  { name: "LLMs", category: "ai" },
  { name: "Machine Learning", category: "ai" },
  { name: "Qdrant Vector DB", category: "ai" },
  { name: "Helicone (LLM Observability)", category: "ai" },
  // Backend
  { name: "Node.js", category: "backend" },
  { name: "NestJS", category: "backend" },
  { name: "TypeScript", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "Fastify", category: "backend" },
  { name: "Express.js", category: "backend" },
  { name: "GraphQL", category: "backend" },
  { name: "Java", category: "backend" },
  { name: "Spring Boot", category: "backend" },
  { name: "PHP / Laravel", category: "backend" },
  { name: "C++ / C#", category: "backend" },
  { name: "Clojure", category: "backend" },
  // Datos & infra
  { name: "PostgreSQL", category: "data" },
  { name: "MySQL / MariaDB", category: "data" },
  { name: "MongoDB", category: "data" },
  { name: "Redis", category: "data" },
  { name: "RabbitMQ", category: "data" },
  { name: "ZeroMQ", category: "data" },
  { name: "WebSockets", category: "data" },
  // Cloud & DevOps
  { name: "Docker", category: "cloud" },
  { name: "AWS", category: "cloud" },
  { name: "Google Cloud", category: "cloud" },
  { name: "Render", category: "cloud" },
  { name: "Vercel", category: "cloud" },
  { name: "CI/CD", category: "cloud" },
  { name: "GitHub / GitLab / Gitflow", category: "cloud" },
];

export interface Metric {
  value: string;
  label: string;
  context: string;
}

export const highlightMetrics: Metric[] = [
  { value: "−32%", label: "latencia de respuesta", context: "IA conversacional multiagente en SellEasy" },
  { value: "+22%", label: "ventas del equipo comercial", context: "mensajería omnicanal en Netcare IT" },
  { value: "−21%", label: "carga administrativa", context: "automatización de cotización/facturación en Netcare IT" },
  { value: "−23%", label: "tiempo de gestión de marketing", context: "agentes de ads ops en SellEasy" },
  { value: "−17%", label: "tiempo de transmisión de alertas", context: "motor de emergencias con IA en Seagloo" },
  { value: "+20%", label: "precisión en clasificación de incidentes", context: "pipelines LLM en Seagloo" },
];

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  stack: string[];
}

export const experience: Experience[] = [
  {
    company: "Netcare IT",
    role: "Senior Backend Engineer · AI Integrations & API Specialist",
    period: "Diciembre 2025 — Presente",
    location: "Cabo San Lucas, BCS",
    bullets: [
      "Diseñé e implementé una integración asíncrona de la API de Meta WhatsApp Business Cloud directamente en el CRM empresarial (EspoCRM), automatizando cotización y prefacturación, reduciendo la carga administrativa en 21%.",
      "Desarrollé endpoints RESTful de alta concurrencia y canales de WebSockets para mensajería omnicanal centralizada y bidireccional, impulsando el volumen de ventas del equipo comercial en 22%.",
      "Implementé CI/CD de extremo a extremo y orquestación de microservicios en Render, eliminando la fricción de despliegues manuales con cero tiempo de inactividad.",
      "Integré caché distribuido y workers de tareas asíncronas con Redis y Celery para procesar colas de mensajería de alto volumen sin degradación del sistema.",
    ],
    stack: [
      "Python", "FastAPI", "Node.js", "NestJS", "TypeScript", "Meta WhatsApp Cloud API",
      "Meta Business API", "EspoCRM", "WebSockets", "Redis", "Celery", "PostgreSQL",
      "Render", "CI/CD", "Docker",
    ],
  },
  {
    company: "SellEasy",
    role: "AI Engineer · LLM Systems & Multi-Agent Specialist",
    period: "Junio 2024 — Noviembre 2025 (1 año 6 meses)",
    location: "Medellín, Colombia",
    bullets: [
      "Diseñé flujos de IA conversacional multiagente (LangGraph, CrewAI, RAG) para ventas de e-commerce y atención al cliente de ciclo completo, resolviendo consultas de forma autónoma y reduciendo la latencia de respuesta en 32%.",
      "Construí agentes autónomos de operaciones publicitarias integrados en Meta Ads, TikTok Ads y Google Ads, automatizando orquestación de campañas y seguimiento de presupuestos, reduciendo el tiempo de gestión de marketing en 23%.",
      "Lideré los protocolos de integración técnica y cumplimiento para lograr la acreditación oficial como Proveedor Tecnológico Certificado por Meta, centralizando la incorporación de comerciantes multiinquilino y los canales de WhatsApp.",
      "Diseñé sistemas de búsqueda semántica y recuperación con la base de datos vectorial Qdrant y embeddings, optimizando uso de tokens, caching de prompts y costo por inferencia con observabilidad de Helicone.",
    ],
    stack: [
      "LangGraph", "LangChain", "CrewAI", "Smolagents", "Model Context Protocol", "RAG",
      "Qdrant", "Helicone", "Anthropic Claude API", "OpenAI API", "Google Gemini API",
      "Python", "FastAPI", "Meta Tech Provider", "Meta Ads API", "TikTok Ads API",
      "Google Ads API", "PostgreSQL", "Redis", "Docker",
    ],
  },
  {
    company: "Seagloo",
    role: "Desarrollador Backend",
    period: "Julio 2023 — Marzo 2024 (9 meses)",
    location: "Buenos Aires, Argentina",
    bullets: [
      "Desarrollé un motor de detección de emergencias con IA y seguimiento geoespacial en tiempo real conectado a redes de despacho del 911, reduciendo el tiempo de transmisión de alertas en 17%.",
      "Integré y evalué pipelines de LLM basados en ChatGPT-4o con capas de validación de prompts, aumentando la precisión en clasificación de incidentes críticos en 20%.",
      "Contenericé aplicaciones backend multiservicio con Docker y Docker Compose, reduciendo la desviación de paridad entre entornos en 15%.",
      "Diseñé flujos de datos de microservicios y mensajería basada en eventos con Node.js, Express y PostgreSQL, garantizando cero pérdida de paquetes durante ráfagas de notificaciones críticas.",
    ],
    stack: [
      "ChatGPT-4o", "OpenAI API", "Python", "Node.js", "Express.js", "Docker",
      "PostgreSQL", "Geolocation APIs", "Real-Time Data Streaming",
      "Event-Driven Architecture", "Microservices", "ZeroMQ",
    ],
  },
];

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
}

export const education: EducationItem[] = [
  {
    institution: "Universidad Privada Dr. Rafael Belloso Chacín",
    degree: "Ingeniería Informática",
    period: "En curso · esperado enero de 2025",
  },
  {
    institution: "Henry (SoyHenry Academy)",
    degree: "Desarrollo Fullstack — formación intensiva",
    period: "Junio 2024 — Septiembre 2024",
  },
];

export const certifications = [
  "TypeScript — Verified by Talently",
  "Node.js — Verified by Talently",
  "React JS — Verified by Talently",
];

export const coreSkills = [
  "Backend Development",
  "Artificial Intelligence (AI)",
  "State Management",
];
