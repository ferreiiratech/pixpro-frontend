import { Sidebar } from "../components/sidebar";
import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-background p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-3xl font-bold">Configurações</h1>
          <Card className="p-6">
            <p className="text-muted-foreground">
              Configurações em desenvolvimento...
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
