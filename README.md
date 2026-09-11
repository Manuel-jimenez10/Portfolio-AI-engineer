# Portafolio — Manuel Jiménez

Portafolio de AI Engineer con un diseño bento grid (tema oscuro, glassmorphism) y un
copiloto de IA flotante que responde preguntas sobre la trayectoria profesional,
usando la API de Google Gemini en un endpoint de backend, nunca en el navegador.

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS v4
- **Framer Motion** para animaciones
- **Google Gemini SDK** (`@google/genai`) para el chat, vía `src/app/api/chat/route.ts`
- Todo el contenido (experiencia, stack, métricas) vive en **`src/lib/profile.ts`** —
  única fuente de verdad que alimenta tanto la web como el system prompt del chat
  (`src/lib/systemPrompt.ts`). Editar la carrera profesional es editar ese archivo.

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # y pega tu API key real ahí
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Sin `GEMINI_API_KEY` el sitio
funciona igual, pero el chat responde con un error controlado explicando que falta
configurarlo (no rompe la página).

### Conseguir una API key de Gemini (gratis)

1. Entra a [Google AI Studio](https://aistudio.google.com/apikey) con tu cuenta de
   Google y genera una key (`AIza...`). **No pide tarjeta de crédito** — el nivel
   gratuito es real y permanente, con cuota diaria de sobra para un portafolio
   personal.
2. El chat usa por defecto **`gemini-3.5-flash`**, con buen balance de calidad,
   velocidad y costo, y respuestas limitadas a 600 tokens de salida. Puedes revisar
   tu consumo y límites en [aistudio.google.com](https://aistudio.google.com). El
   catálogo de modelos de Google cambia rápido — `gemini-2.5-flash` y
   `gemini-2.5-flash-lite` ya están retirados para cuentas nuevas al momento de
   escribir esto. Si el chat empieza a fallar con un error 404 ("no longer
   available") o 503 persistente ("high demand"), prueba otro nombre de modelo de
   [aistudio.google.com](https://aistudio.google.com) en `GEMINI_MODEL`.
3. Si más adelante quieres subir a un modelo de pago o a Claude/OpenAI por calidad,
   solo hay que reescribir `src/app/api/chat/route.ts` — el resto del sitio
   (contenido, diseño, rate limiting) no depende del proveedor.

## Protección contra abuso

`src/lib/rateLimit.ts` limita cada IP a 20 mensajes por hora, en memoria (se reinicia
en cada cold start de la función serverless — suficiente para el tráfico de un
portafolio personal). El system prompt además instruye al modelo a rechazar
instrucciones que intenten desviarlo de hablar sobre la carrera de Manuel. Si el
tráfico crece y quieres un límite persistente y compartido entre instancias, la
opción natural es **Upstash Redis** (serverless, tier gratuito) reemplazando el mapa
en memoria por `@upstash/ratelimit`.

## Deploy en Vercel

1. Sube este repo a GitHub (ver sección siguiente).
2. En [vercel.com/new](https://vercel.com/new), importa el repositorio.
3. En **Environment Variables**, agrega:
   - `GEMINI_API_KEY` = tu key real
   - `GEMINI_MODEL` = `gemini-2.5-flash` (opcional, ya es el default)
4. Deploy. Vercel detecta Next.js automáticamente, no necesita configuración extra.
5. Cada push a `main` vuelve a desplegar automáticamente.

## Subir a GitHub

Este proyecto tiene su **propio repositorio Git**, aislado del resto de tu carpeta de
usuario:

```bash
git add .
git commit -m "Portafolio inicial"
# crea un repo vacío en GitHub (ej. "portafolio") y luego:
git remote add origin https://github.com/<tu-usuario>/portafolio.git
git branch -M main
git push -u origin main
```

## Editar el contenido

- **Experiencia, stack, métricas, educación:** `src/lib/profile.ts`
- **Comportamiento y tono del chat:** `src/lib/systemPrompt.ts`
- **Colores / tema:** tokens CSS en `src/app/globals.css` (diseño intencionalmente
  solo modo oscuro)
- **Secciones de la página:** `src/app/page.tsx` y componentes en `src/components/`
