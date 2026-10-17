import { permanentRedirect } from 'next/navigation';
export default function SpeakingRequestPage() {
  permanentRedirect('/contact?category=Workshop%20Request');
}
