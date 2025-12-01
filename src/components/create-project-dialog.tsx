"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { PROJECT_THEMES } from "@/config/project-themes";
import { CreateProjectData } from "@/types/project";
import { z } from "zod";

const createProjectSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres"),
  description: z
    .string()
    .max(500, "A descrição deve ter no máximo 500 caracteres")
    .optional(),
  theme: z.string().min(1, "Selecione um tema para o projeto"),
});

interface CreateProjectDialogProps {
  children: React.ReactNode;
}

export function CreateProjectDialog({ children }: CreateProjectDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateProjectData>({
    name: "",
    description: "",
    theme: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    theme?: string;
  }>({});

  const selectedTheme = PROJECT_THEMES.find((t) => t.id === formData.theme);

  const handleThemeChange = (themeId: string) => {
    const theme = PROJECT_THEMES.find((t) => t.id === themeId);
    if (theme) {
      setFormData((prev) => ({
        ...prev,
        theme: themeId,
        name: prev.name || theme.name,
        description: prev.description || theme.description,
      }));
      setErrors((prev) => ({ ...prev, theme: undefined }));
    }
  };

  const validateField = (field: keyof CreateProjectData, value: string) => {
    try {
      const fieldSchema = createProjectSchema.shape[field];
      if (fieldSchema) {
        fieldSchema.parse(value);
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.issues[0].message }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validatedData = createProjectSchema.parse(formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const projectId = `proj_${Date.now()}`;
      try {
        const existing =
          typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("pixpro-projects") || "[]")
            : [];

        const newProject = {
          id: projectId,
          name: validatedData.name,
          description: validatedData.description || "",
          theme: validatedData.theme,
          imageCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        existing.unshift(newProject);
        if (typeof window !== "undefined") {
          localStorage.setItem("pixpro-projects", JSON.stringify(existing));
          window.dispatchEvent(
            new CustomEvent("projects:updated", { detail: newProject })
          );
        }
      } catch (err) {
        console.warn("Could not persist project to localStorage", err);
      }

      toast.success("Projeto criado com sucesso!", {
        description: `${validatedData.name} está pronto para receber imagens.`,
      });

      setOpen(false);

      setFormData({ name: "", description: "", theme: "" });
      setErrors({});

      router.push(`/dashboard/project/${projectId}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(fieldErrors);
        toast.error("Verifique os campos do formulário", {
          description: "Alguns campos contêm erros ou estão vazios.",
        });
      } else {
        toast.error("Erro ao criar projeto", {
          description: "Tente novamente em alguns instantes.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] left-[50%] md:left-[55%]">
        <DialogHeader>
          <DialogTitle>Criar novo projeto</DialogTitle>
          <DialogDescription>
            Configure seu projeto de edição de imagens com IA. Escolha um tema
            para preencher automaticamente os campos.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="theme">
                Tema do projeto <span className="text-destructive">*</span>
              </Label>
              {selectedTheme ? (
                <div className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">{selectedTheme.icon}</span>
                    <div>
                      <div className="font-medium">{selectedTheme.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {selectedTheme.description}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFormData((p) => ({ ...p, theme: "" }))}
                    >
                      Alterar
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Select
                    value={formData.theme}
                    onValueChange={handleThemeChange}
                  >
                    <SelectTrigger
                      id="theme"
                      className={errors.theme ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Selecione um tema..." />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECT_THEMES.map((theme) => (
                        <SelectItem key={theme.id} value={theme.id}>
                          <div className="flex items-start gap-2">
                            <span className="text-lg">{theme.icon}</span>
                            <div>
                              <div className="font-medium">{theme.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {theme.description}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.theme && (
                    <p className="text-sm text-destructive">{errors.theme}</p>
                  )}
                </>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">
                Nome do projeto <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Ex: Retrato artístico, Catálogo de produtos..."
                value={formData.name}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, name: e.target.value }));
                  validateField("name", e.target.value);
                }}
                className={errors.name ? "border-destructive" : ""}
                maxLength={50}
              />
              {errors.name ? (
                <p className="text-sm text-destructive">{errors.name}</p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {formData.name.length}/50 caracteres
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição (opcional)</Label>
              <Textarea
                id="description"
                placeholder="Detalhe o objetivo da edição, estilo desejado ou requisitos específicos..."
                value={formData.description}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                  validateField("description", e.target.value);
                }}
                className={errors.description ? "border-destructive" : ""}
                rows={4}
                maxLength={500}
              />
              {errors.description ? (
                <p className="text-sm text-destructive">{errors.description}</p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {formData.description?.length || 0}/500 caracteres
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando...
                </>
              ) : (
                "Criar projeto"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
