import {
  BadgeDollarSign,
  Banknote,
  Building2,
  ChevronDown,
  CircleDollarSign,
  Home,
  Landmark,
  PiggyBank,
  Shield,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";

function SectionTitle({ number, children }) {
  return (
    <div className="mb-4 flex items-start gap-2">
      <span className="text-sm font-black text-[#8b1117] md:text-base">
        {number}.
      </span>

      <h2 className="text-sm font-black uppercase leading-5 tracking-wide text-[#781318] md:text-base">
        {children}
      </h2>
    </div>
  );
}

function PaymentPartCard({
  icon: Icon,
  shortLabel,
  title,
  description,
}) {
  return (
    <article className="rounded-xl border border-[#eadfca] bg-[#fffaf1] px-4 py-4 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#e2c995] bg-white text-[#8a1519]">
        <Icon
          className="h-6 w-6"
          strokeWidth={1.9}
          aria-hidden="true"
        />
      </div>

      <p className="mt-3 text-xs font-black uppercase text-[#741518]">
        {shortLabel}
      </p>

      <h3 className="mt-2 text-sm font-extrabold leading-5 text-[#5b2829]">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-[#62564c]">
        {description}
      </p>
    </article>
  );
}

function IncreaseCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <article className="flex items-start gap-4 rounded-xl border border-[#eadfca] bg-[#fffaf1] p-4 shadow-sm">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#f6ead2] text-[#b0711f]">
        <Icon
          className="h-7 w-7"
          strokeWidth={1.9}
          aria-hidden="true"
        />
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-black leading-5 text-[#80161a]">
          {title}
        </h3>

        <p className="mt-1.5 text-xs leading-5 text-[#62564c]">
          {description}
        </p>
      </div>
    </article>
  );
}

function FaqItem({ question, answer }) {
  return (
    <details className="group rounded-xl border border-[#eadfca] bg-[#fffdf8] px-4 py-3 shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-extrabold leading-5 text-[#5b2829]">
        <span>{question}</span>

        <ChevronDown
          className="h-5 w-5 shrink-0 text-[#8b1117] transition-transform duration-200 group-open:rotate-180"
          strokeWidth={2}
          aria-hidden="true"
        />
      </summary>

      <p className="mt-3 border-t border-[#eee3d1] pt-3 text-xs leading-5 text-[#62564c]">
        {answer}
      </p>
    </details>
  );
}

export default function MortgageFooter() {
  const { t } = useTranslation();

  const paymentParts = [
    {
      icon: Home,
      shortLabel: t(
        "mortgageFooter.paymentParts.principal.shortLabel",
      ),
      title: t(
        "mortgageFooter.paymentParts.principal.title",
      ),
      description: t(
        "mortgageFooter.paymentParts.principal.description",
      ),
    },
    {
      icon: BadgeDollarSign,
      shortLabel: t(
        "mortgageFooter.paymentParts.interest.shortLabel",
      ),
      title: t(
        "mortgageFooter.paymentParts.interest.title",
      ),
      description: t(
        "mortgageFooter.paymentParts.interest.description",
      ),
    },
    {
      icon: Landmark,
      shortLabel: t(
        "mortgageFooter.paymentParts.taxes.shortLabel",
      ),
      title: t(
        "mortgageFooter.paymentParts.taxes.title",
      ),
      description: t(
        "mortgageFooter.paymentParts.taxes.description",
      ),
    },
    {
      icon: Shield,
      shortLabel: t(
        "mortgageFooter.paymentParts.insurance.shortLabel",
      ),
      title: t(
        "mortgageFooter.paymentParts.insurance.title",
      ),
      description: t(
        "mortgageFooter.paymentParts.insurance.description",
      ),
    },
    {
      icon: ShieldCheck,
      shortLabel: t(
        "mortgageFooter.paymentParts.mortgageInsurance.shortLabel",
      ),
      title: t(
        "mortgageFooter.paymentParts.mortgageInsurance.title",
      ),
      description: t(
        "mortgageFooter.paymentParts.mortgageInsurance.description",
      ),
    },
    {
      icon: Users,
      shortLabel: t(
        "mortgageFooter.paymentParts.hoa.shortLabel",
      ),
      title: t(
        "mortgageFooter.paymentParts.hoa.title",
      ),
      description: t(
        "mortgageFooter.paymentParts.hoa.description",
      ),
    },
  ];

  const monthlyIncreases = [
    {
      icon: TrendingUp,
      title: t(
        "mortgageFooter.increases.morePayment.title",
      ),
      description: t(
        "mortgageFooter.increases.morePayment.description",
      ),
    },
    {
      icon: PiggyBank,
      title: t(
        "mortgageFooter.increases.lessPayment.title",
      ),
      description: t(
        "mortgageFooter.increases.lessPayment.description",
      ),
    },
    {
      icon: Users,
      title: t(
        "mortgageFooter.increases.yourDecision.title",
      ),
      description: t(
        "mortgageFooter.increases.yourDecision.description",
      ),
    },
  ];

  const faqs = [
    {
      question: t(
        "mortgageFooter.faqs.monthlyPayment.question",
      ),
      answer: t(
        "mortgageFooter.faqs.monthlyPayment.answer",
      ),
    },
    {
      question: t(
        "mortgageFooter.faqs.includes.question",
      ),
      answer: t(
        "mortgageFooter.faqs.includes.answer",
      ),
    },
    {
      question: t(
        "mortgageFooter.faqs.paymentChanges.question",
      ),
      answer: t(
        "mortgageFooter.faqs.paymentChanges.answer",
      ),
    },
    {
      question: t(
        "mortgageFooter.faqs.pmiMip.question",
      ),
      answer: t(
        "mortgageFooter.faqs.pmiMip.answer",
      ),
    },
    {
      question: t(
        "mortgageFooter.faqs.moreDownPayment.question",
      ),
      answer: t(
        "mortgageFooter.faqs.moreDownPayment.answer",
      ),
    },
    {
      question: t(
        "mortgageFooter.faqs.principalInterest.question",
      ),
      answer: t(
        "mortgageFooter.faqs.principalInterest.answer",
      ),
    },
  ];

  return (
    <footer className="mt-6 overflow-hidden rounded-xl border border-[#e5d9c4] bg-white shadow-sm">
      <div className="space-y-8 p-5 md:p-6">
        {/* Composición del pago */}
        <section>
          <SectionTitle number="3">
            {t("mortgageFooter.composition.title")}
          </SectionTitle>

          <p className="mb-5 max-w-5xl text-sm leading-6 text-[#62564c]">
            {t("mortgageFooter.composition.description")}
          </p>

          <div className="mb-5 flex flex-wrap items-center justify-center gap-3 text-[#8a1519]">
            {paymentParts.map(
              ({ icon: Icon, shortLabel }, index) => (
                <div
                  key={`${shortLabel}-${index}`}
                  className="flex items-center gap-3"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e4c991] bg-[#fffaf1]">
                      <Icon
                        className="h-6 w-6"
                        strokeWidth={1.9}
                        aria-hidden="true"
                      />
                    </div>

                    <span className="mt-1.5 text-xs font-bold text-[#5b2829]">
                      {shortLabel}
                    </span>
                  </div>

                  {index < paymentParts.length - 1 && (
                    <span
                      className="text-lg font-black text-[#9b3a3d]"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  )}
                </div>
              ),
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {paymentParts.map((part, index) => (
              <PaymentPartCard
                key={`${part.shortLabel}-${index}`}
                {...part}
              />
            ))}
          </div>
        </section>

        {/* Incremento mensual */}
        <section>
          <SectionTitle number="4">
            {t("mortgageFooter.increases.title")}
          </SectionTitle>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {monthlyIncreases.map((item, index) => (
              <IncreaseCard
                key={`${item.title}-${index}`}
                {...item}
              />
            ))}
          </div>
        </section>

        {/* Preguntas frecuentes */}
        <section>
          <SectionTitle number="5">
            {t("mortgageFooter.faqs.title")}
          </SectionTitle>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <FaqItem
                key={`${faq.question}-${index}`}
                {...faq}
              />
            ))}
          </div>
        </section>

        {/* Notas */}
        <section>
          <SectionTitle number="6">
            {t("mortgageFooter.notes.title")}
          </SectionTitle>

          <div className="grid grid-cols-1 gap-5 rounded-xl border border-[#eadfca] bg-[#fffaf1] p-5 md:grid-cols-2">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#dec18b] bg-white text-[#9a5f18]">
                <ShieldCheck
                  className="h-6 w-6"
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
              </div>

              <div>
                <h3 className="text-sm font-black leading-5 text-[#741518]">
                  {t("mortgageFooter.notes.estimates.title")}
                </h3>

                <ul className="mt-2 list-outside list-disc space-y-2 pl-4 text-xs leading-5 text-[#62564c]">
                  <li>
                    {t(
                      "mortgageFooter.notes.estimates.first",
                    )}
                  </li>

                  <li>
                    {t(
                      "mortgageFooter.notes.estimates.second",
                    )}
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#dec18b] bg-white text-[#9a5f18]">
                <Banknote
                  className="h-6 w-6"
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
              </div>

              <div>
                <h3 className="text-sm font-black leading-5 text-[#741518]">
                  {t("mortgageFooter.notes.lender.title")}
                </h3>

                <ul className="mt-2 list-outside list-disc space-y-2 pl-4 text-xs leading-5 text-[#62564c]">
                  <li>
                    {t(
                      "mortgageFooter.notes.lender.first",
                    )}
                  </li>

                  <li>
                    {t(
                      "mortgageFooter.notes.lender.second",
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Franja inferior */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#67070c] via-[#8e0b11] to-[#67070c] px-5 py-4 text-white">
        <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d9a64a] bg-[#7a1115] text-[#e8bd5b]">
            <CircleDollarSign
              className="h-6 w-6"
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </div>

          <p className="max-w-3xl text-sm font-semibold leading-6">
            {t("mortgageFooter.bottomMessage")}
          </p>
        </div>

        <div className="pointer-events-none absolute -bottom-5 right-4 hidden rotate-[-10deg] text-[#d7a43e] opacity-40 md:block">
          <Building2
            className="h-16 w-16"
            strokeWidth={1.4}
            aria-hidden="true"
          />
        </div>
      </div>
    </footer>
  );
}