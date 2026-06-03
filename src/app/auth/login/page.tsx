import LoginForm from "@/components/auth/LoginForm";
import SocialLogin from "@/components/auth/SocialLogin";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoginPage = () => {
  return (
    <Card className="w-full max-w-md mx-auto overflow-y-auto max-h-[90vh]">
      <CardHeader className="text-center space-y-1.5">
        <CardTitle className="text-xl md:text-2xl font-semibold ">Login Your Account</CardTitle>
        <CardDescription>
          Identify your node credential key to establish workspace access
          controls.
        </CardDescription>
      </CardHeader>
      <SocialLogin />
      <LoginForm />
    </Card>
  );
};

export default LoginPage;
