"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginInput, loginSchema } from "@/interfaces/auth";
import { signIn } from "@/lib/auth/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key, Loader2, LogIn, MailboxIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginInput) => {
    try {
      const { error: authError } = await signIn.email({
        email: values.email,
        password: values.password,
        callbackURL: "/dashboard",
      });

      if (authError) {
        toast.error(authError.message || "Invalid email or password configuration.");
        return;
      }

      toast.success("Authentication sequence successful. Redirecting to workspace...");
      router.push("/dashboard");
      router.refresh();
    } catch (catchError) {
      toast.error("An unexpected authentication exception occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        {/* Email field block */}
        <div className="space-y-1.5">
          <Label htmlFor="login_email_element">Email</Label>
          <div className="relative">
            <MailboxIcon size={13} className="absolute left-3 top-3.5 text-muted-foreground" />
            <Input
              id="login_email_element"
              type="email"
              placeholder="rakib2020.tkg@gmail.com"
              {...register("email")}
              className={`pl-9 ${errors.email ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
              disabled={isSubmitting}
            />
          </div>
          {errors.email && (
            <p className="text-[11px] font-mono text-rose-600  tracking-tight">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password field block */}
        <div className="space-y-1.5">
          <Label htmlFor="login_password_element">Password</Label>
          <div className="relative">
            <Key size={13} className="absolute left-3 top-3.5 text-muted-foreground" />
            <Input
              id="login_password_element"
              type="password"
              placeholder="••••••••••••"
              {...register("password")}
              className={`pl-9 ${errors.password ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
              disabled={isSubmitting}
            />
          </div>
          {errors.password && (
            <p className="text-[11px] font-mono text-rose-600  tracking-tight">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Checkbox id="remember_me_checkbox" disabled={isSubmitting} />
            <Label htmlFor="remember_me_checkbox" className="cursor-pointer select-none text-xs">
              Remember Node
            </Label>
          </div>
          <Link
            href="/auth/forgot-password"
            className="font-mono text-[10px] hover:underline font-bold tracking-tight cursor-pointer outline-none text-muted-foreground hover:text-foreground"
          >
            Forgot Password
          </Link>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-3 mt-2">
        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting}
          className="w-full h-10 cursor-pointer flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800"
          id="login_submit_trigger"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={13} className="animate-spin" />
             <span className="font-mono text-xs font-semibold">Verifying...</span>
            </>
          ) : (
            <>
              <LogIn size={13} className="stroke-[2.5]" />
              <span className="font-mono text-xs font-semibold">Login</span>
            </>
          )}
        </Button>

        {/* Toggle registration footer */}
        <div className="flex justify-between items-center w-full text-[11px] font-mono mt-2">
          <span className="text-muted-foreground">
            No active profile?
          </span>
          <Link
            href="/auth/register"
            className="font-semibold hover:underline cursor-pointer"
          >
            Create Account
          </Link>
        </div>
      </CardFooter>
    </form>
  );
};

export default LoginForm;
