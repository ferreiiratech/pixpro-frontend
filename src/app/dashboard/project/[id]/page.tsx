"use client";

import { Sidebar } from "../../components/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, ImageIcon, Sparkles } from "lucide-react";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-background p-4 md:p-8 pt-20 md:pt-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Painel de Edição
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              ID do Projeto: {params.id}
            </p>
          </div>

          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6 md:mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <ImageIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Imagens</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <Sparkles className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Processadas</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Upload className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Pendentes</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 md:p-12">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-primary/10 p-4 md:p-6">
                  <Upload className="h-8 w-8 md:h-12 md:w-12 text-primary" />
                </div>
              </div>

              <h2 className="text-xl md:text-2xl font-bold mb-3">
                Envie suas primeiras imagens
              </h2>

              <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm md:text-base">
                Arraste e solte suas imagens aqui ou clique no botão abaixo para
                começar a aplicar modelos de IA.
              </p>

              <Button size="lg" className="w-full sm:w-auto">
                <Upload className="mr-2 h-5 w-5" />
                Selecionar Imagens
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
