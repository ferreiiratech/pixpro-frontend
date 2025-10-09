import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SplineBackground } from "@/components/spline-background";
import Header from "./header";
import { CardFeature, cardsFeatures } from "./components/card-feature";
import { PricingCard, pricingPlans } from "./components/pricing-card";
import Footer from "@/components/footer.";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <SplineBackground />

      <section className="container mx-auto px-4 py-24 md:py-32 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Processamento de Imagens com IA</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            Transforme imagens em{" "}
            <span
              className="bg-gradient-to-r from-primary via-destructive to-primary bg-clip-text text-transparent animate-gradient-x"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              escala com IA
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Envie, analise e transforme imagens em lote usando modelos avançados
            de IA. Feito para criadores, pesquisadores e empresas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/signup">
                Começar a processar
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#demo">Ver demonstração</Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">10M+</div>
              <div className="text-sm text-muted-foreground">
                Imagens processadas
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">
                Disponibilidade
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">5s</div>
              <div className="text-sm text-muted-foreground">
                Processamento médio
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="container mx-auto px-4 py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Tudo que você precisa para processar imagens
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Recursos poderosos projetados para fluxos de trabalho profissionais
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardsFeatures.map((feature) => (
            <CardFeature key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section id="pricing" className="container mx-auto px-4 py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Preços</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-balance">
            Confira nossos planos de preços acessíveis abaixo e escolha o que
            melhor se adequa a você. Se precisar de um plano personalizado,
            entre em contato.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.title} {...plan} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-24">
        <Card className="p-12 md:p-16 text-center space-y-6 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            Pronto para transformar suas imagens?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Junte-se a milhares de criadores e empresas usando o PixPro para
            processar imagens em escala.
          </p>
          <Button size="lg" className="gap-2" asChild>
            <Link href="/signup">
              Começar gratuitamente
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
