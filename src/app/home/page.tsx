import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import {
  Sparkles,
  Zap,
  Shield,
  ArrowRight,
  ImageIcon,
  Layers,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { SplineBackground } from "@/components/spline-background";
import Header from "./header";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <SplineBackground />

      {/* Hero Section */}
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

          {/* Stats */}
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

      {/* Features Grid */}
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
          <Card className="p-6 space-y-4 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <ImageIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Upload em Lote</h3>
            <p className="text-muted-foreground leading-relaxed">
              Arraste e solte centenas de imagens de uma vez. Organize por
              pastas, tags e categorias.
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">Modelos de IA</h3>
            <p className="text-muted-foreground leading-relaxed">
              Escolha entre aprimoramento, detecção de objetos, efeitos
              artísticos e mais modelos avançados.
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">
              Atualizações em Tempo Real
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Acompanhe o status do processamento ao vivo com notificações
              WebSocket e indicadores de progresso.
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Layers className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">Gerenciamento de Projetos</h3>
            <p className="text-muted-foreground leading-relaxed">
              Organize imagens em projetos. Agrupe por tipo de processamento,
              data ou critérios personalizados.
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Compare Resultados</h3>
            <p className="text-muted-foreground leading-relaxed">
              Slider interativo antes/depois. Baixe, compartilhe ou salve
              resultados na sua biblioteca.
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">Seguro e Rápido</h3>
            <p className="text-muted-foreground leading-relaxed">
              Segurança de nível empresarial com entrega via CDN. Suas imagens
              são criptografadas e protegidas.
            </p>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
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
          {/* Free Plan */}
          <Card className="p-8 space-y-6 bg-card/50 backdrop-blur border-border/50 flex flex-col">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Gratuito</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Para uso pessoal apenas com recursos e suporte limitados
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl">R$</span>
                <span className="text-5xl font-bold">0</span>
              </div>
              <p className="text-sm text-muted-foreground">Inclui 1 usuário.</p>
            </div>

            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/signup">Começar</Link>
            </Button>

            <div className="space-y-4 pt-4 border-t border-border/50">
              <h4 className="font-semibold">Recursos</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
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
                  <span>Colaboração ao Vivo</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
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
                  <span>1 GB de Armazenamento</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
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
                  <span>2 Projetos</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
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
                  <span>Modelos de IA Básicos</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Pro Plan - Featured */}
          <Card className="p-8 space-y-6 bg-muted/50 backdrop-blur border-primary/50 flex flex-col relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
              Popular
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Pro</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Para pequenas empresas com todos os recursos e suporte
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl">R$</span>
                <span className="text-5xl font-bold">149</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Por usuário, por mês.
              </p>
            </div>

            <Button className="w-full" asChild>
              <Link href="/signup">Assinar</Link>
            </Button>

            <div className="space-y-4 pt-4 border-t border-border/50">
              <h4 className="font-semibold">Tudo do Gratuito, e:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
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
                  <span>2 Membros da Equipe</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
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
                  <span>10 GB de Armazenamento</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
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
                  <span>10 Projetos</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
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
                  <span>Modelos de IA Avançados</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
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
                  <span>Suporte Prioritário</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Premium Plan */}
          <Card className="p-8 space-y-6 bg-card/50 backdrop-blur border-border/50 flex flex-col">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Premium</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Para equipes e organizações com recursos avançados e...
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl">R$</span>
                <span className="text-5xl font-bold">299</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Por usuário, por mês.
              </p>
            </div>

            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/signup">Assinar</Link>
            </Button>

            <div className="space-y-4 pt-4 border-t border-border/50">
              <h4 className="font-semibold">Tudo do Pro, e:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
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
                  <span>5 Membros da Equipe</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
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
                  <span>50 GB de Armazenamento</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
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
                  <span>50 Projetos</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
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
                  <span>Modelos de IA Personalizados</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
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
                  <span>Acesso à API</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Enterprise Plan */}
          <Card className="p-8 space-y-6 bg-card/50 backdrop-blur border-border/50 flex flex-col">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Enterprise</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Para grandes empresas com recursos e suporte personalizados...
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">Personalizado</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Entre em contato para preços.
              </p>
            </div>

            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/contact">Falar com vendas</Link>
            </Button>

            <div className="space-y-4 pt-4 border-t border-border/50">
              <h4 className="font-semibold">Tudo do Premium, e:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
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
                  <span>10+ Membros da Equipe</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
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
                  <span>100+ GB de Armazenamento</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
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
                  <span>Projetos Ilimitados</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
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
                  <span>Suporte Dedicado</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
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
                  <span>Garantia de SLA</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className="border-t border-border/40 mt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Logo />
              <p className="text-sm text-muted-foreground">
                Plataforma de processamento de imagens com IA para
                profissionais.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#features"
                    className="hover:text-foreground transition-colors"
                  >
                    Recursos
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="hover:text-foreground transition-colors"
                  >
                    Preços
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Carreiras
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Termos
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Segurança
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 mt-12 pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} PixPro. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
