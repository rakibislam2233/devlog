"use client";
import React, { useState } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Key, LogIn, MailboxIcon } from "lucide-react";
import { Label } from "../label";
import { Input } from "../input";
import { Button } from "../button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name) {
      setError("Operator name identifier parameters are required.");
      return;
    }
    if (!email) {
      setError("Operator email identifier parameters are required.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Security password keys must contain at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        {error && (
          <div className="bg-rose-50 border border-rose-300 p-3 text-rose-600 font-mono text-[11px] leading-relaxed select-text">
            <span className="font-bold">EXCEPTION:</span> {error}
          </div>
        )}
        {/* Name field block */}
        <div className="space-y-1.5">
          <Label htmlFor="register_name_element">Name</Label>
          <div className="relative">
            <MailboxIcon
              size={13}
              className="absolute left-3 top-3.5 text-zinc-400"
            />
            <Input
              id="register_name_element"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        {/* Email field block */}
        <div className="space-y-1.5">
          <Label htmlFor="register_email_element">Email </Label>
          <div className="relative">
            <MailboxIcon
              size={13}
              className="absolute left-3 top-3.5 text-zinc-400"
            />
            <Input
              id="register_email_element"
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
          <Label htmlFor="register_password_element">Password</Label>
          <div className="relative">
            <Key size={13} className="absolute left-3 top-3.5 text-zinc-400" />
            <Input
              id="register_password_element"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        {/* Confirm Password field block */}
        <div className="space-y-1.5">
          <Label htmlFor="register_confirm_password_element">
            Confirm Password
          </Label>
          <div className="relative">
            <Key size={13} className="absolute left-3 top-3.5 text-zinc-400" />
            <Input
              id="register_confirm_password_element"
              type="password"
              placeholder="••••••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        {/* Agreement checkbox */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Checkbox id="agreement_checkbox" />
            <Label htmlFor="agreement_checkbox">
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
          className="w-full h-10 cursor-pointer"
          id="login_submit_trigger"
        >
          {isSubmitting ? (
            <span>Creating Account...</span>
          ) : (
            <>
              <LogIn size={13} className="stroke-[2.5]" />
              <span>Create Account</span>
            </>
          )}
        </Button>

        {/* Toggle registration footer */}
        <div className="flex justify-between items-center w-full text-[11px] font-mono mt-2">
          <span className="text-zinc-450">Already have an account?</span>
          <Link
            href="/auth/login"
            className="font-bold text-zinc-900 hover:underline cursor-pointer"
          >
            Login
          </Link>
        </div>
      </CardFooter>
    </form>
  );
};

export default RegisterForm;
