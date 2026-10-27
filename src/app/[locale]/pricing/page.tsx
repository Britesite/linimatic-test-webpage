import type { Metadata } from "next";
import { buildMetadata, type Locale } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/pricing",
    title: t("pricing.title"),
    description: t("pricing.description"),
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pricingPage");

  const packages = t.raw("packages") as Array<{
    name: string;
    tagline: string;
    price: string;
    features: string[];
  }>;

  return (
    <>
      <Breadcrumbs items={[{ label: t("breadcrumb"), href: "/pricing" }]} />

      <section className="bg-zinc-50 pb-16">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-ember" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]">
              {t("eyebrow")}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-[-0.02em] leading-[1.05] font-[family-name:var(--font-display)]">
            {t("heading")}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-600 leading-relaxed max-w-3xl">
            {t("intro")}
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-zinc-200">
            {packages.map((pkg, i) => (
              <div key={pkg.name} className="bg-white p-8 sm:p-10 flex flex-col">
                <span className="font-[family-name:var(--font-mono)] text-xl font-bold text-ember">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-2xl font-semibold text-zinc-900 font-[family-name:var(--font-display)]">
                  {pkg.name}
                </h2>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                  {pkg.tagline}
                </p>
                <p className="mt-6 text-lg font-semibold text-zinc-900 font-[family-name:var(--font-mono)]">
                  {pkg.price}
                </p>
                <ul className="mt-6 space-y-3 text-sm text-zinc-700 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="text-ember" aria-hidden="true">
                        —
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center justify-center bg-ember hover:bg-ember-light px-6 py-3 text-sm font-semibold tracking-wide uppercase text-zinc-950 transition-all"
                >
                  {t("button")}
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-zinc-600 max-w-3xl">{t("note")}</p>
        </div>
      </section>
    </>
  );
}
