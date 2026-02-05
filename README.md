# Sweet Moments - Sistema de Gestión de Pedidos

Aplicación web moderna para la gestión de pedidos y catálogo de productos, construida con React, TypeScript, Vite y Firebase.

## 📋 Características

- **Autenticación**: Sistema de login y registro integrado con Firebase
- **Panel Administrativo**: Dashboard completo para gestión de pedidos
- **Catálogo de Productos**: Administración de productos y categorías
- **Gestión de Pedidos**: Crear, editar, visualizar y gestionar pedidos
- **Calendario**: Vista de pedidos en calendario
- **Filtros Avanzados**: Búsqueda y filtrado de pedidos
- **Interfaz Responsiva**: Diseño adaptable para diferentes dispositivos

## 🛠️ Tecnologías

### Frontend
- **React** 19.2.0 - Librería de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Empaquetador y servidor de desarrollo
- **React Router** 7.12.0 - Enrutamiento
- **TailwindCSS** 4.1.18 - Estilos CSS
- **Radix UI** - Componentes accesibles sin estilos

### Estado y Datos
- **Zustand** 5.0.10 - Gestión de estado
- **React Query** 5.90.17 - Gestión de datos y caché
- **React Hook Form** 7.71.1 - Gestión de formularios

### Backend/Base de Datos
- **Firebase** 12.8.0 - Base de datos y autenticación
- **Firebase Admin** 13.6.0 - Administración del servidor

### Utilidades
- **Axios** 1.13.2 - Cliente HTTP
- **date-fns** 4.1.0 - Manipulación de fechas
- **UUID** 13.0.0 - Generación de identificadores únicos
- **Sonner** 2.0.7 - Notificaciones toast

## 📁 Estructura del Proyecto

```
src/
├── admin/                  # Módulo de administración
│   ├── actions/           # Acciones para obtener datos
│   ├── components/        # Componentes del admin
│   ├── hooks/            # Hooks personalizados
│   ├── layouts/          # Layouts del admin
│   └── pages/            # Páginas (home, pedidos, calendario)
├── auth/                  # Módulo de autenticación
│   ├── actions/          # Acciones de auth
│   ├── pages/            # Login y registro
│   ├── store/            # Zustand store de auth
│   └── layouts/          # Layout de autenticación
├── catalogos/             # Módulo de catálogo
│   ├── actions/          # Acciones de catálogo
│   ├── components/       # Componentes de catálogo
│   ├── hooks/            # Hooks de catálogo
│   └── pages/            # Páginas de productos
├── components/            # Componentes globales
│   ├── custom/           # Componentes personalizados
│   └── ui/               # Componentes UI reutilizables
├── interfaces/            # Tipos e interfaces TypeScript
├── lib/                   # Funciones utilitarias
├── api/                   # Configuración de API
└── assets/               # Recursos estáticos
```

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 16+ y npm/yarn
- Cuenta de Firebase

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>

# Instalar dependencias
npm install

# Crear archivo .env con configuración de Firebase
echo "VITE_FIREBASE_API_KEY=..." > .env
echo "VITE_FIREBASE_AUTH_DOMAIN=..." >> .env
# ... agregar resto de variables
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar verificaciones de tipo
npm run build

# Linter
npm run lint

# Vista previa de producción
npm run preview
```

## 📝 Flujo de la Aplicación

1. **Autenticación**: Usuario inicia sesión o se registra
2. **Dashboard**: Acceso al panel administrativo
3. **Gestión de Pedidos**: Ver, crear y editar pedidos
4. **Catálogo**: Administrar productos y categorías
5. **Calendario**: Visualizar pedidos por fecha

## 🔐 Autenticación

La aplicación utiliza Firebase para la autenticación. El estado se gestiona con Zustand y se verifica automáticamente al cargar la aplicación.

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila TypeScript y genera build de producción
- `npm run lint` - Ejecuta ESLint
- `npm run preview` - Vista previa del build de producción

## 📄 Licencia

Proyecto privado.
