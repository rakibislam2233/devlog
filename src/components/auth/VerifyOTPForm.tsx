"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Key } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const VerifyOTPForm = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!otp || otp.length < 6) {
      setError("OTP must be 6 characters.");
      return;
    }

    setIsSubmitting(true);
    // Navigate to reset-password page after successful verification
    window.location.href = "/auth/reset-password";
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        {error && (
          <div className="bg-rose-50 border border-rose-300 p-3 text-rose-600 font-mono text-[11px] leading-relaxed select-text">
            <span className="font-bold">EXCEPTION:</span> {error}
          </div>
        )}

        {/* OTP field block */}
        <div className="space-y-1.5">
          <Label htmlFor="verify_otp_element">Enter OTP</Label>
          <div className="relative">
            <Key size={13} className="absolute left-3 top-3.5 " />
            <Input
              id="verify_otp_element"
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="pl-9"
              maxLength={6}
            />
          </div>
          <p className="text-[10px]  font-mono">
            Enter the 6-digit code sent to your email
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-3 mt-2">
        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting}
          className="w-full h-10 cursor-pointer"
          id="verify_submit_trigger"
        >
          {isSubmitting ? (
            <span>Verifying...</span>
          ) : (
            <>
              <span>Verify OTP</span>
              <ArrowRight size={13} className="stroke-[2.5]" />
            </>
          )}
        </Button>

        {/* Resend OTP and back to login footer */}
        <div className="flex justify-between items-center w-full text-[11px] font-mono mt-2">
          <button
            type="button"
            className="font-bold  hover:underline cursor-pointer outline-none"
          >
            Resend OTP
          </button>
          <Link
            href="/auth/login"
            className="font-bold  hover:underline cursor-pointer"
          >
            Back to Login
          </Link>
        </div>
      </CardFooter>
    </form>
  );
};

export default VerifyOTPForm;
