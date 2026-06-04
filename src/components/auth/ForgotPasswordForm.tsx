"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, MailboxIcon, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { authClient } from "@/lib/auth/client"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordInput } from "@/interfaces/auth";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (values: ForgotPasswordInput) => {
    try {
      // In better-auth v1.x, the method is forgetPassword
      const { error } = await authClient.requestPasswordReset({
        email: values.email,
        redirectTo: "/auth/reset-password",
      });

      if (error) {
        toast.error(error.message || "Failed to transmit recovery sequence.");
        return;
      }

      setSubmittedEmail(values.email);
      setIsSuccess(true);
      toast.success("Recovery sequence initiated. Check your inbox node.");
    } catch (catchError) {
      toast.error("An unexpected transmission exception occurred.");
    }
  };

  if (isSuccess) {
    return (
      <CardContent className="space-y-4 pt-4 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-full text-emerald-600 animate-bounce">
            <CheckCircle2 size={24} />
          </div>
          <h3 className="font-mono text-sm font-bold text-gray-900 mt-2">
            Transmission Successful
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
            A secure recovery link has been dispatched to <span className="font-semibold text-gray-900">{submittedEmail}</span>. Please verify your inbox node.
          </p>
        </div>
        <div className="pt-4">
          <Link href="/auth/login" className="text-xs font-mono font-bold hover:underline">
            ← Return to Gateway
          </Link>
        </div>
      </CardContent>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="forgot_email_element">Email</Label>
          <div className="relative">
            <MailboxIcon size={13} className="absolute left-3 top-3.5 text-muted-foreground" />
            <Input
              id="forgot_email_element"
              type="email"
              placeholder="rakib2020.tkg@gmail.com"
              {...register("email")}
              className={`pl-9 ${errors.email ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
              disabled={isSubmitting}
            />
          </div>
          {errors.email && (
            <p className="text-[10px] font-mono text-rose-600 font-bold tracking-tight">
              {errors.email.message}
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
          id="forgot_submit_trigger"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              <span className="font-mono text-xs font-bold">Submitting...</span>
            </>
          ) : (
            <>
              <span className="font-mono text-xs font-bold">Submit</span>
              <ArrowRight size={13} className="stroke-[2.5]" />
            </>
          )}
        </Button>

        <div className="flex justify-between items-center w-full text-[11px] font-mono mt-2">
          <span className="text-muted-foreground font-medium">Remember your security key?</span>
          <Link href="/auth/login" className="font-bold hover:underline cursor-pointer">
            Login
          </Link>
        </div>
      </CardFooter>
    </form>
  );
};

export default ForgotPasswordForm;
