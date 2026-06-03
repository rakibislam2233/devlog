import RegisterForm from "@/components/ui/auth/RegisterForm";
import SocialLogin from "@/components/ui/auth/SocialLogin";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RegisterPage = () => {
  return (
    <Card className="w-full max-w-md mx-auto overflow-y-auto max-h-[90vh]">
      <CardHeader className="text-center space-y-1.5">
        <CardTitle className="text-xl md:text-2xl font-semibold ">
            Create Your Account
        </CardTitle>
        <CardDescription>
            Identify your node credential key to establish workspace access
        </CardDescription>
      </CardHeader>
      <SocialLogin />
      <RegisterForm />
    </Card>
  );
};

export default RegisterPage;
