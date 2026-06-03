import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full h-screen flex justify-center items-center flex-col gap-5">
      {children}
    </main>
  );
};

export default AuthLayout;
