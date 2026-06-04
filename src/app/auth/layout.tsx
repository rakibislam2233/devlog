import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full min-h-screen flex justify-center items-center px-4 py-8 md:py-12">
      <div className="w-full max-w-md">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
