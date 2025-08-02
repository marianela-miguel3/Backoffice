# 📊 Backoffice de Cotizaciones - Yellow Bear S.A

Sistema de gestión de cotizaciones con integración completa al backend API.

## 🚀 Características

- ✅ **Integración con API Backend**: Conexión real con `yellow-bear-store-api.onrender.com`
- ✅ **Gestión de Cotizaciones**: Visualización y gestión de quotes reales
- ✅ **Filtros Avanzados**: Por tipo, método de pago, producto y estado de contacto
- ✅ **Estado de API**: Monitoreo en tiempo real del estado del backend
- ✅ **Interfaz Moderna**: Diseño responsive con shadcn/ui
- ✅ **Manejo de Errores**: Gestión robusta de errores de conexión

## 🏗️ Arquitectura

### Frontend
- **Next.js 15.2.4** con App Router
- **React 18** con TypeScript
- **Tailwind CSS** para estilos
- **shadcn/ui** para componentes

### Backend Integration
- **API Routes** como proxy para evitar CORS
- **Axios** para llamadas HTTP
- **Fetch API** para llamadas directas
- **Hooks personalizados** para gestión de estado

## 🔌 Integración con Backend

### Endpoints Integrados

#### Health Check
```typescript
GET /api/health
// Verifica el estado del backend
// URL: https://yellow-bear-store-api.onrender.com/api/health
```

#### Quotes Management
```typescript
GET /api/quotes
// Obtiene todas las cotizaciones
// URL: https://yellow-bear-store-api.onrender.com/api/quotes

POST /api/quotes
// Crea una nueva cotización
// URL: https://yellow-bear-store-api.onrender.com/api/quotes
```

### Estructura de Datos

#### Quote (Cotización)
```typescript
interface Quote {
  id: number;
  type: 'CATALOG' | 'CUSTOM';
  fullName: string;
  companyName: string;
  cuilCuit: string;
  address: string;
  addressLat: number;
  addressLong: number;
  hasReferencePrice: boolean;
  referencePriceDescription?: string;
  referencePriceFileURL?: string;
  paymentMethod: 'WIRE' | 'LOCAL_CASH' | 'OFFSHORE_CASH' | 'LETTER_OFF_CREDIT';
  contactEmail: string;
  contactPhone: string;
  comments?: string;
  createdAt: string;
  updatedAt: string;
  customProductName?: string;
  customProductDescription?: string;
  customProductUrl?: string;
  customProductSerialNumber?: string;
  productInCatalogId?: number;
  contactado?: boolean; // Estado local
}
```

## 📁 Estructura del Proyecto

```
├── app/
│   ├── api/
│   │   ├── health/route.ts          # API route para health check
│   │   └── quotes/route.ts          # API route para quotes
│   ├── page.tsx                     # Página principal
│   └── layout.tsx                   # Layout principal
├── components/
│   ├── ui/                          # Componentes shadcn/ui
│   ├── ApiHealthStatus.tsx          # Componente de estado de API
│   ├── cotizaciones-table.tsx       # Tabla de cotizaciones
│   ├── filter-section.tsx           # Sección de filtros
│   └── header.tsx                   # Header de la aplicación
├── hooks/
│   ├── use-quotes.ts                # Hook para gestión de quotes
│   └── use-toast.ts                 # Hook para notificaciones
├── lib/
│   ├── api.ts                       # Configuración de axios
│   └── utils.ts                     # Utilidades
├── types/
│   └── cotizacion.ts                # Tipos TypeScript
└── docs/
    └── api-integration.md           # Documentación de integración
```

## 🛠️ Configuración

### Instalación

```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Instalar dependencias
npm install
# o
pnpm install

# Iniciar servidor de desarrollo
npm run dev
# o
pnpm dev
```

### Variables de Entorno

```env
# Backend API URL
NEXT_PUBLIC_API_URL=https://yellow-bear-store-api.onrender.com/api
```

## 🎯 Funcionalidades Principales

### 1. Monitoreo de Estado de API
- **Componente**: `ApiHealthStatus`
- **Funcionalidad**: Verificación en tiempo real del estado del backend
- **Indicadores**: Conectado/Desconectado con detalles del servidor

### 2. Gestión de Cotizaciones
- **Hook**: `useQuotes`
- **Funcionalidad**: Carga y gestión de quotes desde la API
- **Características**:
  - Carga automática al iniciar
  - Manejo de errores
  - Estado de contacto local
  - Filtrado y búsqueda

### 3. Filtros Avanzados
- **Tipo**: CATALOG/CUSTOM
- **Método de Pago**: LOCAL/OFFSHORE
- **Producto**: Catálogo/Custom
- **Estado de Contacto**: Contactado/No contactado

### 4. Tabla de Cotizaciones
- **Componente**: `CotizacionesTable`
- **Funcionalidades**:
  - Visualización de datos completos
  - Marcado de contacto
  - Enlaces a archivos de referencia
  - Información de contacto

## 🔧 API Routes

### `/api/health`
```typescript
GET /api/health
// Proxy para verificar estado del backend
// Evita problemas de CORS
```

### `/api/quotes`
```typescript
GET /api/quotes
// Obtiene todas las cotizaciones

POST /api/quotes
// Crea una nueva cotización
// Body: Quote object
```

## 🎨 Componentes UI

### ApiHealthStatus
- Muestra estado de conexión con el backend
- Indicadores visuales (verde/rojo)
- Información detallada del servidor
- Botón de verificación manual

### CotizacionesTable
- Tabla responsive con datos de quotes
- Filtros integrados
- Acciones de contacto
- Enlaces a archivos

### FilterSection
- Filtros múltiples
- Estado persistente
- Interfaz intuitiva

## 🚀 Despliegue

### Desarrollo Local
```bash
npm run dev
# Servidor en http://localhost:3000 (o 3001 si está ocupado)
```

### Producción
```bash
npm run build
npm start
```

## 📊 Datos de Ejemplo

El sistema actualmente muestra 2 cotizaciones reales:

1. **John Doe** (Acme Corp)
   - Tipo: CATALOG
   - Método de Pago: WIRE
   - Producto del catálogo

2. **Jane Smith** (Tech Solutions)
   - Tipo: CUSTOM
   - Método de Pago: WIRE
   - Producto personalizado

## 🔍 Troubleshooting

### Puerto 3000 Ocupado
```bash
# Verificar qué usa el puerto
netstat -ano | findstr :3000

# Terminar proceso
taskkill /PID [número] /F

# O usar puerto alternativo
npm run dev -- -p 3001
```

### Errores de CORS
- Las API routes actúan como proxy
- No hay problemas de CORS en desarrollo
- Configuración automática en producción

### Errores de Conexión
- Verificar estado de la API con el componente `ApiHealthStatus`
- Revisar logs en la consola del navegador
- Verificar conectividad de red

## 📝 Changelog

### v2.0.0 - Integración Backend
- ✅ Integración completa con API backend
- ✅ API routes para evitar CORS
- ✅ Hook personalizado para quotes
- ✅ Componente de estado de API
- ✅ Datos reales de cotizaciones
- ✅ Manejo robusto de errores

### v1.0.0 - Versión Inicial
- ✅ Interfaz básica de gestión
- ✅ Datos de ejemplo
- ✅ Filtros básicos
- ✅ Componentes UI

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 📞 Soporte

Para soporte técnico o preguntas sobre la integración:
- Revisar la documentación en `/docs/api-integration.md`
- Verificar el estado de la API en la aplicación
- Revisar logs en la consola del navegador

---

**Desarrollado para Yellow Bear S.A** 🐻
