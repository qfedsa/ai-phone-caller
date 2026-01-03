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
 */
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Erleben Sie {lead.company_name}&apos;s
              <br />
              <span className="text-primary-600">KI-Telefon-Assistentin Sarah</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Testen Sie jetzt live, wie Sarah Ihre Immobilien-Interessenten qualifiziert
            </p>
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
              Verfügbar für einen Test-Anruf
            </div>
          </div>

          {/* VAPI Widget */}
          <div className="mb-16">
            <VapiWidget agentId={lead.vapi_agent_id} companyName={lead.company_name} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Warum Sarah perfekt für Ihr Unternehmen ist
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100/50 border border-primary-200">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Sofortige Reaktion</h4>
              <p className="text-gray-600">
                Sarah antwortet innerhalb von Sekunden auf Anfragen - kein Lead geht verloren, keine Wartezeit für Ihre Kunden.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100/50 border border-primary-200">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">24/7 Verfügbar</h4>
              <p className="text-gray-600">
                Während Sie schlafen, arbeitet Sarah. Morgens, abends, am Wochenende - Ihre Leads werden immer betreut.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100/50 border border-primary-200">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Intelligente Qualifizierung</h4>
              <p className="text-gray-600">
                Sarah stellt die richtigen Fragen, erfasst alle wichtigen Informationen und übergibt nur qualifizierte Leads an Sie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            So funktioniert es
          </h3>
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Anruf starten</h4>
                <p className="text-gray-600">
                  Klicken Sie auf &quot;Anruf starten&quot; um ein Gespräch mit Sarah zu beginnen. Die Verbindung erfolgt in Sekunden.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Mit Sarah sprechen</h4>
                <p className="text-gray-600">
                  Führen Sie ein natürliches Gespräch. Sarah versteht Ihre Fragen und antwortet kontextbezogen - wie ein echter Mensch.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Informationen erfassen</h4>
                <p className="text-gray-600">
                  Sarah erfasst alle relevanten Informationen, qualifiziert Ihr Interesse und leitet die Daten direkt an das Vertriebsteam weiter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Interesse an dieser Technologie für Ihr Unternehmen?
          </h3>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Hallo {lead.first_name}, erleben Sie selbst, wie eine KI-Telefon-Assistentin Ihre Lead-Qualifizierung revolutionieren kann.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`mailto:${lead.email}?subject=Interesse an KI-Telefon-Assistentin für ${lead.company_name}`}
              className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Kontakt aufnehmen
            </a>
          </div>
          <p className="text-primary-200 text-sm mt-6">
            Wir melden uns innerhalb von 24 Stunden bei Ihnen
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} {lead.company_name}. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs mt-2">
            Diese Demo wurde personalisiert für {lead.first_name} ({lead.email})
          </p>
        </div>
      </footer>
    </div>
  );
}
