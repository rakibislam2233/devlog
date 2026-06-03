import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";

const SocialLogin = () => {
  return (
    <section className="w-full flex flex-col gap-3">
      <div className="w-full flex gap-5 justify-center items-center py-2">
        <Button className="w-32 h-10 cursor-pointer">
          <FcGoogle /> Google
        </Button>
        <Button className="w-32 h-10 cursor-pointer">
          <SiGithub /> GitHub
        </Button>
      </div>
      <div className="w-full flex items-center gap-3 text-xs">
        <div className="w-full h-px bg-zinc-200 dark:bg-zinc-700" />{" "}
        <span className="shrink-0">Or continue with </span>
        <div className="w-full h-px bg-zinc-200 dark:bg-zinc-700" />{" "}
      </div>
    </section>
  );
};

export default SocialLogin;
