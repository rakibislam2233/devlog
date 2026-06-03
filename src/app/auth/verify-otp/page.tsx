import VerifyOTPForm from "@/components/ui/auth/VerifyOTPForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const VerifyOTPPage = () => {
  return (
    <Card className="w-full max-w-md mx-auto overflow-y-auto max-h-[90vh]">
      <CardHeader className="text-center space-y-1.5">
        <CardTitle className="text-xl md:text-2xl font-semibold ">Verify OTP</CardTitle>
        <CardDescription>
            Configure your node credential key to establish workspace access controls.
        </CardDescription>
      </CardHeader>
      <VerifyOTPForm />
    </Card>
  );
};

export default VerifyOTPPage;
