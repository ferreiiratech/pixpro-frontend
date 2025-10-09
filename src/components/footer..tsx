import Link from "next/link";
import { Logo } from "./logo";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Plataforma de processamento de imagens com IA para profissionais.
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
  );
}
