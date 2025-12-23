"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { publicEnv } from "@/env";
import { authService } from "@/services/auth.service";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      if (password !== confirmPassword) {
        throw new Error("As senhas não coincidem");
      }

      if (password.length < 8) {
        throw new Error("A senha deve ter pelo menos 8 caracteres");
      }

      if (!firstName) {
        throw new Error("O nome é obrigatório");
      }

      if (!lastName) {
        throw new Error("O sobrenome é obrigatório");
      }

      const result = await authService.register({
        firstName,
        lastName,
        email,
        password,
      });

      if (!result.success) {
        throw new Error(result.message || "Erro ao criar conta");
      }

      toast.success("Conta criada com sucesso! Agora, faça login.");

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro inesperado";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Preencha o formulário abaixo para criar sua conta
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="firstName">Nome</FieldLabel>
            <Input
              id="firstName"
              type="text"
              placeholder="João"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="lastName">Sobrenome</FieldLabel>
            <Input
              id="lastName"
              type="text"
              placeholder="Silva"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="exemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FieldDescription>
            Usaremos este e-mail para entrar em contato. Não compartilharemos
            seu e-mail com terceiros.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FieldDescription>Deve ter pelo menos 8 caracteres.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirmar Senha</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <FieldDescription>Por favor, confirme sua senha.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? "Criando conta..." : "Criar Conta"}
          </Button>
        </Field>
        <FieldSeparator>Ou continue com</FieldSeparator>
        <Field>
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              window.open(
                `${publicEnv.NEXT_PUBLIC_API_URL}/auth/google`,
                "googleAuth",
                "width=500,height=600,scrollbars=yes,resizable=yes"
              );
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-4 w-4"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Cadastrar-se com Google
          </Button>
          <FieldDescription className="px-6 text-center">
            Já tem uma conta?{" "}
            <a href="/login" className="underline underline-offset-4">
              Entrar
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
