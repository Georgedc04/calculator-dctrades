import ForexCalculator from "@/components/calculator/ForexCalculator";

export default function Page() {
  return (
    <>
      {/* ✅ Structured Data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "DC Trades Calculator",
            operatingSystem: "Web",
            applicationCategory: "FinanceApplication",
            description:
              "Forex pip, lot size and risk calculator for traders",
            url: "https://calculator.dctrades.in",
          }),
        }}
      />

      <ForexCalculator />
    </>
  );
}
