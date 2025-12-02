export const PROJECT_THEMES: ProjectTheme[] = [
  {
    id: "object-detection",
    name: "Detecção de Objetos",
    description:
      "Identificação automática, localização e rotulagem de elementos específicos na cena.",
    icon: "🔍",
  },
  {
    id: "upscaling",
    name: "Fator de Ampliação",
    description:
      "Defina o quanto a imagem deve crescer mantendo a nitidez e restaurando detalhes perdidos.",
    icon: "📈",
    options: [
      {
        id: "2x",
        name: "2x (Alta Definição)",
        description: "Dobra o tamanho original. Ideal para telas HD.",
        value: "2",
      },
      {
        id: "4x",
        name: "4x (Ultra Definição)",
        description:
          "Quadruplica o tamanho. Ideal para impressões grandes ou recortes.",
        value: "4",
      },
    ],
  },
  {
    id: "artistic-filter",
    name: "Filtro Artístico",
    description:
      "Aplique a estética e as texturas de obras famosas para reinterpretar sua imagem original.",
    icon: "🖼️",
    options: [
      {
        id: "candy",
        name: "Candy",
        description: "Cores vibrantes e traços suaves (Pop Art).",
        value: "candy",
      },
      {
        id: "mosaic",
        name: "Mosaic",
        description: "Padrão geométrico de vitrais e azulejos.",
        value: "mosaic",
      },
      {
        id: "rain-princess",
        name: "Rain Princess",
        description: "Traços coloridos e impressionistas.",
        value: "rain-princess",
      },
      {
        id: "udnie",
        name: "Udnie",
        description: "Estilo abstrato com formas curvas e tons de bronze.",
        value: "udnie",
      },
    ],
  },
  {
    id: "custom",
    name: "Custom",
    description: "Tema personalizado para necessidades específicas.",
    icon: "✨",
  },
];
