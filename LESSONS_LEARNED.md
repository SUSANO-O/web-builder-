# 🔧 Lecciones Aprendidas: Errores Corregidos y Reglas Específicas

> **Basado en los errores reales que acabamos de corregir en el proyecto web-builder**

## 📋 Resumen de Errores Corregidos

Durante el proceso de debugging, resolvimos múltiples errores de ESLint, TypeScript y Next.js que nos enseñaron lecciones valiosas:

---

## 🚫 ERROR 1: Configuración Obsoleta en Next.js

### **Problema:**
```typescript
// ❌ next.config.ts - INCORRECTO
const nextConfig = {
  output: 'standalone',
  swcMinify: true, // ⚠️ Deprecated en Next.js 15+
};
```

### **Solución:**
```typescript
// ✅ next.config.ts - CORRECTO
const nextConfig = {
  output: 'standalone',
  // swcMinify se removió - ahora es por defecto
};
```

### **Regla Aprendida:**
🔥 **REGLA**: **Mantén las configuraciones actualizadas**
- Revisa regularmente las notas de release de tus dependencias
- Elimina opciones deprecated antes de que causen errores
- Usa herramientas como `npm audit` para detectar dependencias obsoletas

---

## 🚫 ERROR 2: Importaciones No Utilizadas

### **Problema:**
```typescript
// ❌ INCORRECTO
import { TemplateSelections, GeneratedPrompt, GeneratedCode, GenerationOutput } from '@/types';
// Solo usamos TemplateSelections y GeneratedCode
```

### **Solución:**
```typescript
// ✅ CORRECTO
import { TemplateSelections, GeneratedCode } from '@/types';
```

### **Regla Aprendida:**
🔥 **REGLA**: **Importa solo lo que necesitas**
- Usa auto-imports inteligentes en tu editor
- Configura ESLint para detectar importaciones no utilizadas
- Haz limpieza regular de imports con herramientas como `organize-imports`

---

## 🚫 ERROR 3: Uso de Tipos `any` - Antiespecificidad

### **Problema:**
```typescript
// ❌ INCORRECTO
} catch (error: any) {
  console.error('Error:', error);
  setError(error.message || 'Error desconocido');
}

const handleColorChange = (color: any) => {
  setSelectedColor(color.hex);
};
```

### **Solución:**
```typescript
// ✅ CORRECTO
} catch (error: unknown) {
  console.error('Error:', error);
  setError(error instanceof Error ? error.message : 'Error desconocido');
}

const handleColorChange = (color: { hex: string }) => {
  setSelectedColor(color.hex);
};
```

### **Regla Aprendida:**
🔥 **REGLA**: **Evita `any` - Usa tipos específicos**
- Usa `unknown` en lugar de `any` cuando no sepas el tipo
- Crea interfaces específicas para objetos complejos
- Usa type guards para validar tipos en runtime

---

## 🚫 ERROR 4: Entidades HTML No Escapadas

### **Problema:**
```jsx
// ❌ INCORRECTO
<p>Include details about the purpose, target audience, and key features you'd like to have.</p>
<p>Select a prompt and click "Generate Preview" to see a template preview</p>
```

### **Solución:**
```jsx
// ✅ CORRECTO
<p>Include details about the purpose, target audience, and key features you&apos;d like to have.</p>
<p>Select a prompt and click &quot;Generate Preview&quot; to see a template preview</p>
```

### **Regla Aprendida:**
🔥 **REGLA**: **Escapa caracteres especiales en JSX**
- `'` → `&apos;`
- `"` → `&quot;`
- `<` → `&lt;`
- `>` → `&gt;`
- `&` → `&amp;`

---

## 🚫 ERROR 5: Uso de `<img>` en lugar de `<Image>` de Next.js

### **Problema:**
```jsx
// ❌ INCORRECTO
<img 
  src={logoPreview} 
  alt="Logo Preview" 
  className="max-h-40 mx-auto" 
/>
```

### **Solución:**
```jsx
// ✅ CORRECTO
import Image from 'next/image';

<Image 
  src={logoPreview} 
  alt="Logo Preview" 
  width={160}
  height={160}
  className="max-h-40 mx-auto object-contain" 
/>
```

### **Regla Aprendida:**
🔥 **REGLA**: **Usa componentes optimizados del framework**
- Next.js `<Image>` para optimización automática
- Siempre define `width` y `height` explícitamente
- Usa `object-contain` o `object-cover` para control de aspecto

---

## 🚫 ERROR 6: Propiedades Indefinidas sin Validación

### **Problema:**
```typescript
// ❌ INCORRECTO
export default function DescribePage({ data, updateData, onNext }: StepProps) {
  const [description, setDescription] = useState(data.description); // ⚠️ data puede ser undefined
  
  updateData({ description }); // ⚠️ updateData puede ser undefined
}
```

### **Solución:**
```typescript
// ✅ CORRECTO
export default function DescribePage({ data, updateData, onNext }: StepProps) {
  const [description, setDescription] = useState(data?.description || '');
  
  updateData?.({ description });
}
```

### **Regla Aprendida:**
🔥 **REGLA**: **Siempre valida props opcionales**
- Usa optional chaining (`?.`) para propiedades que pueden ser undefined
- Proporciona valores por defecto sensatos
- Considera hacer las props requeridas si siempre deben existir

---

## 🚫 ERROR 7: Interfaces Incompletas

### **Problema:**
```typescript
// ❌ INCORRECTO - Faltaban propiedades
export interface StepProps {
  onNext: () => void;
  onPrevious?: () => void;
  // ⚠️ Faltaban: data, updateData, onBack, isLastStep
}
```

### **Solución:**
```typescript
// ✅ CORRECTO
export interface StepProps {
  data?: TemplateData;
  updateData?: (data: Partial<TemplateData>) => void;
  onNext: () => void;
  onPrevious?: () => void;
  onBack?: () => void;
  isLastStep?: boolean;
}
```

### **Regla Aprendida:**
🔥 **REGLA**: **Define interfaces completas desde el principio**
- Mapea todos los props que realmente necesitas
- Marca como opcionales (`?`) solo los que realmente lo son
- Usa `Partial<T>` para updates parciales

---

## 🚫 ERROR 8: Conversiones de Tipos Incorrectas

### **Problema:**
```typescript
// ❌ INCORRECTO
input.onchange = (e) => handleFileSelect(e as React.ChangeEvent<HTMLInputElement>);
// ⚠️ Error: Type 'Event' no se puede convertir a 'ChangeEvent<HTMLInputElement>'
```

### **Solución:**
```typescript
// ✅ CORRECTO
input.onchange = (e) => handleFileSelect(e as unknown as React.ChangeEvent<HTMLInputElement>);
```

### **Regla Aprendida:**
🔥 **REGLA**: **Usa conversiones de tipos seguras**
- Usa `as unknown as TargetType` para conversiones complejas
- Siempre documenta por qué necesitas la conversión
- Considera crear type guards en lugar de conversiones forzadas

---

## 🚫 ERROR 9: Acceso a Índices sin Validación de Tipos

### **Problema:**
```typescript
// ❌ INCORRECTO
const CurrentStepComponent = stepComponents[steps[currentStep]];
// ⚠️ Error: Expression of type 'StepId' can't be used to index type
```

### **Solución:**
```typescript
// ✅ CORRECTO
const stepId = steps[currentStep];
const CurrentStepComponent = stepComponents[stepId as keyof typeof stepComponents];
```

### **Regla Aprendida:**
🔥 **REGLA**: **Usa type assertions específicas para índices**
- Usa `keyof typeof` para acceso seguro a objetos
- Considera usar `Map<K, V>` en lugar de objetos para mappings complejos
- Siempre valida que el índice existe antes de usarlo

---

## 🚫 ERROR 10: Tipos Faltantes en Definiciones

### **Problema:**
```typescript
// ❌ INCORRECTO - Tipos faltantes
// Module '"@/types"' has no exported member 'GeneratedTemplate'
// Module '"@/types"' has no exported member 'TemplateData'
```

### **Solución:**
```typescript
// ✅ CORRECTO - Agregamos los tipos faltantes
export interface GeneratedTemplate {
  html: string;
  css: string;
  js: string;
}

export interface TemplateData {
  description: string;
  primaryColor: string;
  typography: string;
  logo?: File | null;
  logoPreview?: string;
  layout?: string;
}
```

### **Regla Aprendida:**
🔥 **REGLA**: **Mantén un archivo de tipos centralizado y completo**
- Exporta todos los tipos que uses en múltiples archivos
- Usa naming conventions consistentes
- Documenta tipos complejos con comentarios

---

## 🛠️ Herramientas y Configuraciones Recomendadas

### **1. ESLint Configuration**
```json
{
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "react/no-unescaped-entities": "error",
    "@next/next/no-img-element": "warn"
  }
}
```

### **2. TypeScript Strict Mode**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### **3. Pre-commit Hooks**
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "**/*.{ts,tsx,js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

---

## 🏆 Reglas de Oro Específicas del Proyecto

### **1. 🔍 Siempre Revisa las Dependencias**
```bash
# Mantén dependencias actualizadas
npm audit
npm outdated
npm update
```

### **2. 🧪 Configura Linting Estricto**
```bash
# Ejecuta linting antes de cada commit
npm run lint
npm run type-check
```

### **3. 🛡️ Usa TypeScript Strict Mode**
- Activa todas las opciones strict de TypeScript
- No uses `any` - usa `unknown` o tipos específicos
- Valida todas las props opcionales

### **4. 📦 Optimiza las Importaciones**
- Usa auto-imports inteligentes
- Limpia imports no utilizados regularmente
- Agrupa imports por origen (externos, internos, relativos)

### **5. 🎨 Usa Componentes Optimizados**
- Next.js `<Image>` en lugar de `<img>`
- Next.js `<Link>` en lugar de `<a>`
- Componentes del framework siempre que sea posible

---

## 🚀 Workflow de Debugging Efectivo

### **Paso 1: Identifica el Error**
```bash
npm run build  # Ejecuta el build para ver todos los errores
```

### **Paso 2: Clasifica el Error**
- **ESLint**: Problemas de código style/quality
- **TypeScript**: Problemas de tipos
- **Next.js**: Problemas de configuración o uso del framework

### **Paso 3: Corrige Sistemáticamente**
1. Corrige errores de configuración primero
2. Luego problemas de tipos
3. Finalmente problemas de style/quality

### **Paso 4: Verifica la Solución**
```bash
npm run build   # Debe pasar sin errores
npm run dev     # Debe funcionar en desarrollo
```

---

## 📚 Recursos Útiles

### **Documentación de Referencia**
- [Next.js ESLint Config](https://nextjs.org/docs/app/api-reference/config/eslint)
- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)
- [React JSX Entities](https://react.dev/reference/react-dom/components/common#applying-html-entities)

### **Herramientas de Debugging**
- VS Code: TypeScript Hero (auto-organize imports)
- ESLint Extension con auto-fix
- Prettier para formateo automático
- TypeScript Error Translator (para errores más claros)

---

> **💡 Recuerda**: Cada error que corregimos nos enseñó algo valioso. La clave es documentar estas lecciones y crear procesos que eviten repetir los mismos errores.

*"Los errores no son fracasos, son oportunidades de aprendizaje disfrazadas"*
