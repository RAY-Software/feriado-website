# Feriado Cantina Website

Sitio web de Feriado Cantina (by Feriado Vermú) desarrollado con Next.js.

## Estructura del Proyecto

```
feriado-cantina-website/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Layout raíz con Navbar y Footer
│   ├── page.tsx                  # Página principal
│   ├── globals.css               # Estilos globales
│   └── api/                      # API Routes
│       ├── booking/
│       │   ├── route.ts          # Crear reserva
│       │   ├── slots-available/  # Consultar disponibilidad
│       │   ├── locations/        # Obtener locales
│       │   └── motives/          # Obtener motivos de reserva
│       └── chat/
│           └── route.ts          # Chat widget (n8n webhook)
├── components/                   # Componentes React
│   ├── ui/                       # Shadcn/UI (Button, Input, Select, Calendar, etc.)
│   ├── Navbar.tsx                # Navegación
│   ├── Footer.tsx                # Footer
│   ├── HeroSection.tsx           # Carrusel hero
│   ├── BookingForm.tsx           # Formulario de reservas (conectado a Rayapp API)
│   ├── FeaturedProducts.tsx      # Productos destacados
│   ├── FeaturedBeers.tsx         # Bebidas destacadas
│   ├── LocationsSection.tsx      # Sección de ubicación
│   ├── CustomerReviews.tsx       # Reseñas de clientes
│   └── ChatWidget.tsx            # Widget de chat
├── lib/                          # Utilidades
│   ├── utils.ts                  # Tailwind utilities
│   ├── analytics.ts              # Google Analytics
│   ├── rayapp-config.ts          # Configuración API Rayapp
│   └── location-data.ts          # Datos de ubicación
├── public/                       # Assets estáticos
│   ├── chat-widget.js            # Script del chat widget
│   ├── chat-widget.css           # Estilos del chat widget
│   └── sitemap.xml               # Sitemap SEO
└── package.json                  # Dependencias
```

## Ubicación

| Local            | Dirección                                          |
| ---------------- | -------------------------------------------------- |
| Feriado Cantina  | Av. Cabildo 3702, Coghlan, Buenos Aires, Argentina |

## Funcionalidades

- Hero section con carrusel de imágenes
- Formulario de reservas conectado a la API de Rayapp
- Productos y bebidas destacadas
- Reseñas de clientes
- Sección de ubicación con Google Maps
- FAQ accordion
- Chat widget (conectado a n8n)
- SEO con structured data (JSON-LD) y sitemap
- Google Analytics

## Requisitos

- **Node.js 20** (recomendado vía nvm)
- npm

## Setup

### 1. Clonar y entrar al proyecto

```bash
cd feriado-cantina-website
```

### 2. Usar la versión correcta de Node

```bash
nvm use 20
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar variables de entorno

Copiar el archivo de ejemplo y completar con los valores reales:

```bash
cp .env.example .env
```

**Variables obligatorias para que funcione la app:**

| Variable | Qué es | Ejemplo |
| --- | --- | --- |
| `RAYAPP_API_BASE_URL` | URL del backend de Rayapp (reservas, locales, disponibilidad). Sin esto la app no levanta. | `https://api.rayapp.io` |
| `RAYAPP_COMPANY_ID` | ID numérico de la empresa en Rayapp | `1` |
| `RAYAPP_COMPANY_NAME` | Nombre de la empresa en Rayapp | `temple` |

**Variables opcionales (pero recomendadas):**

| Variable | Qué es |
| --- | --- |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | API key de Google Maps para el mapa de ubicación |
| `NEXT_PUBLIC_GA_ID` | Measurement ID de Google Analytics (GA4) |
| `ZAPIER_BOOKING_WEBHOOK_URL` | Webhook de Zapier para notificaciones de reservas |
| `N8N_WEBHOOK_URL` | Webhook de n8n para el chat widget |

Ver `.env.example` para más detalles.

### 5. Servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Website Audit (SEO)

`website-audit` es una herramienta complementaria para auditar el SEO del sitio (metadatos, sitemap, performance, etc.).

### Cómo clonar y levantar `website-audit`

```bash
git clone git@github.com:RAY-Software/website-audit.git
cd website-audit
npm i
cd server
npm i
cd ..
npm run dev:full
```

Por defecto levantará tanto el frontend como el servidor necesario para correr las auditorías SEO en entorno local.

Consideraciones de entorno local

- **Performance**
  - **PageSpeed Insights**: `Pending`
- **Security**
  - **SSL Certificate**: `Pending`

Estos checks aparecerán siempre como pendientes o con error cuando el sitio esté levantado en entorno local (`http://localhost`), ya que las herramientas externas esperan una URL pública con certificado SSL válido.

## Stack Tecnológico

- **Next.js** — Framework React con App Router
- **React** — UI library
- **TypeScript** — Tipado estático
- **Tailwind CSS** — Estilos
- **Radix UI** — Componentes accesibles (Accordion, Dialog, Select)
- **Zod** — Validación de formularios
- **Date-fns** — Utilidades de fecha
- **Lucide React** — Iconos
- **Sonner** — Notificaciones toast
- **Rayapp API** — Backend de reservas

## Browser Support

- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Diseño responsive (mobile-first)
