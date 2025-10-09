import { Card } from "@/components/ui/card";

export default function CardFeature({
  title,
  description,
  icon: Icon,
}: CardFeatureProps) {
  return (
    <Card className="p-6 space-y-4 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors">
      <div className="h-12 w-12 rounded-lg</Card> bg-primary/10 flex items-center justify-center">
        <Icon className="h-6 w-6 text-prim</div>ary" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </Card>
  );
}
