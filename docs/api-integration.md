# Integración con API del Backend

## Descripción

Esta integración permite conectar con la API del backend en `https://yellow-bear-store-api.onrender.com/api` para verificar el estado de salud de la aplicación.

## Archivos Creados

### 1. `lib/api.ts`
Configuración base de axios para todas las llamadas a la API:
- URL base configurada
- Timeout de 10 segundos
- Interceptor para manejo de errores
- Headers por defecto

### 2. `hooks/use-api-health.ts`
Hook personalizado para verificar el estado de la API:
- Estado de carga
- Estado de salud (conectado/desconectado)
- Manejo de errores
- Función para verificar manualmente
- Timestamp de última verificación

### 3. `components/ApiHealthStatus.tsx`
Componente UI para mostrar el estado de la API:
- Indicador visual del estado
- Botón para verificar manualmente
- Mostrar errores de conexión
- Timestamp de última verificación

## Uso

### Hook Básico
```typescript
import { useApiHealth } from '@/hooks/use-api-health';

function MyComponent() {
  const { isHealthy, isLoading, error, checkHealth } = useApiHealth();
  
  return (
    <div>
      {isLoading && <p>Verificando...</p>}
      {isHealthy && <p>API conectada</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={checkHealth}>Verificar</button>
    </div>
  );
}
```

### Componente UI
```typescript
import { ApiHealthStatus } from '@/components/ApiHealthStatus';

function MyPage() {
  return (
    <div>
      <ApiHealthStatus />
    </div>
  );
}
```

### Llamadas Directas a la API
```typescript
import api from '@/lib/api';

// Verificar salud
const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    console.log('API Status:', response.status);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
  }
};

// Otras llamadas a la API
const getData = async () => {
  const response = await api.get('/endpoint');
  return response.data;
};
```

## Endpoints Disponibles

- `GET /health` - Verificar estado de salud de la API

## Características

- ✅ Verificación automática al cargar
- ✅ Verificación manual con botón
- ✅ Indicadores visuales de estado
- ✅ Manejo de errores
- ✅ Timestamp de última verificación
- ✅ Timeout configurado
- ✅ Interceptores para logging

## Próximos Pasos

Para agregar más endpoints, simplemente usa la instancia `api` configurada:

```typescript
// Ejemplo para otros endpoints
const getUsers = () => api.get('/users');
const createUser = (data) => api.post('/users', data);
const updateUser = (id, data) => api.put(`/users/${id}`, data);
const deleteUser = (id) => api.delete(`/users/${id}`);
``` 