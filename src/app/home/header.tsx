import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Recursos
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Preços
          </Link>
          <Link
            href="#docs"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Documentação
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Entrar</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Começar</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
