'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';

const navItems = [
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'EngageOS', href: '/solutions/engageos', tag: 'Acquia / Drupal' },
      { label: 'InsightLens', href: '/solutions/insightlens', tag: 'Google Cloud' },
      { label: 'ResolveIQ', href: '/solutions/resolveiq', tag: 'Salesforce / Oracle' },
      { label: 'SearchCore', href: '/solutions/searchcore', tag: 'Algolia' },
      { label: 'VisualForge', href: '/solutions/visualforge', tag: 'Threekit' },
    ],
  },
  { label: 'How We Deliver', href: '/how-we-deliver' },
  { label: 'Results', href: '/results' },
  { label: 'Advisory', href: '/advisory' },
  { label: 'About', href: '/about' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/solutions') return pathname.startsWith('/solutions');
    return pathname === href;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-navy/90 backdrop-blur-xl border-b border-brand-border/50">
      <div className="section-container">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <
              Logo className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className={isActive(item.href) ? 'nav-link-active flex items-center gap-1' : 'nav-link flex items-center gap-1'}>
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-brand-navy-card border border-brand-border rounded-card shadow-2xl shadow-black/40 p-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center justify-between px-4 py-3 rounded-lg transition-colors hover:bg-brand-navy-surface group"
                        >
                          <span className={`text-sm font-display group-hover:text-brand-amber transition-colors ${pathname === child.href ? 'text-brand-amber' : 'text-white'}`}>
                            {child.label}
                          </span>
                          <span className="text-xs font-mono text-brand-gray-400">
                            {child.tag}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.href} href={item.href} className={isActive(item.href) ? 'nav-link-active' : 'nav-link'}>
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/contact" className={isActive('/contact') ? 'nav-link-active' : 'nav-link'}>
              Contact
            </Link>
            <Link href="/advisory" className="btn-primary text-sm px-5 py-2.5">
              Schedule Assessment
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-brand-gray-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-brand-border bg-brand-navy-card">
          <div className="section-container py-6 space-y-4">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className={`block py-2 font-display ${isActive(item.href) ? 'text-brand-amber' : 'text-white'}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block py-1.5 text-sm ${pathname === child.href ? 'text-brand-amber' : 'text-brand-gray-300 hover:text-brand-amber'}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-brand-border">
              <Link
                href="/advisory"
                className="btn-primary w-full text-center"
                onClick={() => setMobileOpen(false)}
              >
                Schedule Assessment
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
