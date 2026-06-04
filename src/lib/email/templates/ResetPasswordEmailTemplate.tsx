import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Link,
  Preview,
  Section,
  Hr,
} from "@react-email/components";
import * as React from "react";
import { ResetPasswordProps } from "@/interfaces/email";

export const ResetPasswordEmailTemplate = ({ name, url }: ResetPasswordProps) => (
  <Html>
    <Preview>Security token dispatched for DevLog credential reset</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Logo / Branding */}
        <Section style={brandSection}>
          <Text style={brandText}>DEVLOG // RECOVERY_NODE</Text>
        </Section>
        
        <Hr style={hr} />

        {/* Content */}
        <Heading style={heading}>Credential Override Request</Heading>
        <Text style={paragraph}>Hi {name},</Text>
        <Text style={paragraph}>
          An override sequence was triggered for your security access keys. To re-initialize your account password, execute the patch container below:
        </Text>
        
        {/* Action Button */}
        <Section style={btnContainer}>
          <Link href={url} style={button}>
            PATCH PASSWORD_RESET
          </Link>
        </Section>
        
        <Text style={paragraph}>
          If the button does not load, append this token URL to your active runtime:
          <br />
          <Link href={url} style={linkStyle}>{url}</Link>
        </Text>

        <Hr style={hr} />
        
        {/* Footer */}
        <Text style={footerText}>
          ALERT: If you didn't dispatch this request, your security layer might be compromised. Please review your account logs. Token context auto-terminates in 1 hour.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ResetPasswordEmailTemplate;

/* Shared Styling Framework */
const main = {
  backgroundColor: "#fafafa",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  padding: "40px 20px",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #e4e4e7",
  padding: "32px",
  maxWidth: "560px",
  margin: "0 auto",
};

const brandSection = {
  paddingBottom: "8px",
};

const brandText = {
  fontSize: "12px",
  fontWeight: "bold",
  color: "#71717a",
  letterSpacing: "0.1em",
  margin: "0",
};

const heading = {
  fontSize: "18px",
  fontWeight: "700",
  letterSpacing: "-0.02em",
  color: "#e11d48", // Dark Rose accent for security context
  margin: "24px 0 16px 0",
};

const paragraph = {
  fontSize: "13px",
  lineHeight: "20px",
  color: "#3f3f46",
  margin: "0 0 16px 0",
};

const btnContainer = {
  margin: "28px 0",
};

const button = {
  backgroundColor: "#e11d48",
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "bold",
  textDecoration: "none",
  padding: "12px 24px",
  display: "inline-block",
  border: "1px solid #e11d48",
};

const linkStyle = {
  color: "#2563eb",
  fontSize: "11px",
  wordBreak: "break-all" as const,
};

const hr = {
  borderColor: "#e4e4e7",
  margin: "20px 0",
};

const footerText = {
  fontSize: "11px",
  lineHeight: "16px",
  color: "#a1a1aa",
  margin: "0",
};