import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Research',
  description: 'Redirecting to publications.',
};

export default function ResearchPage() {
  redirect('/publications');
}
