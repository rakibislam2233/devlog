"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Key, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordInput } from "@/interfaces/auth";
import { toast } from "sonner";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (values: ResetPasswordInput) => {
    if (!token) {
      toast.error("Invalid or missing security context token parameters.");
      return;
    }

    try {
      await authClient.resetPassword({
        newPassword: values.password,
      }, {
        query: { token },
        onSuccess: () => {
          toast.success("Security key re-initialized successfully.");
          router.push("/auth/login");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to re-initialize security keys.");
        }
      });
    } catch (catchError) {
      toast.error("An unexpected reset exception occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        {!token && (
          <div className="bg-amber-50 border border-amber-300 p-3 text-amber-700 font-mono text-[11px] leading-relaxed">
            <span className="font-bold">WARNING:</span> No active token detected. Execution will be restricted.
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="reset_password_element">New Password</Label>
          <div className="relative">
            <Key size={13} className="absolute left-3 top-3.5 text-gray-400" />
            <Input
              id="reset_password_element"
              type="password"
              placeholder="••••••••••••"
              {...register("password")}
              className={`pl-9 ${errors.password ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
              disabled={!token || isSubmitting}
            />
          </div>
          {errors.password && (
            <p className="text-[10px] font-mono text-rose-600 font-bold tracking-tight">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="reset_confirm_password_element">
            Confirm Password
          </Label>
          <div className="relative">
            <Key size={13} className="absolute left-3 top-3.5 text-gray-400" />
            <Input
              id="reset_confirm_password_element"
              type="password"
              placeholder="••••••••••••"
              {...register("confirmPassword")}
              className={`pl-9 ${errors.confirmPassword ? "border-rose-500 focus-visible:ring-rose-500" : ""}`}
              disabled={!token || isSubmitting}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-[10px] font-mono text-rose-600 font-bold tracking-tight">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-3 mt-2">
        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting || !token}
          className="w-full h-10 cursor-pointer flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800"
          id="reset_submit_trigger"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={13} className="animate-spin" />
             <span className="font-mono text-xs font-semibold">Processing...</span>
            </>
          ) : (
            <>
             <span className="font-mono text-xs font-semibold">Reset Password</span>
              <ArrowRight size={13} className="stroke-[2.5]" />
            </>
          )}
        </Button>

        <div className="flex justify-between items-center w-full text-[11px] font-mono mt-2">
          <span className="text-zinc-450 font-medium">Remember your security key?</span>
          <Link href="/auth/login" className="font-bold hover:underline cursor-pointer">
            Login
          </Link>
        </div>
      </CardFooter>
    </form>
  );
};

export default ResetPasswordForm;
