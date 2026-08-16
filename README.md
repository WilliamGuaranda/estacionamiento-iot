# Estacionamiento Inteligente UTEQ

> Proyecto IoT • React + Firebase Realtime Database

<div align="center">
  <img src="public/Pagina%20de%20Inicio.png" alt="Pantalla de inicio" width="900" />
</div>

## Capturas del sistema

<div align="center">
  <img src="public/Pagina%20del%20Estacionamiento%20%281%29.png" alt="Vista general del estacionamiento" width="430" />
  <img src="public/Pagina%20del%20Estacionamiento%20%282%29.png" alt="Detalle de espacios" width="430" />
  <img src="public/Pagina%20del%20Estacionamiento%20%283%29.png" alt="Mapa del estacionamiento" width="430" />
  <img src="public/Pagina%20de%20Detalle%20%281%29.png" alt="Página de detalle del espacio" width="430" />
  <img src="public/Pagina%20de%20Detalle%20%282%29.png" alt="Historial del espacio" width="430" />
</div>

## ¿Qué hace este proyecto?

Este repositorio contiene una aplicación web para monitorear en tiempo real la disponibilidad de espacios de estacionamiento en una universidad o campus. La solución combina:

- Frontend en React con Vite
- Base de datos en tiempo real con Firebase Realtime Database
- Simulación de sensores para cambiar automáticamente el estado de los espacios
- Visualización de cantidad de espacios libres/ocupados
- Mapa interactivo de ubicación por coordenadas
- Vista detallada por espacio con historial y métricas

La aplicación permite observar el estado de cada plaza, filtrar por columna y disponibilidad, y consultar información histórica para analizar la ocupación del estacionamiento.

## Características principales

- Monitoreo en tiempo real de 80 espacios
- Estado de cada espacio: libre, ocupado o sin información
- Filtros por columna y estado
- Resumen estadístico de capacidad y disponibilidad
- Mapa con ubicaciones geográficas
- Historial por espacio con timestamps
- Simulación automática de sensores para pruebas y demostraciones

## Tecnologías utilizadas

- React 19
- Vite
- Firebase Realtime Database
- React Router
- Leaflet / react-leaflet
- Recharts
- Lucide React

## Requisitos previos

Antes de ejecutar la aplicación necesitas tener instalado:

- Node.js 18 o superior
- npm o yarn
- Una cuenta de Firebase con un proyecto configurado
- Acceso a Realtime Database

## Instalación

1. Clona este repositorio:

```bash
git clone <url-del-repositorio>
cd estacionamiento-iot
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto basado en el ejemplo:

```bash
cp .env.example .env
```

4. Configura las variables de entorno de Firebase en el archivo `.env`:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://tu_proyecto-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

## Configuración de Firebase

1. Crea un proyecto en Firebase.
2. Activa Realtime Database.
3. Copia la configuración del proyecto desde la consola de Firebase.
4. Asegúrate de que tu base de datos tenga una estructura como esta:

```json
{
  "espacios": {
    "A1": {
      "id": "A1",
      "numero": 1,
      "columna": 1,
      "estado": "libre",
      "distanciaDetectada": 72,
      "fechaHora": 1710000000000,
      "ubicacion": {
        "nombre": "Entrada principal",
        "latitud": -2.123456,
        "longitud": -79.123456,
        "boundingBox": {
          "norte": -2.123000,
          "sur": -2.124000,
          "oeste": -79.124000,
          "este": -79.123000
        }
      }
    }
  },
  "historial": {
    "A1": {
      "1710000000000": {
        "distanciaDetectada": 72,
        "estado": "libre",
        "fechaHora": 1710000000000
      }
    }
  }
}
```

> Si la base de datos está vacía, la aplicación intenta inicializar los espacios automáticamente mediante la simulación.

## Ejecutar la aplicación

### Modo desarrollo

```bash
npm run dev
```

Luego abre la URL que te indique Vite, normalmente:

```bash
http://localhost:5173
```

### Compilar para producción

```bash
npm run build
```

### Vista previa de la build

```bash
npm run preview
```

## Estructura del proyecto

```text
estacionamiento-iot/
├── public/
│   ├── Pagina de Inicio.png
│   ├── Pagina del Estacionamiento (1).png
│   ├── Pagina del Estacionamiento (2).png
│   ├── Pagina del Estacionamiento (3).png
│   ├── Pagina de Detalle (1).png
│   └── Pagina de Detalle (2).png
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Cómo funciona la simulación

La aplicación incluye un proceso de simulación que cambia aleatoriamente el estado y la distancia detectada de varios espacios cada cierto intervalo. Esa información se envía a Firebase y se refleja en la interfaz en tiempo real.

## Licencia

Este proyecto se entrega con fines de demostración y desarrollo académico.

## Autor

Proyecto desarrollado para monitoreo inteligente de estacionamiento con enfoque IoT y visualización web.
