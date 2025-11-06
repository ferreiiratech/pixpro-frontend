import { ProjectTheme } from "@/types/project";

export const PROJECT_THEMES: ProjectTheme[] = [
  {
    id: "portrait",
    name: "Retrato humano",
    description:
      "Foco em realismo facial, correção de luz e remoção de imperfeições.",
    icon: "👤",
  },
  {
    id: "product",
    name: "Produto / E-commerce",
    description:
      "Otimização de imagens de produtos, remoção de fundo e ajuste de contraste.",
    icon: "🛍️",
  },
  {
    id: "landscape",
    name: "Cenário / Paisagem",
    description: "Aprimoramento de cores, iluminação e profundidade.",
    icon: "🏞️",
  },
  {
    id: "artistic",
    name: "Design artístico",
    description:
      "Aplicação de estilos visuais, filtros criativos e reinterpretações artísticas.",
    icon: "🎨",
  },
  {
    id: "restoration",
    name: "Melhoria de imagem",
    description:
      "Aumento de resolução, reparo de ruídos e restauração de fotos antigas.",
    icon: "🔧",
  },
  {
    id: "custom",
    name: "Outro",
    description: "Tema personalizado para necessidades específicas.",
    icon: "✨",
  },
];
