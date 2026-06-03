"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, MailboxIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Operator email identifier parameters are required.");
      return;
    }

    setIsSubmitting(true);
    // Navigate to verify-otp page after successful submission
    window.location.href = "/auth/verify-otp";
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        {error && (
          <div className="bg-rose-50 border border-rose-300 p-3 text-rose-600 font-mono text-[11px] leading-relaxed select-text">
            <span className="font-bold">EXCEPTION:</span> {error}
          </div>
        )}

        {/* Email field block */}
        <div className="space-y-1.5">
          <Label htmlFor="forgot_email_element">Email</Label>
          <div className="relative">
            <MailboxIcon
              size={13}
              className="absolute left-3 top-3.5 "
            />
            <Input
              id="forgot_email_element"
              type="email"
              placeholder="rakib2020.tkg@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-3 mt-2">
        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting}
          className="w-full h-10 cursor-pointer"
          id="forgot_submit_trigger"
        >
          {isSubmitting ? (
            <span>Sending...</span>
          ) : (
            <>
              <span>Send Reset Link</span>
              <ArrowRight size={13} className="stroke-[2.5]" />
            </>
          )}
        </Button>

        {/* Back to login footer */}
        <div className="flex justify-between items-center w-full text-[11px] font-mono mt-2">
          <span className="text-zinc-450">Remember your password?</span>
          <Link
            href="/auth/login"
            className="font-bold  hover:underline cursor-pointer"
          >
            Login
          </Link>
        </div>
      </CardFooter>
    </form>
  );
};

export default ForgotPasswordForm;
