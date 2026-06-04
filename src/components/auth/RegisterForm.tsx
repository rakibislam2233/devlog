"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema } from "@/interfaces/auth";
import { signUp } from "@/lib/auth/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key, Loader2, LogIn, MailboxIcon, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const extendedRegisterSchema = registerSchema.extend({
  confirmPassword: z.string().min(8, "Confirmation key required."),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to terms.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Security keys do not match.",
  path: ["confirmPassword"],
});

type ExtendedRegisterInput = z.infer<typeof extendedRegisterSchema>;

const RegisterForm = () => {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ExtendedRegisterInput>({
    resolver: zodResolver(extendedRegisterSchema),
    defaultValues: {
      agreeTerms: false,
    }
  });

  const onSubmit = async (values: ExtendedRegisterInput) => {
    try {
      const { error: authError } = await signUp.email({
        email: values.email,
        password: values.password,
        name: values.name,
        callbackURL: "/auth/verify-email",
      });

      if (authError) {
        toast.error(authError.message || "Registration sequence failed.");
        return;
      }

      toast.success("Account provisioned. Please verify your email node.");
      router.push("/auth/verify-email");
      router.refresh();
    } catch (catchError) {
      toast.error("An unexpected provisioning exception occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        {/* Name field block */}
        <div className="space-y-1.5">
          <Label htmlFor="register_name_element">Name</Label>
          <div className="relative">
            <User size={13} className="absolute left-3 top-3.5 text-muted-foreground" />
            <Input
              id="register_name_element"
              type="text"
              placeholder="John Doe"
              {...register("name")}
              className={`pl-9 ${errors.name ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
              disabled={isSubmitting}
            />
          </div>
          {errors.name && (
            <p className="text-[11px] font-mono text-rose-600  tracking-tight">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email field block */}
        <div className="space-y-1.5">
          <Label htmlFor="register_email_element">Email</Label>
          <div className="relative">
            <MailboxIcon size={13} className="absolute left-3 top-3.5 text-muted-foreground" />
            <Input
              id="register_email_element"
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
          <Label htmlFor="register_password_element">Password</Label>
          <div className="relative">
            <Key size={13} className="absolute left-3 top-3.5 text-muted-foreground" />
            <Input
              id="register_password_element"
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

        {/* Confirm Password field block */}
        <div className="space-y-1.5">
          <Label htmlFor="register_confirm_password_element">Confirm Password</Label>
          <div className="relative">
            <Key size={13} className="absolute left-3 top-3.5 text-muted-foreground" />
            <Input
              id="register_confirm_password_element"
              type="password"
              placeholder="••••••••••••"
              {...register("confirmPassword")}
              className={`pl-9 ${errors.confirmPassword ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
              disabled={isSubmitting}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-[11px] font-mono text-rose-600  tracking-tight">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Agreement checkbox */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Controller
              name="agreeTerms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="agreement_checkbox"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              )}
            />
            <Label htmlFor="agreement_checkbox" className="cursor-pointer select-none text-[11px] font-mono  font-bold text-muted-foreground">
              I agree to the <Link href="/terms" className="underline hover:text-foreground">Terms of Service</Link>
            </Label>
          </div>
          {errors.agreeTerms && (
            <p className="text-[11px] font-mono text-rose-600  tracking-tight">
              {errors.agreeTerms.message}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-3 mt-2">
        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting}
          className="w-full h-10 cursor-pointer flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800"
          id="register_submit_trigger"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={13} className="animate-spin" />
             <span className="font-mono text-xs font-semibold">Provisioning...</span>
            </>
          ) : (
            <>
              <LogIn size={13} className="stroke-[2.5]" />
             <span className="font-mono text-xs font-semibold">Create Account</span>
            </>
          )}
        </Button>

        {/* Toggle registration footer */}
        <div className="flex justify-between items-center w-full text-[11px] font-mono mt-2">
          <span className="text-muted-foreground">Existing node access?</span>
          <Link
            href="/auth/login"
            className="font-bold hover:underline cursor-pointer "
          >
            Login
          </Link>
        </div>
      </CardFooter>
    </form>
  );
};

export default RegisterForm;
