'use client';
import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { signIn } from "@/lib/auth/client";
import { toast } from "sonner";

const SocialLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: `/dashboard`,
      });
      if (error) {
        toast.error(error.message || "Failed to initiate Google authentication.");
      }
    } catch (error) {
      toast.error("An unexpected social authentication error occurred.");
    }
  };

  const handleGithubLogin = async () => {
    try {
      const { error } = await signIn.social({
        provider: "github",
        callbackURL: `/dashboard`,
      });
      if (error) {
        toast.error(error.message || "Failed to initiate GitHub authentication.");
      }
    }
    catch (error) {
      toast.error("An unexpected social authentication error occurred.");
    }
  }

  return (
    <section className="w-full flex flex-col gap-4">

      <div className="w-full flex gap-3 justify-center items-center px-5">
        <Button 
          onClick={handleGoogleLogin} 
          variant="outline"
          className="flex-1 h-10 cursor-pointer font-mono text-[11px] font-bold tracking-tight gap-2"
        >
          <FcGoogle size={16} /> 
          <span>Google</span>
        </Button>
        <Button 
          onClick={handleGithubLogin}
          variant="outline" 
          className="flex-1 h-10 cursor-pointer font-mono text-[11px] font-bold tracking-tight gap-2"
        >
          <SiGithub size={16} /> 
          <span>GitHub</span>
        </Button>
      </div>
            <div className="w-full flex items-center gap-3 text-[10px] font-mono font-bold text-muted-foreground">
        <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800" />
        <span className="shrink-0">Or Continue With </span>
        <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800" />
      </div> 
    </section>
  );
};

export default SocialLogin;

