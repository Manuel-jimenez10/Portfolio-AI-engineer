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

export type ModuleId = "about-bongo" | "agents" | "rag" | "metrics" | "experience";

export interface BongoModule {
  id: ModuleId;
  title: string;
  sub: string;
  /** What gets shown as the visitor's message when the module is opened. */
  ask: string;
  /** Bongo's written answer. Rich blocks are appended after it by the renderer. */
  body: string;
}

export interface Translation {
  meta: { title: string; description: string };
  bongo: {
    brand: string;
    brandSub: string;
    online: string;
    navChat: string;
    navStack: string;
    navExperience: string;
    navAbout: string;
    contact: string;
    greetingTitle: string;
    greetingBody: string;
    traits: string[];
    suggestedLabel: string;
    modulesLabel: string;
    modulesCount: string;
    modules: BongoModule[];
    treatTitle: string;
    treatSub: string;
    treatButton: string;
    treatCount: string;
    barks: string[];
    inputPlaceholder: string;
    send: string;
    disclaimer: string;
    thinking: string;
    profileNote: string;
    sectionMetrics: string;
    sectionStack: string;
    sectionExperience: string;
    sectionContact: string;
    contactBlurb: string;
    followUps: string;
  };
  hero: { role: string };
  stack: {
    categories: { ai: string; backend: string; data: string; cloud: string };
  };
  metrics: {
    items: { value: string; label: string; context: string }[];
  };
  experience: { jobs: JobT[] };
  chat: { errorGeneric: string; errorConnection: string };
}

export const translations: Record<Lang, Translation> = {
  es: {
    meta: {
      title: "Manuel Jiménez — AI Engineer",
      description:
        "AI Engineer y Senior Backend Developer especializado en workflows agénticos (LangGraph, CrewAI), RAG y automatización con APIs de Meta. Pregúntale a su asistente de IA sobre su trayectoria.",
    },
    bongo: {
      brand: "Bongo",
      brandSub: "El asistente de Manuel",
      online: "En línea",
      navChat: "Conversar",
      navStack: "Stack",
      navExperience: "Trayectoria",
      navAbout: "Sobre Manuel",
      contact: "Contactar",
      greetingTitle: "Hola, soy Bongo",
      greetingBody:
        "Acompaño a Manuel y conozco su trayectoria al detalle. Pregúntame por su stack, los sistemas multiagente que ha construido o cómo trabaja con RAG en producción.",
      traits: ["Agentes y LangGraph", "RAG y Qdrant", "Backend de alta concurrencia"],
      suggestedLabel: "Para empezar",
      modulesLabel: "Explorar",
      modulesCount: "5 temas",
      modules: [
        {
          id: "about-bongo",
          title: "Quién es Bongo",
          sub: "Qué puedo responder y con qué datos",
          ask: "¿Quién eres y qué puedes contarme?",
          body: "Soy Bongo, el asistente de Manuel Jiménez. Respondo con la información de su CV y su LinkedIn: dónde ha trabajado, qué ha construido y con qué tecnologías. Si te interesa algo en concreto, pregúntame directo — y si no lo sé, te lo digo en lugar de inventarlo.",
        },
        {
          id: "agents",
          title: "Agentes y LangGraph",
          sub: "Flujos multiagente en SellEasy",
          ask: "Cuéntame sobre su trabajo con agentes y LangGraph",
          body: "En SellEasy diseñó flujos de IA conversacional multiagente con LangGraph y CrewAI para ventas de e-commerce y atención al cliente de ciclo completo, resolviendo consultas de forma autónoma y bajando la latencia de respuesta un 32%. También construyó agentes autónomos de ads ops integrados con Meta Ads, TikTok Ads y Google Ads, que redujeron el tiempo de gestión de marketing un 23%.",
        },
        {
          id: "rag",
          title: "RAG y producción",
          sub: "Qdrant, embeddings y observabilidad",
          ask: "¿Cómo trabaja con RAG y bases vectoriales?",
          body: "Diseñó sistemas de búsqueda semántica y recuperación con la base vectorial Qdrant y embeddings, optimizando el uso de tokens, el caching de prompts y el costo por inferencia. Para medirlo todo usa observabilidad de LLM con Helicone. En Seagloo además integró y evaluó pipelines con capas de validación de prompts, subiendo un 20% la precisión en clasificación de incidentes críticos.",
        },
        {
          id: "metrics",
          title: "Impacto medible",
          sub: "Resultados verificables de su trabajo",
          ask: "¿Qué resultados medibles ha conseguido?",
          body: "Estos son los resultados que puede respaldar de su trabajo en Netcare IT, SellEasy y Seagloo:",
        },
        {
          id: "experience",
          title: "Trayectoria y contacto",
          sub: "Dónde ha trabajado y cómo escribirle",
          ask: "¿Dónde ha trabajado y cómo lo contacto?",
          body: "Su recorrido de los últimos años, del rol más reciente al más antiguo:",
        },
      ],
      treatTitle: "Dale un premio a Bongo",
      treatSub: "Se lo ha ganado respondiendo",
      treatButton: "Dar premio",
      treatCount: "premios",
      barks: ["¡Guau!", "¡Guau guau!", "¡Auu!", "¡Guau! 🦴"],
      inputPlaceholder: "Pregúntame sobre su stack, sus proyectos o su experiencia...",
      send: "Enviar",
      disclaimer: "Bongo responde con datos del CV y el LinkedIn de Manuel.",
      thinking: "Bongo está pensando",
      profileNote: "Conozco cada proyecto, stack y resultado de su trayectoria.",
      sectionMetrics: "Impacto medible",
      sectionStack: "Stack técnico",
      sectionExperience: "Trayectoria",
      sectionContact: "Hablar con Manuel",
      contactBlurb:
        "Está abierto a roles de AI Engineer y Backend Senior, y a conversar sobre sistemas agénticos en producción.",
      followUps: "Seguir explorando",
    },
    hero: { role: "AI Engineer & Senior Backend Developer" },
    stack: {
      categories: { ai: "IA & Agentes", backend: "Backend", data: "Datos & Infra", cloud: "Cloud & DevOps" },
    },
    metrics: {
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
    chat: {
      errorGeneric: "Something went wrong. Please try again in a moment.",
      errorConnection: "Couldn't reach the server. Check your connection and try again.",
    },
  },
  en: {
    meta: {
      title: "Manuel Jiménez — AI Engineer",
      description:
        "AI Engineer and Senior Backend Developer specializing in agentic workflows (LangGraph, CrewAI), RAG, and Meta API automation. Ask his AI assistant about his career.",
    },
    bongo: {
      brand: "Bongo",
      brandSub: "Manuel's assistant",
      online: "Online",
      navChat: "Chat",
      navStack: "Stack",
      navExperience: "Experience",
      navAbout: "About Manuel",
      contact: "Get in touch",
      greetingTitle: "Hi, I'm Bongo",
      greetingBody:
        "I keep Manuel company and I know his career in detail. Ask me about his stack, the multi-agent systems he has built, or how he runs RAG in production.",
      traits: ["Agents & LangGraph", "RAG & Qdrant", "High-concurrency backends"],
      suggestedLabel: "Start here",
      modulesLabel: "Explore",
      modulesCount: "5 topics",
      modules: [
        {
          id: "about-bongo",
          title: "Who Bongo is",
          sub: "What I can answer, and from what data",
          ask: "Who are you and what can you tell me?",
          body: "I'm Bongo, Manuel Jiménez's assistant. I answer using what's in his CV and LinkedIn: where he has worked, what he has built and with which technologies. Ask me anything specific — and if I don't know something, I'll say so rather than make it up.",
        },
        {
          id: "agents",
          title: "Agents & LangGraph",
          sub: "Multi-agent workflows at SellEasy",
          ask: "Tell me about his work with agents and LangGraph",
          body: "At SellEasy he designed multi-agent conversational AI workflows with LangGraph and CrewAI for full-cycle e-commerce sales and customer support, resolving inquiries autonomously and cutting response latency by 32%. He also built autonomous ad-ops agents integrated with Meta Ads, TikTok Ads and Google Ads, which cut marketing management time by 23%.",
        },
        {
          id: "rag",
          title: "RAG in production",
          sub: "Qdrant, embeddings and observability",
          ask: "How does he work with RAG and vector databases?",
          body: "He designed semantic search and retrieval systems using the Qdrant vector database and embeddings, optimizing token usage, prompt caching and cost per inference. He measures it all with Helicone LLM observability. At Seagloo he also integrated and evaluated pipelines with prompt-validation layers, raising accuracy on critical incident classification by 20%.",
        },
        {
          id: "metrics",
          title: "Measurable impact",
          sub: "Verifiable results from his work",
          ask: "What measurable results has he delivered?",
          body: "These are the results he can back up from his work at Netcare IT, SellEasy and Seagloo:",
        },
        {
          id: "experience",
          title: "Career & contact",
          sub: "Where he has worked and how to reach him",
          ask: "Where has he worked and how do I contact him?",
          body: "His track record over the past few years, most recent role first:",
        },
      ],
      treatTitle: "Give Bongo a treat",
      treatSub: "He earned it answering",
      treatButton: "Give treat",
      treatCount: "treats",
      barks: ["Woof!", "Woof woof!", "Arf!", "Woof! 🦴"],
      inputPlaceholder: "Ask me about his stack, his projects or his experience...",
      send: "Send",
      disclaimer: "Bongo answers using data from Manuel's CV and LinkedIn.",
      thinking: "Bongo is thinking",
      profileNote: "I know every project, stack and result in his career.",
      sectionMetrics: "Measurable impact",
      sectionStack: "Tech stack",
      sectionExperience: "Experience",
      sectionContact: "Talk to Manuel",
      contactBlurb:
        "He's open to AI Engineer and Senior Backend roles, and happy to talk about agentic systems in production.",
      followUps: "Keep exploring",
    },
    hero: { role: "AI Engineer & Senior Backend Developer" },
    stack: {
      categories: { ai: "AI & Agents", backend: "Backend", data: "Data & Infra", cloud: "Cloud & DevOps" },
    },
    metrics: {
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
    chat: {
      errorGeneric: "Something went wrong. Please try again in a moment.",
      errorConnection: "Couldn't reach the server. Check your connection and try again.",
    },
  },
};
