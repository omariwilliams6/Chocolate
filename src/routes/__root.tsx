import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { LanguageProvider } from "@/lib/i18n";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="display-lg mt-6">Pagina non trovata</h1>
        <p className="subtitle-en mt-3">Page not found</p>
        <div className="mt-10">
          <Link to="/" className="btn-luxury">Torna alla maison</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display-md">Qualcosa è andato storto</h1>
        <p className="subtitle-en mt-3">Something went wrong</p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-luxury"
          >
            Riprova
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Maison Rizzati · Cioccolato Italiano d'Eccellenza" },
      {
        name: "description",
        content:
          "Maison Rizzati — cioccolato artigianale italiano servito sopra le nuvole. Una collezione raffinata in collaborazione con Lufthansa.",
      },
      { name: "author", content: "Maison Rizzati" },
      { property: "og:title", content: "Maison Rizzati · Cioccolato Italiano d'Eccellenza" },
      { property: "og:description", content: "Aetheria Chocolat is a luxury chocolate brand website designed for international prestige and premium customer engagement." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Maison Rizzati · Cioccolato Italiano d'Eccellenza" },
      { name: "description", content: "Aetheria Chocolat is a luxury chocolate brand website designed for international prestige and premium customer engagement." },
      { name: "twitter:description", content: "Aetheria Chocolat is a luxury chocolate brand website designed for international prestige and premium customer engagement." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/10a6043b-0da4-46d8-9c82-d7d5ca18b170/id-preview-8625f163--35cfa906-1339-4054-a1e0-0d71f6548f4c.lovable.app-1778755897092.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/10a6043b-0da4-46d8-9c82-d7d5ca18b170/id-preview-8625f163--35cfa906-1339-4054-a1e0-0d71f6548f4c.lovable.app-1778755897092.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col">
          <SiteHeader />
          <main className="flex-1">
            <Outlet />
          </main>
          <SiteFooter />
        </div>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
