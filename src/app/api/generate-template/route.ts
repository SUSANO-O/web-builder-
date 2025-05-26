import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { TemplateSelections, GeneratedPrompt, GeneratedCode, GenerationOutput } from '@/types';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash-latest"; // Trying another model with -latest suffix
const API_KEY = "AIzaSyAP9JEBq0wi0yxXHdEmFAsmr7HI92au-O4";

// Configuración optimizada para generación de código
const generationConfigDefaults = {
    temperature: 0.4, // Más bajo para código más consistente
    topP: 0.8,
    topK: 32,
    maxOutputTokens: 16384, // Aumentado para código más completo
};

const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

async function generateWebPage(
  selections: TemplateSelections,
  genAIInstance: GoogleGenerativeAI
): Promise<GeneratedCode> {
  const model = genAIInstance.getGenerativeModel({ 
    model: MODEL_NAME,
    safetySettings,
    generationConfig: {
      ...generationConfigDefaults,
      responseMimeType: "application/json",
    }
  });

  const { description, mainColor, typography, baseDesign, logoPreview } = selections;
  const primaryFontFamily = typography.split(',')[0].replace(/['"]/g, '') || 'sans-serif';
  
  const prompt = `
    Genera una landing page moderna y responsiva con los siguientes requisitos:
    - Descripción: "${description}"
    - Color principal: ${mainColor}
    - Tipografía: "${primaryFontFamily}"
    - Estilo de diseño: "${baseDesign}"
    ${logoPreview ? `- Logo: ${logoPreview}` : ''}

    Requisitos técnicos:
    1. HTML semántico y accesible
    2. CSS moderno con variables CSS y diseño responsivo
    3. JavaScript mínimo para interactividad esencial
    4. Optimización para rendimiento y SEO
    5. Soporte para móviles y tablets

    Devuelve el código en formato JSON con las claves "html", "css" y "js".
    El código debe ser completo y funcional.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const code = JSON.parse(response.text()) as GeneratedCode;

    if (!code.html || !code.css || !code.js) {
      throw new Error('Respuesta incompleta del modelo');
    }

    return code;
  } catch (error: any) {
    console.error('Error generando código:', error);
    return {
      html: `<div class="error">Error generando la página: ${error.message}</div>`,
      css: '',
      js: ''
    };
  }
}

export async function POST(request: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json(
      { error: 'API key no configurada' },
      { status: 500 }
    );
  }

  try {
    const selections = await request.json() as TemplateSelections;
    
    // Validación de datos requeridos
    if (!selections?.description || !selections?.mainColor || !selections?.typography || !selections?.baseDesign) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const code = await generateWebPage(selections, genAI);

    return NextResponse.json({ template: code });

  } catch (error: any) {
    console.error('Error en generate-template:', error);
    return NextResponse.json(
      { error: `Error del servidor: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Este endpoint solo acepta POST' },
    { status: 405, headers: { 'Allow': 'POST' } }
  );
}