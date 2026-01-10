import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLeadBySlug, Lead } from '@/lib/supabase';
import VapiWidget from '@/components/VapiWidget';

interface PageProps {
  params: {
    slug: string;
  };
}

/**
 * Generate metadata for SEO based on lead data
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lead = await getLeadBySlug(params.slug);

  if (!lead) {
    return {
      title: 'Seite nicht gefunden',
      description: 'Die angeforderte Seite existiert nicht.',
    };
  }

  return {
    title: `${lead.company_name} - KI-Telefon-Assistentin Demo`,
    description: `Erleben Sie ${lead.company_name}'s KI-Telefon-Assistentin Sarah. Testen Sie jetzt live, wie Sarah Ihre Immobilien-Interessenten qualifiziert.`,
    openGraph: {
      title: `${lead.company_name} - KI-Telefon-Assistentin Sarah`,
      description: `Erleben Sie die Zukunft der Kundenqualifizierung mit ${lead.company_name}`,
      type: 'website',
    },
  };
}

/**
 * Dynamic route page for personalized lead demos
 * Displays a personalized landing page with VAPI widget
 * 
 * IMPORTANT: This page must NOT be cached as it contains dynamic lead data
 * that changes frequently via Make.com workflow
 */

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LeadPage({ params }: PageProps) {
  const lead = await getLeadBySlug(params.slug);

  // Show 404 if lead not found
  if (!lead) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Logo Placeholder */}
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {lead.company_name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{lead.company_name}</h1>
                <p className="text-sm text-gray-600">KI-Telefon-Assistentin Demo</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Hallo <span className="text-primary-600">{lead.first_name}</span>, erleben Sie, wie KI die Lead-Qualifizierung für <span className="text-primary-600">{lead.company_name}</span> revolutionieren kann.
            </h2>
          </div>

          {/* VAPI Widget */}
          <div className="mb-16">
            <VapiWidget agentId={lead.vapi_agent_id} companyName={lead.company_name} />
          </div>
        </div>
      </section>
    </div>
  );
}
