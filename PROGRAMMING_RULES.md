# 📚 Reglas Esenciales para Programar

## 🎯 Principios Fundamentales

### 1. **Código Limpio y Legible**
- **Nombres descriptivos**: Variables, funciones y clases deben tener nombres que expliquen su propósito
- **Funciones pequeñas**: Una función debe hacer una sola cosa y hacerla bien
- **Comentarios útiles**: Explica el "por qué", no el "qué"
- **Consistencia**: Mantén un estilo de código uniforme en todo el proyecto

### 2. **Principio DRY (Don't Repeat Yourself)**
- No dupliques código
- Extrae funcionalidad común en funciones o módulos reutilizables
- Crea abstracciones cuando sea necesario

### 3. **Principio KISS (Keep It Simple, Stupid)**
- La solución más simple es generalmente la mejor
- Evita la complejidad innecesaria
- Prioriza la claridad sobre la cleverness

### 4. **Principio YAGNI (You Aren't Gonna Need It)**
- No implementes funcionalidades que no necesitas ahora
- Enfócate en los requisitos actuales
- Evita la sobre-ingeniería

## 🏗️ Principios SOLID

### **S - Single Responsibility Principle**
```javascript
// ❌ Malo
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  saveToDatabase() { /* ... */ }
  sendEmail() { /* ... */ }
  validateEmail() { /* ... */ }
}

// ✅ Bueno
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class UserRepository {
  save(user) { /* ... */ }
}

class EmailService {
  send(user, message) { /* ... */ }
}
```

### **O - Open/Closed Principle**
- Las clases deben estar abiertas para extensión pero cerradas para modificación
- Usa herencia, composición o interfaces para extender funcionalidad

### **L - Liskov Substitution Principle**
- Los objetos de una clase derivada deben poder reemplazar objetos de la clase base sin alterar el comportamiento

### **I - Interface Segregation Principle**
- Muchas interfaces específicas son mejor que una interfaz general
- Los clientes no deben depender de interfaces que no usan

### **D - Dependency Inversion Principle**
- Depende de abstracciones, no de concreciones
- Los módulos de alto nivel no deben depender de módulos de bajo nivel

## 🔧 Mejores Prácticas de Desarrollo

### **Manejo de Errores**
```javascript
// ✅ Bueno
async function fetchUserData(userId) {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user data');
  }
}

// ❌ Malo
async function fetchUserData(userId) {
  const response = await api.get(`/users/${userId}`);
  return response.data; // No maneja errores
}
```

### **Validación de Datos**
```javascript
// ✅ Bueno
function createUser(userData) {
  if (!userData.email || !isValidEmail(userData.email)) {
    throw new Error('Valid email is required');
  }
  
  if (!userData.name || userData.name.trim().length < 2) {
    throw new Error('Name must be at least 2 characters');
  }
  
  return new User(userData);
}
```

### **Manejo de Estados**
```javascript
// ✅ Bueno - Estado inmutable
const updateUserState = (state, updates) => ({
  ...state,
  user: {
    ...state.user,
    ...updates
  }
});

// ❌ Malo - Mutación directa
const updateUserState = (state, updates) => {
  state.user.name = updates.name; // Mutación directa
  return state;
};
```

## 🧪 Testing (Pruebas)

### **Principios de Testing**
1. **Arrange, Act, Assert (AAA)**
2. **Test una sola cosa por vez**
3. **Tests deben ser rápidos y confiables**
4. **Tests deben ser independientes**

```javascript
// ✅ Ejemplo de buen test
describe('User Service', () => {
  it('should create user with valid data', () => {
    // Arrange
    const userData = { name: 'John', email: 'john@example.com' };
    
    // Act
    const user = userService.create(userData);
    
    // Assert
    expect(user.name).toBe('John');
    expect(user.email).toBe('john@example.com');
  });
});
```

### **Tipos de Tests**
- **Unit Tests**: Prueban funciones/clases individuales
- **Integration Tests**: Prueban interacciones entre módulos
- **E2E Tests**: Prueban el flujo completo de la aplicación

## 📊 Control de Versiones (Git)

### **Commits Significativos**
```bash
# ✅ Buenos commits
git commit -m "feat: add user authentication"
git commit -m "fix: resolve memory leak in image processing"
git commit -m "docs: update API documentation"

# ❌ Malos commits
git commit -m "stuff"
git commit -m "fix bug"
git commit -m "updates"
```

### **Convenciones de Commit**
- **feat**: Nueva funcionalidad
- **fix**: Corrección de bug
- **docs**: Documentación
- **style**: Cambios de formato
- **refactor**: Refactorización
- **test**: Añadir o modificar tests
- **chore**: Tareas de mantenimiento

## 🚀 Performance y Optimización

### **Optimización Temprana vs Tardía**
- "Premature optimization is the root of all evil" - Donald Knuth
- Primero haz que funcione, luego optimiza si es necesario
- Mide antes de optimizar

### **Principios de Performance**
```javascript
// ✅ Bueno - Lazy loading
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

// ✅ Bueno - Memoización
const memoizedExpensiveFunction = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

// ❌ Malo - Recalcular en cada render
const ExpensiveComponent = ({ data }) => {
  const result = expensiveCalculation(data); // Se ejecuta siempre
  return <div>{result}</div>;
};
```

## 🔒 Seguridad

### **Reglas de Seguridad Básicas**
1. **Nunca hardcodees credenciales**
2. **Valida y sanitiza todas las entradas**
3. **Usa HTTPS siempre**
4. **Implementa autenticación y autorización**
5. **Mantén dependencias actualizadas**

```javascript
// ✅ Bueno
const apiKey = process.env.API_KEY;

// ❌ Malo
const apiKey = "sk-1234567890abcdef"; // Nunca hagas esto
```

## 📝 Documentación

### **Qué Documentar**
- **README**: Cómo instalar y usar el proyecto
- **API Documentation**: Endpoints, parámetros, respuestas
- **Code Comments**: Lógica compleja o decisiones de diseño
- **Architecture**: Diagramas y decisiones de arquitectura

### **Ejemplo de Documentación**
```javascript
/**
 * Calcula el precio total incluyendo impuestos
 * @param {number} basePrice - Precio base del producto
 * @param {number} taxRate - Tasa de impuesto (0.1 = 10%)
 * @returns {number} Precio total con impuestos
 * @throws {Error} Si los parámetros no son válidos
 */
function calculateTotalPrice(basePrice, taxRate) {
  if (typeof basePrice !== 'number' || basePrice < 0) {
    throw new Error('Base price must be a positive number');
  }
  
  if (typeof taxRate !== 'number' || taxRate < 0 || taxRate > 1) {
    throw new Error('Tax rate must be between 0 and 1');
  }
  
  return basePrice * (1 + taxRate);
}
```

## 🎨 Arquitectura y Diseño

### **Patrones de Diseño Comunes**
- **MVC/MVP/MVVM**: Separación de responsabilidades
- **Observer**: Para sistemas de eventos
- **Factory**: Para crear objetos
- **Singleton**: Para instancias únicas
- **Repository**: Para acceso a datos

### **Arquitectura de Aplicaciones**
```
src/
├── components/     # Componentes reutilizables
├── pages/         # Páginas/vistas
├── services/      # Lógica de negocio
├── utils/         # Funciones utilitarias
├── hooks/         # Hooks personalizados (React)
├── types/         # Definiciones de tipos
├── constants/     # Constantes de la aplicación
└── tests/         # Pruebas
```

## 🐛 Debugging y Troubleshooting

### **Estrategias de Debugging**
1. **Reproduce el problema consistentemente**
2. **Usa logs estratégicos**
3. **Divide y vencerás**
4. **Usa herramientas de debugging**
5. **Lee los mensajes de error completos**

```javascript
// ✅ Bueno - Logging útil
function processUserData(userData) {
  console.log('Processing user data:', { userId: userData.id, action: 'process' });
  
  try {
    const result = complexProcessing(userData);
    console.log('Processing completed successfully:', { userId: userData.id, result });
    return result;
  } catch (error) {
    console.error('Processing failed:', { 
      userId: userData.id, 
      error: error.message,
      stack: error.stack 
    });
    throw error;
  }
}
```

## 🏆 Reglas de Oro del Programador

### **1. Código para Humanos**
- Tu código será leído más veces de las que será escrito
- Escribe código que tu yo de dentro de 6 meses pueda entender

### **2. Fail Fast**
- Detecta errores lo antes posible
- Usa validaciones estrictas
- No ocultes errores

### **3. Refactoriza Constantemente**
- El código es un ser vivo que evoluciona
- Mejora continuamente la calidad
- Boy Scout Rule: "Deja el código mejor de como lo encontraste"

### **4. Automatiza Todo lo Que Puedas**
- Tests automáticos
- Deployment automático
- Linting y formateo automático
- Generación de documentación

### **5. Aprende Continuamente**
- La tecnología cambia constantemente
- Lee código de otros desarrolladores
- Contribuye a proyectos open source
- Mantente actualizado con las mejores prácticas

## 🔄 Proceso de Desarrollo

### **Workflow Recomendado**
1. **Planifica antes de codificar**
2. **Escribe tests primero (TDD)**
3. **Implementa la funcionalidad**
4. **Refactoriza si es necesario**
5. **Documenta los cambios**
6. **Code Review**
7. **Deploy**

### **Code Review Checklist**
- [ ] ¿El código es legible y mantenible?
- [ ] ¿Se siguen las convenciones del proyecto?
- [ ] ¿Hay tests adecuados?
- [ ] ¿Se manejan los errores correctamente?
- [ ] ¿La documentación está actualizada?
- [ ] ¿No hay vulnerabilidades de seguridad?

## 🎓 Recursos para Seguir Aprendiendo

### **Libros Recomendados**
- "Clean Code" by Robert Martin
- "The Pragmatic Programmer" by David Thomas
- "Design Patterns" by Gang of Four
- "Refactoring" by Martin Fowler

### **Prácticas Diarias**
- Resuelve problemas en plataformas como LeetCode, HackerRank
- Contribuye a proyectos open source
- Lee código de proyectos bien estructurados
- Practica code katas
- Participa en comunidades de desarrollo

---

> **Recuerda**: Estas reglas son guías, no leyes absolutas. El contexto y los requisitos específicos pueden requerir excepciones. Lo importante es entender el "por qué" detrás de cada regla y aplicarla conscientemente.

*"El código es poesía para las máquinas, pero debe ser prosa para los humanos"*
