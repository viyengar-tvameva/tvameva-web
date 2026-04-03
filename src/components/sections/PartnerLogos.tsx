export function PartnerLogos() {
  const partners = [
    { name: 'Acquia', label: 'Strategic Implementation Partner' },
    { name: 'Google Cloud', label: 'GCP Partner' },
    { name: 'Salesforce', label: 'CRM Integration' },
  ];

  return (
    <section className="py-10 border-b border-brand-border/50">
      <div className="section-container">
        <div className="flex flex-col items-center">
          <p className="text-xs font-mono text-brand-gray-500 uppercase tracking-widest mb-6">
            Platform ecosystem partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex flex-col items-center gap-1 opacity-50 hover:opacity-90 transition-opacity cursor-default"
              >
                <span className="text-base font-display font-medium text-brand-gray-200">
                  {partner.name}
                </span>
                <span className="text-[10px] font-mono text-brand-gray-500 tracking-wide">
                  {partner.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
