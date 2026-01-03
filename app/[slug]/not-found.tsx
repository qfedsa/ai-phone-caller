import { notFound } from 'next/navigation';

/**
 * Custom 404 page for invalid slugs in the dynamic route
 */
export default function SlugNotFound() {
  return notFound();
}
