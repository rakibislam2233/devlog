interface CloudflareEnv {
  ASSETS: Fetcher;
  WORKER_SELF_REFERENCE: Fetcher;
  HYPERDRIVE: Hyperdrive;
  EMAIL_QUEUE: Queue<EmailQueueMessage>;
  BETTER_AUTH_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  RESEND_API_KEY: string;
}

// Queue message type
interface EmailQueueMessage {
  type: "welcome" | "reset-password" | "verify-email";
  to: string;
  data: Record<string, unknown>;
}
