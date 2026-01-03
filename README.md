# AI Phone Caller - Next.js Demo App

Eine moderne Next.js 14 Anwendung für personalisierte KI-Telefon-Assistentin Demos mit VAPI Integration.

## 🚀 Features

- **Dynamische Landing Pages**: Personalisierte Demo-Seiten basierend auf Lead-Slugs
- **VAPI Integration**: Vollständig integrierter Voice AI Assistant
- **Supabase Backend**: Sichere und skalierbare Datenspeicherung
- **Responsive Design**: Optimiert für Desktop, Tablet und Mobile
- **TypeScript**: Vollständig typsicher
- **Tailwind CSS**: Modernes, anpassbares Design
- **SEO-optimiert**: Dynamische Meta-Tags für jede Seite
- **Error Handling**: Umfassende Fehlerbehandlung und Loading States

## 📋 Voraussetzungen

- Node.js 18.x oder höher
- npm oder yarn
- Supabase Account
- VAPI Account

## 🛠️ Installation

1. **Repository klonen oder Projekt erstellen:**

```bash
cd C:\dev\projects\ai_phone_caller
```

2. **Dependencies installieren:**

```bash
npm install
```

3. **Environment Variables konfigurieren:**

Erstellen Sie eine `.env.local` Datei im Root-Verzeichnis (oder bearbeiten Sie die existierende):

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key
```

4. **Supabase Datenbank Setup:**

Führen Sie folgendes SQL in Ihrem Supabase SQL Editor aus:

```sql
-- Create leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  vapi_agent_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX idx_leads_slug ON leads(slug);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access (adjust as needed)
CREATE POLICY "Allow public read access" ON leads
  FOR SELECT USING (true);

-- Insert example data
INSERT INTO leads (slug, company_name, first_name, email, vapi_agent_id)
VALUES (
  'akkadia-immobilien',
  'Akkadia Immobilien',
  'Max',
  'max@akkadia-immobilien.de',
  'your_vapi_agent_id_here'
);
```

## 🏃‍♂️ Development

Starten Sie den Development Server:

```bash
npm run dev
```

Die App ist nun unter [http://localhost:3000](http://localhost:3000) erreichbar.

## 🏗️ Production Build

```bash
npm run build
npm start
```

## 📁 Projektstruktur

```
ai_phone_caller/
├── app/
│   ├── [slug]/
│   │   ├── page.tsx          # Dynamische Lead-Seite
│   │   ├── loading.tsx       # Loading State
│   │   ├── error.tsx         # Error Handling
│   │   └── not-found.tsx     # 404 für ungültige Slugs
│   ├── layout.tsx            # Root Layout
│   ├── page.tsx              # Home (redirect zu /demo)
│   ├── not-found.tsx         # Global 404
│   └── globals.css           # Global Styles
├── components/
│   ├── VapiWidget.tsx        # VAPI Voice Widget Component
│   └── ErrorBoundary.tsx     # Error Boundary Component
├── lib/
│   └── supabase.ts           # Supabase Client Config
├── types/
│   └── index.ts              # TypeScript Type Definitions
├── public/                   # Static Assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── .env.local
```

## 🎨 Customization

### Farben anpassen

Bearbeiten Sie `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Ihre Custom Colors hier
  },
}
```

### Texte anpassen

Alle deutschen Texte befinden sich direkt in den Komponenten und können leicht angepasst werden.

## 🔧 API Endpoints

Die App nutzt Supabase für die Datenverwaltung. Alle Abfragen erfolgen über den Supabase Client.

## 📱 Verwendung

1. Navigieren Sie zu `http://localhost:3000/[ihr-slug]` (z.B. `/akkadia-immobilien`)
2. Die personalisierte Landing Page wird geladen
3. Klicken Sie auf "Anruf starten", um mit der KI-Assistentin zu sprechen
4. Testen Sie die verschiedenen Features

## 🚀 Deployment auf Netlify

1. Repository zu GitHub pushen
2. In Netlify: "New site from Git" auswählen
3. Repository verbinden
4. Build Settings:
   - Build Command: `npm run build`
   - Publish Directory: `.next`
5. Environment Variables hinzufügen
6. Deploy!

### Netlify Configuration

Die `next.config.js` ist bereits für Netlify optimiert mit `output: 'standalone'`.

## 🔐 Sicherheit

- Alle Environment Variables mit `NEXT_PUBLIC_` Prefix sind client-seitig verfügbar
- Verwenden Sie Supabase Row Level Security für Produktionsumgebungen
- Niemals private Keys im Frontend verwenden

## 🐛 Troubleshooting

### VAPI lädt nicht
- Überprüfen Sie den `NEXT_PUBLIC_VAPI_PUBLIC_KEY` in `.env.local`
- Prüfen Sie die Browser-Konsole auf Fehler
- Stellen Sie sicher, dass die VAPI Agent ID korrekt ist

### Supabase Verbindungsfehler
- Überprüfen Sie URL und Anon Key
- Prüfen Sie die Supabase Dashboard auf API-Limits
- Stellen Sie sicher, dass die `leads` Tabelle existiert

### Build Fehler
- Löschen Sie `.next` und `node_modules`
- Führen Sie `npm install` erneut aus
- Überprüfen Sie TypeScript Errors mit `npm run lint`

## 📝 License

MIT License - siehe LICENSE Datei

## 👥 Support

Bei Fragen oder Problemen erstellen Sie bitte ein Issue im Repository.

## 🎯 Roadmap

- [ ] Admin Dashboard für Lead-Verwaltung
- [ ] Analytics Integration
- [ ] Multi-Language Support
- [ ] A/B Testing Features
- [ ] CRM Integration

---

Entwickelt mit ❤️ und Next.js 14
