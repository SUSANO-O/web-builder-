// Type definitions for the template builder application

export type StepId = 'description' | 'color' | 'typography' | 'logo' | 'layout' | 'results';

export interface TemplateData {
  description: string;
  primaryColor: string;
  typography: string;
  logo?: File | null;
  logoPreview?: string;
  layout?: string;
}

export interface TemplateSelections {
  description: string;
  mainColor: string;
  typography: string;
  logo?: File | null;
  logoPreview?: string | null; // Para almacenar Data URL de la vista previa del logo
  baseDesign: string; // ID del diseño base elegido, ej: 'design1', 'design2'
  layout?: string; // Layout selection
  primaryColor?: string; // Primary color for compatibility
}

export interface GeneratedPrompt {
  id: string; // Identificador único para el prompt
  text: string; // El contenido del prompt
}

export interface GeneratedCode {
  html: string;
  css: string;
  js: string;
}

export interface GeneratedTemplate {
  html: string;
  css: string;
  js: string;
}

export interface GenerationOutput {
  prompts: GeneratedPrompt[];
  template?: GeneratedCode; // La plantilla de código puede ser opcional
}

export interface StepProps {
  data?: TemplateData;
  updateData?: (data: Partial<TemplateData>) => void;
  onNext: () => void;
  onPrevious?: () => void; // Opcional, ya que el primer paso no tiene "anterior"
  onBack?: () => void;
  isLastStep?: boolean;
}
