import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ForgotPasswordPage = () => {
  return (
    <Card className="w-full max-w-md mx-auto overflow-y-auto max-h-[90vh]">
      <CardHeader className="text-center space-y-1.5">
        <CardTitle className="text-xl md:text-2xl font-semibold ">Forgot Password</CardTitle>
        <CardDescription>
            Configure your node credential key to establish workspace access controls.
        </CardDescription>
      </CardHeader>
      <ForgotPasswordForm />
    </Card>
  );
};

export default ForgotPasswordPage;
