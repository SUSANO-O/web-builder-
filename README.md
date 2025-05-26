# Web Template Builder

A Next.js application that allows users to build web templates through a guided, step-by-step interface. Users can describe their website, select colors, fonts, upload a logo, and choose a layout. The application then generates AI prompts that can be used to create the actual code for the website.

## Features

- Multi-step interface with intuitive navigation
- Interactive color selector
- Typography previews
- Logo upload capability
- Layout selection with visual previews
- AI prompt generation based on user selections
- Template code preview and download functionality

## Tech Stack

- Next.js 15+
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- React Color for color selection
- Mantine Dropzone for file uploads
- JSZip for generating downloadable code archives
- React Syntax Highlighter for code displaying

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/web-template-builder.git
cd web-template-builder
```

2. Install dependencies:
```
npm install
# or
yarn install
```

3. Run the development server:
```
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page component
├── components/
│   ├── steps/            # Step components for the wizard
│   │   ├── DescribePage.tsx
│   │   ├── SelectColor.tsx
│   │   ├── SelectFont.tsx
│   │   ├── UploadLogo.tsx
│   │   ├── ChooseLayout.tsx
│   │   └── ResultsStep.tsx
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── StepIndicator.tsx
│   └── Wizard.tsx        # Main wizard component
├── context/
│   └── TemplateContext.tsx  # Context for managing wizard state
├── types/
│   └── index.ts          # TypeScript type definitions
└── utils/
    └── promptGenerator.ts # Utility for generating AI prompts
```

## Deployment

This project is configured for easy deployment to Vercel. Just connect your GitHub repository to Vercel and deploy.

## Extending the Project

### Adding New Steps

1. Create a new component in the `src/components/steps` directory
2. Add the new step ID to the `StepId` type in `src/types/index.ts`
3. Add the step to the `steps` array in `TemplateContext.tsx`
4. Add the component to the `stepComponents` mapping in `Wizard.tsx`

### Customizing Prompts

Modify the `promptGenerator.ts` file to change how prompts are generated based on user selections.

## License

MIT
