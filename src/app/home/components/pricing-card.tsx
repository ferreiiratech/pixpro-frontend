import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PricingCard({
  title,
  description,
  price,
  isCustom = false,
  priceDescription,
  buttonText,
  buttonHref,
  buttonVariant = "outline",
  isPopular = false,
  features,
  featuresTitle,
}: PricingCardProps) {
  const cardClassName = isPopular
    ? "p-8 space-y-6 bg-muted/50 backdrop-blur border-primary/50 flex flex-col relative"
    : "p-8 space-y-6 bg-card/50 backdrop-blur border-border/50 flex flex-col";

  return (
    <Card className={cardClassName}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
          Popular
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      <div className="space-y-2">
        {isCustom ? (
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold">Personalizado</span>
          </div>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-2xl">R$</span>
            <span className="text-5xl font-bold">{price}</span>
          </div>
        )}
        <p className="text-sm text-muted-foreground">{priceDescription}</p>
      </div>

      <Button
        variant={buttonVariant}
        className={`w-full ${
          buttonVariant === "outline" ? "bg-transparent" : ""
        }`}
        asChild
      >
        <Link href={buttonHref}>{buttonText}</Link>
      </Button>

      <div className="space-y-4 pt-4 border-t border-border/50">
        <h4 className="font-semibold">{featuresTitle}</h4>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <svg
                className="h-5 w-5 text-primary shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export const pricingPlans = [
  {
    title: "Gratuito",
    description: "Para uso pessoal apenas com recursos e suporte limitados",
    price: 0,
    priceDescription: "Inclui 1 usuário.",
    buttonText: "Começar",
    buttonHref: "/signup",
    buttonVariant: "outline" as const,
    isPopular: false,
    featuresTitle: "Recursos",
    features: [
      "Colaboração ao Vivo",
      "1 GB de Armazenamento",
      "2 Projetos",
      "Modelos de IA Básicos",
    ],
  },
  {
    title: "Pro",
    description: "Para pequenas empresas com todos os recursos e suporte",
    price: 149,
    priceDescription: "Por usuário, por mês.",
    buttonText: "Assinar",
    buttonHref: "/signup",
    buttonVariant: "default" as const,
    isPopular: true,
    featuresTitle: "Tudo do Gratuito, e:",
    features: [
      "2 Membros da Equipe",
      "10 GB de Armazenamento",
      "10 Projetos",
      "Modelos de IA Avançados",
      "Suporte Prioritário",
    ],
  },
  {
    title: "Premium",
    description: "Para equipes e organizações com recursos avançados e...",
    price: 299,
    priceDescription: "Por usuário, por mês.",
    buttonText: "Assinar",
    buttonHref: "/signup",
    buttonVariant: "outline" as const,
    isPopular: false,
    featuresTitle: "Tudo do Pro, e:",
    features: [
      "5 Membros da Equipe",
      "50 GB de Armazenamento",
      "50 Projetos",
      "Modelos de IA Personalizados",
      "Acesso à API",
    ],
  },
  {
    title: "Enterprise",
    description:
      "Para grandes empresas com recursos e suporte personalizados...",
    isCustom: true,
    priceDescription: "Entre em contato para preços.",
    buttonText: "Falar com vendas",
    buttonHref: "/contact",
    buttonVariant: "outline" as const,
    isPopular: false,
    featuresTitle: "Tudo do Premium, e:",
    features: [
      "10+ Membros da Equipe",
      "100+ GB de Armazenamento",
      "Projetos Ilimitados",
      "Suporte Dedicado",
      "Garantia de SLA",
    ],
  },
];
