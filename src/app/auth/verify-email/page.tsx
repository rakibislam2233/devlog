'use client'
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { MailCheck, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const VerifyEmailContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Extract token from URL query string if present
  const token = searchParams.get("token");

  const [verificationStatus, setVerificationStatus] = useState<"initial" | "verifying" | "success" | "error">("initial");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // If token exists in URL, switch context to active execution mode
    if (token) {
      const executeVerification = async () => {
        setVerificationStatus("verifying");
        try {
        await authClient.verifyEmail({
            query: { token }
          }, {
            onSuccess: () => {
              setVerificationStatus("success");
              setTimeout(() => {
                router.push("/dashboard");
              }, 3000);
            },
            onError: (ctx) => {
              console.log("ctx",ctx)
              setVerificationStatus("error");
              setErrorMessage(ctx.error.message || "Verification failed. The token may be expired.");
            }
          });
        } catch (error) {
          setVerificationStatus("error");
          setErrorMessage("An unexpected authentication error occurred.");
        }
      };

      executeVerification();
    }
  }, [token, router]);

  // Case 1: Active API request handling ongoing
  if (verificationStatus === "verifying") {
    return (
      <div className="flex items-center justify-center min-h-[70vh] p-4">
        <Card className="w-full max-w-md text-center p-6 border-gray-200">
          <CardHeader className="flex flex-col items-center gap-2 pb-4">
            <div className="p-4 rounded-full text-zinc-900 animate-spin">
              <Loader2 size={32} />
            </div>
            <CardTitle className="font-mono tracking-tight text-lg mt-2">
              Verifying Account
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground leading-relaxed">
              Validating your security token against core database nodes. Please stand by...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Case 2: Verification pipeline processed successfully
  if (verificationStatus === "success") {
    return (
      <div className="flex items-center justify-center min-h-[70vh] p-4">
        <Card className="w-full max-w-md text-center p-6 border-emerald-200 bg-emerald-50/10">
          <CardHeader className="flex flex-col items-center gap-2 pb-4">
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-full text-emerald-600">
              <CheckCircle2 size={32} />
            </div>
            <CardTitle className="font-mono tracking-tight text-lg mt-2 text-emerald-900">
              Verified Successfully
            </CardTitle>
            <CardDescription className="text-sm text-emerald-700 leading-relaxed">
              Your email configuration has been confirmed. Redirecting you to your active DevLog instance workspace...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Case 3: Error state fallback (Expired token/Network failure)
  if (verificationStatus === "error") {
    return (
      <div className="flex items-center justify-center min-h-[70vh] p-4">
        <Card className="w-full max-w-md text-center p-6 border-red-200 bg-red-50/10">
          <CardHeader className="flex flex-col items-center gap-2 pb-4">
            <div className="bg-red-50 border border-red-200 p-4 rounded-full text-red-600">
              <AlertCircle size={32} />
            </div>
            <CardTitle className="font-mono tracking-tight text-lg mt-2 text-red-900">
              Verification Failed
            </CardTitle>
            <CardDescription className="text-sm text-red-700 leading-relaxed">
              {errorMessage}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Button asChild variant="outline" className="w-full font-mono text-xs">
              <Link href="/auth/login">Return to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Case 4: Default Initial State (User just registered, showing "Check Your Email")
  return (
    <div className="flex items-center justify-center min-h-[70vh] p-4">
      <Card className="w-full max-w-md text-center p-6">
        <CardHeader className="flex flex-col items-center gap-2 pb-4">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-full text-emerald-600">
            <MailCheck size={32} />
          </div>
          <CardTitle className="font-mono tracking-tight text-lg mt-2">
            Check Your Email
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground leading-relaxed">
            We have sent a verification link to your email address. Please check
            your inbox (or spam folder) and click the link to activate your
            account.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="text-[11px] font-mono text-muted-foreground">
            You will be automatically redirected to the dashboard once verified.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const VerifyEmailPage = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[70vh] font-mono text-xs">Loading verification node...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}

export default VerifyEmailPage;
