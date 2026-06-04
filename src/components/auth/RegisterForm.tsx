"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth/client";
import { Key, LogIn, MailboxIcon, User, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name && !email && !password && !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (!name) {
      setError("Name is required.");
      return;
    }
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreeTerms) {
      setError("You must agree to the Terms and Conditions to proceed.");
      return;
    }

    try {
      setIsSubmitting(true);
      const { data, error: authError } = await signUp.email({
        email,
        password,
        name,
        callbackURL: "/auth/verify-email",
      });

      if (authError) {
        setError(authError.message || "Registration failed. Please try again.");
        setIsSubmitting(false);
        return;
      }
      router.push("/auth/verify-email");
      router.refresh();

    } catch (catchError) {
      setError("An unexpected error occurred during signup.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        {/* Exception এরর মেসেজ */}
        {error && (
          <div className="bg-rose-50 border border-rose-300 p-3 text-rose-600 font-mono text-[11px] leading-relaxed select-text rounded-sm">
            <span className="font-bold">EXCEPTION:</span> {error}
          </div>
        )}

        {/* Name field block */}
        <div className="space-y-1.5">
          <Label htmlFor="register_name_element">Name</Label>
          <div className="relative">
            <User size={13} className="absolute left-3 top-3.5 text-muted-foreground" />
            <Input
              id="register_name_element"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-9"
              disabled={isSubmitting}
            />
          </div>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-9"
              disabled={isSubmitting}
            />
          </div>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-9"
              disabled={isSubmitting}
            />
          </div>
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-9"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Agreement checkbox */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Checkbox
              id="agreement_checkbox"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(!!checked)}
              disabled={isSubmitting}
            />
            <Label htmlFor="agreement_checkbox" className="cursor-pointer select-none text-[12px]">
              I agree to the Terms and Conditions
            </Label>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-3 mt-2">
        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting}
          className="w-full h-10 cursor-pointer flex items-center justify-center gap-2"
          id="register_submit_trigger"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <LogIn size={13} className="stroke-[2.5]" />
              <span>Create Account</span>
            </>
          )}
        </Button>

        {/* Toggle registration footer */}
        <div className="flex justify-between items-center w-full text-[11px] font-mono mt-2">
          <span className="text-muted-foreground">Already have an account?</span>
          <Link
            href="/auth/login"
            className="font-bold hover:underline cursor-pointer"
          >
            Login
          </Link>
        </div>
      </CardFooter>
    </form>
  );
};

export default RegisterForm;