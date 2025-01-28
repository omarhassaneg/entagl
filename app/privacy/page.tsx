import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Entagl",
  description: "Privacy Policy for Entagl's use of Facebook and Instagram APIs",
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl scroll-smooth">
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

        <section id="deletemyinfo" className="mb-8 scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">9. Data Deletion Policy for Meta Developer Apps</h2>
          <p className="mb-4">
            In compliance with Meta's Developer Policies, we provide users with the ability to request the deletion of their data. Below are the instructions and procedures for users to request data deletion from our application.
          </p>

          <h3 className="text-xl font-semibold mb-3">How to Request Data Deletion</h3>
          <p className="mb-4">
            If you would like to request the deletion of your personal data from our app, please follow the steps below:
          </p>

          <ol className="list-decimal pl-6 mb-4">
            <li className="mb-2">
              <strong>Contact Us by Email:</strong><br />
              Send an email to <strong>info@entagl.com</strong> with the subject line: "Data Deletion Request."
            </li>
            <li className="mb-2">
              <strong>Include Necessary Details:</strong><br />
              In your email, please provide the following information to help us process your request:
              <ul className="list-disc pl-6 mt-2">
                <li>Your full name</li>
                <li>Your account username or email associated with the app</li>
                <li>Any additional details to help identify your account or data (e.g., specific activity or service you used within the app)</li>
              </ul>
            </li>
            <li className="mb-2">
              <strong>Processing Your Request:</strong><br />
              Once we receive your request, we will:
              <ul className="list-disc pl-6 mt-2">
                <li>Verify your identity to ensure the request is legitimate</li>
                <li>Remove your data from our records in accordance with applicable laws and our data retention policies</li>
                <li>Confirm the completion of your data deletion request via email</li>
              </ul>
            </li>
          </ol>

          <h3 className="text-xl font-semibold mb-3">Data Deletion Timeline</h3>
          <p className="mb-4">
            We aim to process all data deletion requests within <strong>30 days</strong> of receipt. However, in rare cases, additional time may be required depending on the complexity of the request or technical constraints.
          </p>

          <h3 className="text-xl font-semibold mb-3">Additional Notes</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Third-Party Services:</strong> If you used third-party services integrated with our app, you may need to contact those services directly to request data deletion from their records.</li>
            <li><strong>Data Retention Requirements:</strong> Certain data may be retained as required by law or for legitimate business purposes, such as preventing fraud or resolving disputes.</li>
          </ul>

          <p>
            If you have any questions about our Data Deletion Policy or need further assistance, please don't hesitate to reach out to us at <strong>info@entagl.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}