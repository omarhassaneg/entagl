import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Entagl",
  description: "Privacy Policy for Entagl's use of Facebook and Instagram APIs",
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-6">Last updated: December 28, 2024</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Welcome to Entagl ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services, particularly in connection with Facebook and Instagram integrations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-semibold mb-3">2.1 Payment Information</h3>
          <p>When you make a payment, we process your payment information through Stripe, our secure payment processor. During this process:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Payment card details are securely collected and processed directly by Stripe</li>
            <li>We receive only limited information about your payment method (such as the last four digits of your card)</li>
            <li>Billing address and contact information for payment verification</li>
            <li>Transaction history related to your purchases</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">2.2 Information from Social Media Platforms</h3>
          <p>When you connect your Facebook or Instagram account, we may collect:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Profile information (name, username, profile picture)</li>
            <li>Email address</li>
            <li>Posts, comments, and media content</li>
            <li>Account interactions and engagement data</li>
            <li>Messages (when using our messaging features)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">2.2 Permissions We Request</h3>
          <p>We request the following permissions through Facebook and Instagram APIs:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Basic profile information access</li>
            <li>Access to posts and media content</li>
            <li>Permission to read and send messages</li>
            <li>Ability to read and respond to comments</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide and maintain our services</li>
            <li>Send and receive messages on your behalf</li>
            <li>Manage your social media interactions</li>
            <li>Analyze and improve our services</li>
            <li>Ensure security and prevent fraud</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Storage and Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your information. Your data is stored securely and accessed only when necessary to provide our services.
          </p>
          <p>
            We retain your information only for as long as necessary to provide our services and fulfill the purposes outlined in this policy. You can request deletion of your data at any time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights and Controls</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent for data processing</li>
            <li>Revoke access to your social media accounts</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>
          <p>
            Our service integrates with Facebook and Instagram through their official APIs. When you use these integrations, you are also subject to their respective privacy policies:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><a href="https://www.facebook.com/privacy/policy/" className="text-blue-600 hover:underline">Facebook Privacy Policy</a></li>
            <li><a href="https://help.instagram.com/519522125107875" className="text-blue-600 hover:underline">Instagram Privacy Policy</a></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our practices, please contact us at:
          </p>
          <p className="mt-2">
            Email: info@entagl.com<br />
            Address: Toronto, Ontario
          </p>
        </section>
      </div>
    </div>
  );
}