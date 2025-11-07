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
import { useState } from "react";
import { Film, Ticket, Mail, Sparkles, CheckCircle2 } from "lucide-react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ocurrió un error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 relative", className)} {...props}>
      {/* Efectos de luz de proyector */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-amber-500/20 via-red-600/10 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-amber-500/20 via-red-600/10 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      
      {success ? (
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
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-400 animate-pulse" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent tracking-wider">
              Revisa tu Correo
            </CardTitle>
            <CardDescription className="text-amber-200/80 text-base mt-3">
              Instrucciones de restablecimiento enviadas
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <p className="text-sm text-amber-200/70 leading-relaxed">
                Si te registraste usando tu correo electrónico y contraseña, recibirás
                un correo para restablecer tu contraseña.
              </p>
              <div className="mt-6 pt-6 border-t border-amber-500/20">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 underline-offset-4 hover:underline transition-colors"
                >
                  <Ticket className="w-4 h-4" />
                  Volver al inicio de sesión
                </Link>
              </div>
            </div>
          </CardContent>

          {/* Efecto de cortina inferior */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        </Card>
      ) : (
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
              Restablecer Contraseña
            </CardDescription>
            <div className="flex items-center justify-center gap-1 mt-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300/70">Ingresa tu correo y te enviaremos un enlace</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
          </CardHeader>

          <CardContent className="pt-8">
            <form onSubmit={handleForgotPassword}>
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
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        Enviar correo de restablecimiento
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-amber-500/20 text-center">
                <p className="text-sm text-amber-200/70 mb-2">
                  ¿Ya tienes una cuenta?
                </p>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 underline-offset-4 hover:underline transition-colors"
                >
                  <Ticket className="w-4 h-4" />
                  Inicia sesión aquí
                </Link>
              </div>
            </form>
          </CardContent>

          {/* Efecto de cortina inferior */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        </Card>
      )}
    </div>
  );
}
