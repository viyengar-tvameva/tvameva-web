import Link from 'next/link';

const footerLinks = {
  solutions: [
    { label: 'EngageOS', href: '/solutions/engageos' },
    { label: 'InsightLens', href: '/solutions/insightlens' },
    { label: 'PropelEdge', href: '/solutions/propeledge' },
  ],
  company: [
    { label: 'How We Deliver', href: '/how-we-deliver' },
    { label: 'Customer Success', href: '/results' },
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
  ],
  resources: [
    { label: 'Advisory Assessments', href: '/advisory' },
    { label: 'AI Maturity Assessment', href: '/advisory/ai-maturity' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-navy">
      <div className="section-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-block">
              <img
                src="/logo-dark-bg.png"
                alt="tvameva.ai"
                className="h-7 w-auto"
              />
            </Link>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-display font-semibold text-white mb-4">Solutions</h4>
            <ul className="space-y-2.5">
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-brand-gray-400 hover:text-brand-amber transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-display font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-brand-gray-400 hover:text-brand-amber transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-display font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-brand-gray-400 hover:text-brand-amber transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-display font-semibold text-white mb-4">Get Started</h4>
            <Link href="/advisory" className="btn-primary text-sm px-4 py-2">
              Schedule Assessment
            </Link>
            <Link href="/contact" className="block mt-4 text-sm text-brand-gray-400 hover:text-brand-amber transition-colors">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-brand-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-gray-500">
            &copy; {new Date().getFullYear()} Tvameva. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-brand-gray-500 hover:text-brand-gray-300 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
