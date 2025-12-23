"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CreateProjectDialog } from "@/components/create-project-dialog";
import { Logo } from "@/components/logo";
import {
  FolderIcon,
  Settings,
  LogOut,
  User,
  CreditCard,
  Plus,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { projectService } from "@/services/project.service";
import { useUserProfileStore } from "@/store/user-profile.store";

export function Sidebar() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const res = await projectService.getProjects();
      if (!mounted) return;
      if (res.success && Array.isArray(res.data)) {
        const mapped = res.data.map(
          (p) =>
            ({
              id: p.id,
              name: p.name,
              description: p.description || "",
              imageCount: Array.isArray(p.images) ? p.images.length : 0,
            } as Project)
        );

        setProjects(mapped);
        try {
          localStorage.setItem("pixpro-projects", JSON.stringify(mapped));
        } catch {}
      } else {
        try {
          const raw = localStorage.getItem("pixpro-projects") || "[]";
          const parsed = JSON.parse(raw) as unknown;
          if (Array.isArray(parsed)) {
            setProjects(
              parsed.map((sp: any) => ({
                id: sp.id || "",
                name: sp.name || "",
                imageCount: sp.imageCount ?? 0,
                description: sp.description || "",
              }))
            );
          }
        } catch {}
      }
    })();

    const onCustom = (ev: Event) => {
      const custom = ev as CustomEvent;
      const p = custom.detail as StoredProject | null;
      if (p && p.id) {
        setProjects((prev) => {
          if (prev.find((x) => x.id === p.id)) return prev;
          return [
            {
              id: p.id || "",
              name: p.name || "",
              imageCount: p.imageCount ?? 0,
              description: p.description || "",
            },
            ...prev,
          ];
        });
      }
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === "pixpro-projects") {
        try {
          const parsed = JSON.parse(e.newValue || "[]") as unknown;
          if (Array.isArray(parsed)) {
            setProjects(
              parsed.map((p) => {
                const sp = p as StoredProject;
                return {
                  id: sp.id || "",
                  name: sp.name || "",
                  imageCount: sp.imageCount ?? 0,
                  description: sp.description || "",
                } as Project;
              })
            );
          }
        } catch {}
      }
    };

    window.addEventListener("projects:updated", onCustom);
    window.addEventListener("storage", onStorage);

    return () => {
      mounted = false;
      window.removeEventListener("projects:updated", onCustom);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useUserProfileStore((state) => state.user);

  const userInitials = (user?.firstName + " " + user?.lastName)
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const SidebarContent = () => (
    <>
      <div className="border-b p-6" data-tour-id="sidebar-logo">
        <Logo />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div
          className="mb-4 flex items-center justify-between"
          data-tour-id="projects-header"
        >
          <h2 className="text-sm font-semibold text-muted-foreground">
            Projetos
          </h2>
          <CreateProjectDialog>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              data-tour-id="new-project-button"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </CreateProjectDialog>
        </div>

        {projects.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            Nenhum projeto ainda
          </div>
        ) : (
          <div className="space-y-1" data-tour-id="projects-list">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/project/${project.id}`}
                title={project.description || undefined}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                <FolderIcon className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="font-medium">{project.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {project.imageCount} imagens
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="border-t p-4" data-tour-id="user-menu">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-3 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user?.avatarUrl}
                  alt={user?.firstName + " " + user?.lastName}
                />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col items-start text-left">
                <span className="text-sm font-medium">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user?.email
                    ? user.email.length > 25
                      ? user.email.slice(0, 25) + "..."
                      : user.email
                    : ""}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/profile"
                className="cursor-pointer"
                onClick={() => setMobileOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/settings"
                className="cursor-pointer"
                onClick={() => setMobileOpen(false)}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/billing"
                className="cursor-pointer"
                onClick={() => setMobileOpen(false)}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Plano e Cobrança</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                authService.logout();
                router.push("/");
              }}
              className="cursor-pointer text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );

  return (
    <>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-40 md:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col bg-card">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>

      <div className="hidden md:flex h-screen w-64 flex-col border-r bg-card">
        <SidebarContent />
      </div>
    </>
  );
}
