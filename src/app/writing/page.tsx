import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Writing',
  description: 'Redirecting to publications.',
};

export default function WritingPage() {
  redirect('/publications');
}
