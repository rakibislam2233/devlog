import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";

const ResetPasswordPage = () => {
  return (
    <Card>
      <CardHeader className="text-center space-y-1.5">
        <CardTitle className="text-xl md:text-2xl font-semibold ">Reset Password</CardTitle>
        <CardDescription>
            Configure your node credential key to establish workspace access controls.
        </CardDescription>
      </CardHeader>
      <Suspense fallback={<div className="p-6 text-center font-mono text-xs">Loading reset context...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </Card>
  );
};

export default ResetPasswordPage;
