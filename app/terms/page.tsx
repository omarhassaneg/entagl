import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Entagl",
  description: "Terms of Service for using Entagl's platform and API integrations",
};

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-6">Last updated: December 28, 2024</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Entagl's services ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p>
            Entagl provides a platform that integrates with social media services, specifically Facebook and Instagram, to help users manage their social media presence. Our services include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Social media account management</li>
            <li>Automated messaging and responses</li>
            <li>Content management and scheduling</li>
            <li>Analytics and reporting</li>
            <li>Premium features (paid subscription)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Payment Terms</h2>
          <h3 className="text-xl font-semibold mb-3">3.1 Payment Processing</h3>
          <p>
            We use Stripe as our payment processor for all transactions. By making a payment, you agree to Stripe's services agreement and privacy policy.
          </p>
          
          <h3 className="text-xl font-semibold mb-3 mt-4">3.2 Subscription Terms</h3>
          <p>
            Paid subscriptions are billed in advance on a recurring basis. You authorize us to charge your payment method for all applicable fees.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-4">3.3 Refund Policy</h3>
          <p>
            We handle refund requests on a case-by-case basis according to the following guidelines:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Requests must be submitted within 14 days of purchase</li>
            <li>Service must not have been substantially used</li>
            <li>Account must be in good standing</li>
            <li>Refunds will be processed through the original payment method</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-4">3.4 Cancellation Policy</h3>
          <p>
            You may cancel your subscription at any time. Upon cancellation:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access to premium features will continue until the end of the current billing period</li>
            <li>No partial refunds will be issued for unused time</li>
            <li>You will not be charged for future billing periods</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Customer Service</h2>
          <p>
            For any questions, concerns, or support needs:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Email: info@entagl.com</li>
            <li>Contact form: Available on our contact page</li>
            <li>Response time: Within 24 hours during business days</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. User Accounts and Responsibilities</h2>
          <h3 className="text-xl font-semibold mb-3">5.1 Account Creation</h3>
          <p>
            To use our Service, you must create an account and connect your social media profiles. You agree to provide accurate, current, and complete information during registration.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-4">5.2 Account Security</h3>
          <p>
            You are responsible for maintaining the security of your account and password. Entagl cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-4">5.3 API Usage</h3>
          <p>
            When using our Service with Facebook and Instagram APIs, you agree to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Comply with all applicable social media platform terms and policies</li>
            <li>Not exceed API rate limits or abuse the service</li>
            <li>Not use the service for unauthorized automation or spam</li>
            <li>Maintain necessary permissions and consents</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property Rights</h2>
          <p>
            The Service and its original content, features, and functionality are owned by Entagl and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Content Guidelines</h2>
          <p>You agree not to use the Service to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Violate any laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Harass, abuse, or harm others</li>
            <li>Spread malware or viruses</li>
            <li>Generate spam or unauthorized advertising</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Third-Party Services</h2>
          <p>
            Our Service integrates with Facebook and Instagram through their APIs. Your use of these integrations is subject to their respective terms of service:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><a href="https://www.facebook.com/terms.php" className="text-blue-600 hover:underline">Facebook Terms of Service</a></li>
            <li><a href="https://help.instagram.com/581066165581870" className="text-blue-600 hover:underline">Instagram Terms of Use</a></li>
            <li><a href="https://stripe.com/legal" className="text-blue-600 hover:underline">Stripe Services Agreement</a></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
          <p>
            In no event shall Entagl, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your access to or use of or inability to access or use the Service</li>
            <li>Any conduct or content of any third party on the Service</li>
            <li>Any content obtained from the Service</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
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