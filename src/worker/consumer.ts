import { Resend } from "resend";
import { render } from "@react-email/components";
import VerifyEmailTemplate from "@/lib/email/templates/VerifyEmailTemplate";
import ResetPasswordEmailTemplate from "@/lib/email/templates/ResetPasswordEmailTemplate";
import WelcomeEmailTemplate from "@/lib/email/templates/WelcomeEmailTemplate";

export default {
  async queue(
    batch: MessageBatch<any>,
    env: any,
    ctx: ExecutionContext,
  ): Promise<void> {
    const resend = new Resend(env.RESEND_API_KEY);

    for (const message of batch.messages) {
      const payload = message.body;
      console.log(
        `Processing email task: ${payload.type} for ${payload.email}`,
      );

      try {
        let emailHtml = "";

        switch (payload.type) {
          case "VERIFY_EMAIL": {
            emailHtml = await render(
              VerifyEmailTemplate({
                name: payload.name || "Developer",
                url: payload.url,
              }),
            );

            await resend.emails.send({
              from: "DevLog <onboarding@resend.dev>",
              to: payload.email,
              subject: "Verify Your DevLog Account",
              html: emailHtml,
            });
            break;
          }
          case "RESET_PASSWORD_OTP": {
            emailHtml = await render(
              ResetPasswordEmailTemplate({
                name: payload.name || "Developer",
                url: payload.url || payload.otp,
              }),
            );

            await resend.emails.send({
              from: "DevLog Security <security@resend.dev>",
              to: payload.email,
              subject: "Your Password Reset OTP",
              html: emailHtml,
            });
            break;
          }

          case "WELCOME_EMAIL": {
            emailHtml = await render(
              WelcomeEmailTemplate({
                name: payload.name || "Developer",
              }),
            );

            await resend.emails.send({
              from: "DevLog <onboarding@resend.dev>",
              to: payload.email,
              subject: "Welcome to DevLog! 🚀",
              html: emailHtml,
            });
            break;
          }
        }

        message.ack();
      } catch (error) {
        console.error(`Failed to send email for ${payload.type}:`, error);
        message.retry();
      }
    }
  },
};
