import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";
import { getDb } from "@/db";

export function createAuth(env?: any) {
  const db = getDb(env);

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
      sendResetPassword: async ({ user, url, token }) => {
        // Implement your email sending logic here using your preferred email service
      },
      resetPasswordTokenExpiresIn: 60 * 60, // 1 hour
      password: {
        hash: async (password) => {
          // Implement your password hashing logic here using your preferred hashing library
          return password;
        },
        verify: async ({ password, hash }) => {
          return password === hash;
        },
      },
    },

    // Email verification
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      expiresIn: 60 * 60, // 1 hour
      sendVerificationEmail: async ({ user, url, token }) => {
        // Implement your email sending logic here using your preferred email service
      },
    },
    databaseHooks: {
      user: {
        update: {
          after: async ({ user }) => {
            // send welcome email after email is verified
          },
        },
      },
    },
    // OAuth providers
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
    session: {},
  });
}
