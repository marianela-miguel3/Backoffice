# 📊 Backoffice de Cotizaciones

Sistema de gestión de cotizaciones desarrollado en React con TypeScript y Tailwind CSS. Permite administrar cotizaciones de catálogo y personalizadas con funcionalidades de filtrado avanzado y seguimiento de contactos.

## ✨ Características

- 🏷️ **Gestión de Cotizaciones**: Manejo de cotizaciones CATALOGO y CUSTOM
- 🔍 **Filtros Avanzados**: Filtrado por tipo, moneda, producto y estado de contacto
- ✅ **Seguimiento de Leads**: Sistema de checkbox para marcar cotizaciones contactadas
- 📱 **Diseño Responsive**: Interfaz optimizada para diferentes tamaños de pantalla
- 🎨 **UI Moderna**: Diseño limpio con Tailwind CSS y componentes shadcn/ui
- 📍 **Geolocalización**: Soporte para coordenadas GPS en direcciones
- 📄 **Información Completa**: Datos detallados de productos, clientes y contacto

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Next.js 14** - Framework de React con App Router
- **Tailwind CSS** - Framework de CSS utilitario
- **shadcn/ui** - Componentes de UI reutilizables
- **Lucide React** - Iconografía moderna

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18.0 o superior)
- **npm** (versión 8.0 o superior) o **yarn** (versión 1.22 o superior)

## 🚀 Instalación

### 1. Clonar el repositorio

\`\`\`bash
git clone https://github.com/tu-usuario/backoffice-cotizaciones.git
cd backoffice-cotizaciones
\`\`\`

### 2. Instalar dependencias

\`\`\`bash
npm install

# o

yarn install
\`\`\`

### 3. Ejecutar en modo desarrollo

\`\`\`bash
npm run dev

# o

yarn dev
\`\`\`

### 4. Abrir en el navegador

Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📁 Estructura del Proyecto

\`\`\`
backoffice-cotizaciones/
├── app/ # Páginas de Next.js (App Router)
│ ├── globals.css # Estilos globales
│ ├── layout.tsx # Layout principal
│ └── page.tsx # Página principal
├── components/ # Componentes React
│ ├── ui/ # Componentes de shadcn/ui
│ ├── header.tsx # Header con logo y logout
│ ├── filter-section.tsx # Sección de filtros
│ └── cotizaciones-table.tsx # Tabla de cotizaciones
├── data/ # Datos de ejemplo
│ └── sample-data.ts # Cotizaciones de muestra
├── types/ # Definiciones de TypeScript
│ └── cotizacion.ts # Interfaces y tipos
├── public/ # Archivos estáticos
├── .gitignore # Archivos ignorados por Git
├── README.md # Documentación del proyecto
├── package.json # Dependencias y scripts
└── tailwind.config.ts # Configuración de Tailwind
\`\`\`

## 🎯 Uso de la Aplicación

### Dashboard Principal

Al acceder a la aplicación, verás:

1. **Header**: Logo de la aplicación y botón de cerrar sesión
2. **Estadísticas**: Contador de cotizaciones contactadas vs pendientes
3. **Filtros**: Panel con 4 filtros diferentes
4. **Tabla**: Lista completa de cotizaciones con todas las columnas

### Filtros Disponibles

#### 1. **Tipo de Cotización**

- **Todos**: Muestra todas las cotizaciones
- **Catálogo**: Solo cotizaciones de productos del catálogo
- **Custom**: Solo cotizaciones de productos personalizados

#### 2. **Moneda**

- **Todos**: Todas las formas de pago
- **Local**: Efectivo local, transferencias y cartas de crédito
- **Offshore**: Solo efectivo offshore

#### 3. **Tipo de Producto**

- **Todos**: Todos los tipos
- **Local**: Productos locales
- **Offshore**: Productos offshore

#### 4. **Estado de Contacto**

- **Todos**: Todas las cotizaciones
- **Contactados**: Solo cotizaciones ya contactadas
- **No contactados**: Solo cotizaciones pendientes

### Gestión de Contactos

- **Marcar como contactado**: Haz clic en el checkbox de la primera columna
- **Filtrar por estado**: Usa el filtro "Estado de contacto"
- **Ver estadísticas**: Los contadores se actualizan automáticamente

### Información de la Tabla

La tabla muestra las siguientes columnas:

| Columna     | Descripción                                                |
| ----------- | ---------------------------------------------------------- |
| Contactado  | Checkbox para marcar si se contactó al cliente             |
| Tipo        | CAT (Catálogo) o CUS (Custom)                              |
| Producto    | Nombre del producto o servicio                             |
| Descripción | Descripción detallada del producto                         |
| Cant.       | Cantidad solicitada                                        |
| Cliente     | Nombre completo del cliente                                |
| Empresa     | Nombre de la empresa                                       |
| CUIT        | Número de CUIT/CUIL                                        |
| Dirección   | Dirección y coordenadas GPS (si están disponibles)         |
| Pago        | Forma de pago abreviada                                    |
| Prod.       | LOC (Local) u OFF (Offshore)                               |
| P.Ref.      | Indica si tiene precio de referencia con enlace al archivo |
| Contacto    | Email y/o teléfono con iconos                              |
| Comentarios | Observaciones adicionales                                  |

## 🔧 Scripts Disponibles

\`\`\`bash

# Desarrollo

npm run dev # Inicia servidor de desarrollo
npm run build # Construye la aplicación para producción
npm run start # Inicia servidor de producción
npm run lint # Ejecuta ESLint para revisar código

# Yarn equivalentes

yarn dev
yarn build
yarn start
yarn lint
\`\`\`

## 📊 Datos de Ejemplo

La aplicación incluye 6 cotizaciones de ejemplo que demuestran:

- ✅ **3 Cotizaciones contactadas**: Juan Pérez, Carlos Rodriguez, Laura Fernández
- ⏳ **3 Cotizaciones pendientes**: María González, Ana Martínez, Roberto Silva
- 🏷️ **Mix de tipos**: 3 CATALOGO y 3 CUSTOM
- 💰 **Diferentes formas de pago**: Local y offshore
- 📍 **Coordenadas GPS**: Algunas incluyen geolocalización

## 🎨 Personalización

### Colores y Tema

Los colores principales se pueden modificar en `tailwind.config.ts`:

\`\`\`typescript
theme: {
extend: {
colors: {
// Personaliza los colores aquí
}
}
}
\`\`\`

### Componentes UI

Los componentes de shadcn/ui se pueden personalizar en la carpeta `components/ui/`.

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a [Vercel](https://vercel.com)
2. Vercel detectará automáticamente que es un proyecto Next.js
3. El despliegue se realizará automáticamente

### Otros Proveedores

\`\`\`bash

# Construir para producción

npm run build

# Los archivos estáticos estarán en la carpeta .next/

\`\`\`

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Próximas Funcionalidades

- [ ] Paginación para grandes volúmenes de datos
- [ ] Búsqueda global en todas las columnas
- [ ] Exportación a Excel/CSV
- [ ] Sistema de notificaciones
- [ ] Integración con API real
- [ ] Autenticación de usuarios
- [ ] Dashboard con gráficos y estadísticas
- [ ] Historial de cambios en cotizaciones

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:

- 📧 Email: soporte@cotizaapp.com
- 💬 Issues: [GitHub Issues](https://github.com/tu-usuario/backoffice-cotizaciones/issues)
- 📖 Documentación: [Wiki del proyecto](https://github.com/tu-usuario/backoffice-cotizaciones/wiki)

---

⭐ **¡No olvides dar una estrella al proyecto si te resultó útil!**
