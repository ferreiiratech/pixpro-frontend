import { Card } from "@/components/ui/card";
import {
  Sparkles,
  Zap,
  Shield,
  ImageIcon,
  Layers,
  TrendingUp,
} from "lucide-react";

export function CardFeature({
  title,
  description,
  icon: Icon,
}: CardFeatureProps) {
  return (
    <Card className="p-6 space-y-4 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </Card>
  );
}

export const cardsFeatures = [
  {
    title: "Upload em Lote",
    description:
      "Arraste e solte centenas de imagens de uma vez. Organize por pastas, tags e categorias.",
    icon: ImageIcon,
  },
  {
    title: "Modelos de IA",
    description:
      "Escolha entre aprimoramento, detecção de objetos, efeitos artísticos e mais modelos avançados.",
    icon: Sparkles,
  },
  {
    title: "Atualizações em Tempo Real",
    description:
      "Acompanhe o status do processamento ao vivo com notificações WebSocket e indicadores de progresso.",
    icon: Zap,
  },
  {
    title: "Gerenciamento de Projetos",
    description:
      "Organize imagens em projetos. Agrupe por tipo de processamento, data ou critérios personalizados.",
    icon: Layers,
  },
  {
    title: "Compare Resultados",
    description:
      "Slider interativo antes/depois. Baixe, compartilhe ou salve resultados na sua biblioteca.",
    icon: TrendingUp,
  },
  {
    title: "Seguro e Rápido",
    description:
      "Segurança de nível empresarial com entrega via CDN. Suas imagens são criptografadas e protegidas.",
    icon: Shield,
  },
];
