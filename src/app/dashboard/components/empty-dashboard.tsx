"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FolderPlus } from "lucide-react";

export function EmptyDashboard() {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <Card className="max-w-md p-12 text-center" data-tour-id="empty-state">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-primary/10 p-6">
            <FolderPlus className="h-12 w-12 text-primary" />
          </div>
        </div>

        <h2 className="mb-3 text-2xl font-bold">Crie um novo projeto</h2>

        <p className="mb-6 text-muted-foreground">
          Comece criando seu primeiro projeto para organizar e processar suas
          imagens com IA.
        </p>

        <Button
          size="lg"
          className="w-full"
          data-tour-id="create-project-button"
        >
          <FolderPlus className="mr-2 h-5 w-5" />
          Criar Projeto
        </Button>
      </Card>
    </div>
  );
}
