"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Film, Ticket, Mail, Lock, Sparkles } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Redirigir a la cartelera después del login exitoso
      router.push("/cartelera");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 relative", className)} {...props}>
      {/* Efectos de luz de proyector */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-amber-500/20 via-red-600/10 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-amber-500/20 via-red-600/10 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      
      <Card className="relative backdrop-blur-sm bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-black/95 border-2 border-amber-500/30 shadow-2xl shadow-amber-500/20 overflow-hidden">
        {/* Efecto de cortina superior */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        
        {/* Patrón decorativo superior */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-30">
          <Film className="w-4 h-4 text-amber-400" />
          <Film className="w-4 h-4 text-amber-400" />
          <Film className="w-4 h-4 text-amber-400" />
        </div>

        <CardHeader className="relative pt-12 pb-8 text-center border-b border-amber-500/20">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Ticket className="w-8 h-8 text-amber-400 animate-pulse" />
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent tracking-wider">
              Cineverse
            </CardTitle>
            <Ticket className="w-8 h-8 text-amber-400 animate-pulse" />
          </div>
          <CardDescription className="text-amber-200/80 text-base mt-2">
            Bienvenido de vuelta
          </CardDescription>
          <div className="flex items-center justify-center gap-1 mt-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-300/70">Inicia sesión para continuar</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
        </CardHeader>

        <CardContent className="pt-8">
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-amber-200/90 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@institucional.edu.ec"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-900/50 border-amber-500/30 text-white placeholder:text-gray-500 focus:border-amber-400 focus:ring-amber-400/50 h-12 pl-4 pr-4 transition-all duration-200"
                  />
                  <div className="absolute inset-0 rounded-md bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </div>

              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-amber-200/90 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Contraseña
                  </Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-amber-400/80 hover:text-amber-300 underline-offset-4 hover:underline transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-900/50 border-amber-500/30 text-white placeholder:text-gray-500 focus:border-amber-400 focus:ring-amber-400/50 h-12 pl-4 pr-4 transition-all duration-200"
                  />
                  <div className="absolute inset-0 rounded-md bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-600 text-black font-bold text-base shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                disabled={isLoading}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Iniciando sesión...
                    </>
                  ) : (
                    <>
                      <Ticket className="w-5 h-5" />
                      Iniciar Sesión
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-amber-500/20 text-center">
              <p className="text-sm text-amber-200/70 mb-2">
                ¿No tienes una cuenta?
              </p>
              <Link
                href="/auth/sign-up"
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 underline-offset-4 hover:underline transition-colors"
              >
                <Ticket className="w-4 h-4" />
                Regístrate aquí
              </Link>
            </div>
          </form>
        </CardContent>

        {/* Efecto de cortina inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      </Card>
    </div>
  );
}
