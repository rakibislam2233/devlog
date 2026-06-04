import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";
import { getDb } from "@/db";
import { Resend } from "resend";
import { render } from "@react-email/components";
import ResetPasswordEmailTemplate from "@/lib/email/templates/ResetPasswordEmailTemplate";
import VerifyEmailTemplate from "@/lib/email/templates/VerifyEmailTemplate";
import WelcomeEmailTemplate from "@/lib/email/templates/WelcomeEmailTemplate";

export function createAuth(env?: Partial<CloudflareEnv>) {
  const db = getDb(env);
  const resend = new Resend(env?.RESEND_API_KEY);

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: {
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification,
      },
    }),

    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,

    emailAndPassword: {
      enabled: true,
      disableSignUp: false,
      requireEmailVerification: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,

      // Password reset hook integration
      sendResetPassword: async ({ user, token }) => {
        const frontendResetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

        // Compile react component into pure raw HTML string
        const resetHtml = await render(
          ResetPasswordEmailTemplate({
            name: user.name || "Developer",
            url: frontendResetUrl,
          }),
        );

        await resend.emails.send({
          from: "DevLog <onboarding@resend.dev>",
          to: user.email,
          subject: "Reset Your DevLog Password",
          html: resetHtml,
        });
      },
      resetPasswordTokenExpiresIn: 60 * 60,
    },

    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      expiresIn: 60 * 60,

      // Verification email hook integration
      sendVerificationEmail: async ({ user, token }) => {
        const frontendVerificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${token}`;

        const verificationHtml = await render(
          VerifyEmailTemplate({
            name: user.name || "Developer",
            url: frontendVerificationUrl,
          }),
        );

        await resend.emails.send({
          from: "DevLog <onboarding@resend.dev>",
          to: user.email,
          subject: "Verify Your DevLog Account",
          html: verificationHtml,
        });
      },
    },

    databaseHooks: {
      user: {
        update: {
          after: async (user) => {
            if (user.emailVerified) {
              try {
                const welcomeHtml = await render(
                  WelcomeEmailTemplate({ name: user.name || "Developer" }),
                );

                await resend.emails.send({
                  from: "DevLog <onboarding@resend.dev>",
                  to: user.email,
                  subject: "Welcome to DevLog Workspace! 🚀",
                  html: welcomeHtml,
                });
              } catch (error) {
                console.error("Welcome email error log:", error);
              }
            }
          },
        },
      },
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      },
    },
  });
}
