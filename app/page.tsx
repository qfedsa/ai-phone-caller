import { redirect } from 'next/navigation';

/**
 * Root page - redirects to /demo
 * This allows for a clean entry point while maintaining the dynamic routing structure
 */
export default function HomePage() {
  redirect('/demo');
}
