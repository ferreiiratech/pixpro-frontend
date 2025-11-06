"use client";

import { Sidebar } from "../components/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

export default function SettingsPage() {
  const handleRestartTour = () => {
    localStorage.removeItem("pixpro-onboarding-completed");
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-background p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-3xl font-bold">Configurações</h1>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Ajuda e Tutorial</h2>
              <p className="text-muted-foreground mb-4">
                Quer ver o tour de boas-vindas novamente? Clique no botão abaixo
                para revisar as principais funcionalidades da plataforma.
              </p>
              <Button onClick={handleRestartTour} variant="outline">
                <PlayCircle className="mr-2 h-4 w-4" />
                Ver Tutorial Novamente
              </Button>
            </Card>

            <Card className="p-6">
              <p className="text-muted-foreground">
                Outras configurações em desenvolvimento...
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
