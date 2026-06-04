import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Preview,
  Section,
  Hr,
  Link,
} from "@react-email/components";
import * as React from "react";
import { WelcomeEmailProps } from "@/interfaces/email";

export const WelcomeEmailTemplate = ({ name }: WelcomeEmailProps) => (
  <Html>
    <Preview>Successfully established workspace node for {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Logo / Branding */}
        <Section style={brandSection}>
          <Text style={brandText}>DEVLOG // ONBOARDING</Text>
        </Section>
        
        <Hr style={hr} />

        {/* Content */}
        <Heading style={heading}>Welcome to the Grid</Heading>
        <Text style={paragraph}>Hi {name},</Text>
        <Text style={paragraph}>
          Your developer workspace has been successfully provisioned. You can now start logging your daily progress, tracking technical growth, and managing your engineering journal.
        </Text>
        
        {/* Call to Action */}
        <Section style={btnContainer}>
          <Link href="https://devlog.rakib.com/dashboard" style={button}>
            INITIALIZE DASHBOARD
          </Link>
        </Section>
        
        <Text style={paragraph}>
          We recommend establishing a daily sync pattern to maintain high-fidelity records of your development cycle.
        </Text>

        <Hr style={hr} />
        
        {/* Footer */}
        <Text style={footerText}>
          You are receiving this because you successfully verified your node on the DevLog platform.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmailTemplate;

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
  color: "#09090b",
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
  backgroundColor: "#09090b",
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "bold",
  textDecoration: "none",
  padding: "12px 24px",
  display: "inline-block",
  border: "1px solid #09090b",
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
