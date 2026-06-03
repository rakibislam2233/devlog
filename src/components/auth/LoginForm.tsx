"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, LogIn, MailboxIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Operator email identifier parameters are required.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Security password keys must contain at least 6 characters.");
      return;
    }

    setIsSubmitting(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        {error && (
          <div className="bg-rose-50  border border-rose-300 p-3 text-rose-600 font-mono text-[11px] leading-relaxed select-text">
            <span className="font-bold">EXCEPTION:</span> {error}
          </div>
        )}

        {/* Email field block */}
        <div className="space-y-1.5">
          <Label htmlFor="login_email_element">Email </Label>
          <div className="relative">
            <MailboxIcon
              size={13}
              className="absolute left-3 top-3.5 "
            />
            <Input
              id="login_email_element"
              type="email"
              placeholder="rakib2020.tkg@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Password field block */}
        <div className="space-y-1.5">
          <Label htmlFor="login_password_element">Password</Label>
          <div className="relative">
            <Key
              size={13}
              className="absolute left-3 top-3.5 "
            />
            <Input
              id="login_password_element"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Checkbox id="remember_me_checkbox" />
            <Label htmlFor="login_password_element">Remember me</Label>
          </div>
          <Link
            href="/auth/forgot-password"
            className="font-mono text-[10px] uppercase hover:underline font-bold tracking-tight  cursor-pointer outline-none"
          >
            Forgot Password?
          </Link>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-3 mt-2">
        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting}
          className="w-full h-10 cursor-pointer"
          id="login_submit_trigger"
        >
          {isSubmitting ? (
            <span>Login...</span>
          ) : (
            <>
              <LogIn size={13} className="stroke-[2.5]" />
              <span>Login</span>
            </>
          )}
        </Button>

        {/* Toggle registration footer */}
        <div className="flex justify-between items-center w-full text-[11px] font-mono mt-2">
          <span className="text-zinc-450">
            No assigned authorization profile?
          </span>
          <Link
            href="/auth/register"
            className="font-bold  hover:underline cursor-pointer"
          >
            Create Account
          </Link>
        </div>
      </CardFooter>
    </form>
  );
};

export default LoginForm;
