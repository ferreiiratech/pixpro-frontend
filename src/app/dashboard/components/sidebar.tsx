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
import { Logo } from "@/components/logo";
import {
  FolderIcon,
  Settings,
  LogOut,
  User,
  CreditCard,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useUserProfileStore } from "@/store/user-profile.store";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const user = useUserProfileStore((state) => state.user);
  const router = useRouter();

  const userInitials = user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() : '??';

  const [projects] = useState<Project[]>([
    { id: "1", name: "Projeto 1", imageCount: 24 },
    { id: "2", name: "Projeto 2", imageCount: 12 },
  ]);

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card">
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
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            data-tour-id="new-project-button"
          >
            <Plus className="h-4 w-4" />
          </Button>
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
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
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
                <AvatarImage src={user?.avatarUrl} alt={user?.firstName + " " + user?.lastName} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col items-start text-left">
                <span className="text-sm font-medium">{user?.firstName} {user?.lastName}</span>
                <span className="text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/billing" className="cursor-pointer">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Plano e Cobrança</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { router.push('/login'); authService.logout(); }} className="cursor-pointer text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
