// Bilingual UI content (ES/EN). This is the display layer only — the chat's
// factual grounding stays in src/lib/profile.ts (Spanish), since the model
// already mirrors whatever language the visitor types in, regardless of the
// site's UI language toggle.

export type Lang = "es" | "en";

export interface JobT {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  stack: string[];
}

export interface Translation {
  meta: { title: string; description: string };
  hero: {
    available: string;
    name: string;
    role: string;
    tagline: string;
    ctaChat: string;
    ctaLinkedin: string;
  };
  about: { label: string; summary: string; coreSkills: string[] };
  status: {
    label: string;
    items: { label: string; state: string }[];
  };
  stack: {
    label: string;
    categories: { ai: string; backend: string; data: string; cloud: string };
  };
  metrics: {
    label: string;
    items: { value: string; label: string; context: string }[];
  };
  experience: { label: string; jobs: JobT[] };
  education: {
    label: string;
    items: { institution: string; degree: string; period: string }[];
  };
  certifications: { label: string; items: string[] };
  contact: { label: string; blurb: string };
  footer: { builtWith: string };
  chat: {
    orbOpenAria: string;
    orbCloseAria: string;
    assistantName: string;
    assistantTagline: string;
    welcome: string;
    suggested: string[];
    placeholder: string;
    sendAria: string;
    errorGeneric: string;
    errorConnection: string;
    backAria: string;
  };
}

export const translations: Record<Lang, Translation> = {
  es: {
    meta: {
      title: "Manuel Jiménez — AI Engineer",
      description:
        "AI Engineer y Senior Backend Developer especializado en workflows agénticos (LangGraph, CrewAI), RAG y automatización con APIs de Meta. Pregúntale a su asistente de IA sobre su trayectoria.",
    },
    hero: {
      available: "disponible para nuevos retos",
      name: "Manuel Jiménez",
      role: "AI Engineer & Senior Backend Developer",
      tagline:
        "Construyo sistemas de IA agéntica y backends de alta concurrencia que se sostienen en producción.",
      ctaChat: "Habla con mi asistente de IA",
      ctaLinkedin: "LinkedIn",
    },
    about: {
      label: "Sobre mí",
      summary:
        "Desarrollador Backend certificado e Ingeniero en Informática, con experiencia en la creación de APIs REST y la integración de Inteligencia Artificial. He impulsado soluciones tecnológicas que integran IA y buenas prácticas de ingeniería backend, generando mejoras medibles en productividad, escalabilidad y experiencia de usuario.",
      coreSkills: ["Backend Development", "Artificial Intelligence (AI)", "State Management"],
    },
    status: {
      label: "Estado del sistema",
      items: [
        { label: "Meta Tech Provider", state: "Certificado" },
        { label: "WhatsApp Cloud API × EspoCRM", state: "En producción" },
        { label: "Multi-agente (LangGraph · CrewAI)", state: "Desplegado" },
        { label: "Observabilidad LLM (Helicone)", state: "Activo" },
      ],
    },
    stack: {
      label: "Stack tecnológico",
      categories: { ai: "IA & Agentes", backend: "Backend", data: "Datos & Infra", cloud: "Cloud & DevOps" },
    },
    metrics: {
      label: "Impacto medible",
      items: [
        { value: "−32%", label: "latencia de respuesta", context: "IA conversacional multiagente en SellEasy" },
        { value: "+22%", label: "ventas del equipo comercial", context: "mensajería omnicanal en Netcare IT" },
        { value: "−21%", label: "carga administrativa", context: "automatización de cotización/facturación en Netcare IT" },
        { value: "−23%", label: "tiempo de gestión de marketing", context: "agentes de ads ops en SellEasy" },
        { value: "−17%", label: "tiempo de transmisión de alertas", context: "motor de emergencias con IA en Seagloo" },
        { value: "+20%", label: "precisión en clasificación de incidentes", context: "pipelines LLM en Seagloo" },
      ],
    },
    experience: {
      label: "Experiencia",
      jobs: [
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
          stack: ["Python", "FastAPI", "Node.js", "NestJS", "TypeScript", "Meta WhatsApp Cloud API", "Meta Business API", "EspoCRM", "WebSockets", "Redis", "Celery", "PostgreSQL", "Render", "CI/CD", "Docker"],
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
          stack: ["LangGraph", "LangChain", "CrewAI", "Smolagents", "Model Context Protocol", "RAG", "Qdrant", "Helicone", "Anthropic Claude API", "OpenAI API", "Google Gemini API", "Python", "FastAPI", "Meta Tech Provider", "Meta Ads API", "TikTok Ads API", "Google Ads API", "PostgreSQL", "Redis", "Docker"],
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
          stack: ["ChatGPT-4o", "OpenAI API", "Python", "Node.js", "Express.js", "Docker", "PostgreSQL", "Geolocation APIs", "Real-Time Data Streaming", "Event-Driven Architecture", "Microservices", "ZeroMQ"],
        },
      ],
    },
    education: {
      label: "Educación",
      items: [
        { institution: "Universidad Privada Dr. Rafael Belloso Chacín", degree: "Ingeniería Informática", period: "En curso · esperado enero de 2025" },
        { institution: "Henry (SoyHenry Academy)", degree: "Desarrollo Fullstack — formación intensiva", period: "Junio 2024 — Septiembre 2024" },
      ],
    },
    certifications: {
      label: "Certificaciones",
      items: ["TypeScript — Verified by Talently", "Node.js — Verified by Talently", "React JS — Verified by Talently"],
    },
    contact: {
      label: "Hablemos",
      blurb: "Abierto a roles de AI Engineer y Backend Senior, o a conversar sobre sistemas agénticos y RAG en producción.",
    },
    footer: { builtWith: "Construido con Next.js + Gemini API" },
    chat: {
      orbOpenAria: "Abrir asistente de IA",
      orbCloseAria: "Cerrar chat",
      assistantName: "Asistente de Manuel",
      assistantTagline: "Aquí para atenderte y asesorarte sobre su trayectoria",
      welcome:
        "¡Hola! 👋 Soy el asistente de IA de Manuel. Estoy aquí para atenderte y contarte todo sobre su trayectoria, su stack técnico y sus proyectos.",
      suggested: [
        "¿En qué stack tiene más experiencia?",
        "Cuéntame sobre SellEasy y los agentes de IA",
        "¿Qué hizo en Netcare IT con WhatsApp?",
        "¿Tiene experiencia con RAG y bases vectoriales?",
      ],
      placeholder: "Pregúntame algo sobre su carrera...",
      sendAria: "Enviar mensaje",
      errorGeneric: "Algo salió mal. Intenta de nuevo en un momento.",
      errorConnection: "No pude conectar con el servidor. Revisa tu conexión e intenta de nuevo.",
      backAria: "Volver al portafolio",
    },
  },
  en: {
    meta: {
      title: "Manuel Jiménez — AI Engineer",
      description:
        "AI Engineer and Senior Backend Developer specializing in agentic workflows (LangGraph, CrewAI), RAG, and Meta API automation. Ask his AI assistant about his career.",
    },
    hero: {
      available: "open to new opportunities",
      name: "Manuel Jiménez",
      role: "AI Engineer & Senior Backend Developer",
      tagline: "I build agentic AI systems and high-concurrency backends that hold up in production.",
      ctaChat: "Talk to my AI assistant",
      ctaLinkedin: "LinkedIn",
    },
    about: {
      label: "About me",
      summary:
        "Certified Backend Developer and Computer Engineer with experience building REST APIs and integrating artificial intelligence. He has driven technology solutions that combine AI with solid backend engineering practices, delivering measurable gains in productivity, scalability, and user experience.",
      coreSkills: ["Backend Development", "Artificial Intelligence (AI)", "State Management"],
    },
    status: {
      label: "System status",
      items: [
        { label: "Meta Tech Provider", state: "Certified" },
        { label: "WhatsApp Cloud API × EspoCRM", state: "In production" },
        { label: "Multi-agent (LangGraph · CrewAI)", state: "Deployed" },
        { label: "LLM Observability (Helicone)", state: "Active" },
      ],
    },
    stack: {
      label: "Tech stack",
      categories: { ai: "AI & Agents", backend: "Backend", data: "Data & Infra", cloud: "Cloud & DevOps" },
    },
    metrics: {
      label: "Measurable impact",
      items: [
        { value: "−32%", label: "response latency", context: "multi-agent conversational AI at SellEasy" },
        { value: "+22%", label: "sales team volume", context: "omnichannel messaging at Netcare IT" },
        { value: "−21%", label: "administrative workload", context: "quoting/billing automation at Netcare IT" },
        { value: "−23%", label: "marketing management time", context: "ad-ops agents at SellEasy" },
        { value: "−17%", label: "alert transmission time", context: "AI emergency engine at Seagloo" },
        { value: "+20%", label: "incident classification accuracy", context: "LLM pipelines at Seagloo" },
      ],
    },
    experience: {
      label: "Experience",
      jobs: [
        {
          company: "Netcare IT",
          role: "Senior Backend Engineer · AI Integrations & API Specialist",
          period: "December 2025 — Present",
          location: "Cabo San Lucas, BCS",
          bullets: [
            "Designed and implemented an asynchronous integration of the Meta WhatsApp Business Cloud API directly into the company's CRM (EspoCRM), automating quoting and pre-billing workflows and cutting administrative workload by 21%.",
            "Built high-concurrency RESTful endpoints and WebSocket channels for centralized, two-way omnichannel messaging, driving a 22% increase in the sales team's volume.",
            "Implemented end-to-end CI/CD and microservice orchestration on Render, removing manual-deploy friction with zero downtime.",
            "Integrated distributed caching and asynchronous task workers with Redis and Celery to process high-volume messaging queues without system degradation.",
          ],
          stack: ["Python", "FastAPI", "Node.js", "NestJS", "TypeScript", "Meta WhatsApp Cloud API", "Meta Business API", "EspoCRM", "WebSockets", "Redis", "Celery", "PostgreSQL", "Render", "CI/CD", "Docker"],
        },
        {
          company: "SellEasy",
          role: "AI Engineer · LLM Systems & Multi-Agent Specialist",
          period: "June 2024 — November 2025 (1 yr 6 mo)",
          location: "Medellín, Colombia",
          bullets: [
            "Designed multi-agent conversational AI workflows (LangGraph, CrewAI, RAG) for full-cycle e-commerce sales and customer support, resolving inquiries autonomously and cutting response latency by 32%.",
            "Built autonomous ad-ops agents integrated with Meta Ads, TikTok Ads, and Google Ads, automating campaign orchestration and budget tracking to cut marketing management time by 23%.",
            "Led the technical integration and compliance protocols to achieve official accreditation as a Meta Certified Tech Provider, centralizing multi-tenant merchant onboarding and WhatsApp channels.",
            "Designed semantic search and retrieval systems using the Qdrant vector database and embeddings, optimizing token usage, prompt caching, and cost per inference with Helicone observability.",
          ],
          stack: ["LangGraph", "LangChain", "CrewAI", "Smolagents", "Model Context Protocol", "RAG", "Qdrant", "Helicone", "Anthropic Claude API", "OpenAI API", "Google Gemini API", "Python", "FastAPI", "Meta Tech Provider", "Meta Ads API", "TikTok Ads API", "Google Ads API", "PostgreSQL", "Redis", "Docker"],
        },
        {
          company: "Seagloo",
          role: "Backend Developer",
          period: "July 2023 — March 2024 (9 mo)",
          location: "Buenos Aires, Argentina",
          bullets: [
            "Developed an AI-driven emergency detection engine with real-time geospatial tracking connected to 911 dispatch networks, cutting alert transmission time by 17%.",
            "Integrated and evaluated ChatGPT-4o-based LLM pipelines with prompt-validation layers, increasing accuracy in critical incident classification by 20%.",
            "Containerized multi-service backend applications with Docker and Docker Compose, reducing environment-parity drift by 15%.",
            "Designed microservice data flows and event-driven messaging with Node.js, Express, and PostgreSQL, ensuring zero packet loss during bursts of critical notifications.",
          ],
          stack: ["ChatGPT-4o", "OpenAI API", "Python", "Node.js", "Express.js", "Docker", "PostgreSQL", "Geolocation APIs", "Real-Time Data Streaming", "Event-Driven Architecture", "Microservices", "ZeroMQ"],
        },
      ],
    },
    education: {
      label: "Education",
      items: [
        { institution: "Universidad Privada Dr. Rafael Belloso Chacín", degree: "Computer Engineering", period: "In progress · expected January 2025" },
        { institution: "Henry (SoyHenry Academy)", degree: "Fullstack Development — intensive program", period: "June 2024 — September 2024" },
      ],
    },
    certifications: {
      label: "Certifications",
      items: ["TypeScript — Verified by Talently", "Node.js — Verified by Talently", "React JS — Verified by Talently"],
    },
    contact: {
      label: "Let's talk",
      blurb: "Open to AI Engineer and Senior Backend roles, or just to talk about agentic systems and RAG in production.",
    },
    footer: { builtWith: "Built with Next.js + Gemini API" },
    chat: {
      orbOpenAria: "Open AI assistant",
      orbCloseAria: "Close chat",
      assistantName: "Manuel's Assistant",
      assistantTagline: "Here to help and advise you about his career",
      welcome:
        "Hi! 👋 I'm Manuel's AI assistant. I'm here to help you and tell you all about his career, tech stack, and projects.",
      suggested: [
        "What stack does he have the most experience with?",
        "Tell me about SellEasy and the AI agents",
        "What did he build at Netcare IT with WhatsApp?",
        "Does he have experience with RAG and vector databases?",
      ],
      placeholder: "Ask me something about his career...",
      sendAria: "Send message",
      errorGeneric: "Something went wrong. Please try again in a moment.",
      errorConnection: "Couldn't reach the server. Check your connection and try again.",
      backAria: "Back to portfolio",
    },
  },
};
