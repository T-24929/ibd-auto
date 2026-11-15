import { ContactForm } from '../components/ContactForm';
import { ContactInfo } from '../components/ContactInfo';

export function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 p-4">
      <h1 className="text-2xl font-semibold text-foreground">Contact IBD Auto</h1>
      <p className="text-sm text-muted-foreground">
        Get in touch with us for enquiries, appointments, or any questions.
      </p>
      <ContactForm />
      <ContactInfo />
    </div>
  );
}
