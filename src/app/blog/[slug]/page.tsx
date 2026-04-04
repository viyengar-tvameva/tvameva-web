import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar, Share2, Twitter, Linkedin } from 'lucide-react';
import drupalClient, { BlogPost } from '@/utils/drupal-client';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return drupalClient.getBlogPostBySlug(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author],
    },
  };
}

const categoryColors: Record<string, string> = {
  'Revenue Orchestration': 'text-sa-propeledge',
  'Digital Experience': 'text-sa-engageos',
  'Decision Intelligence': 'text-sa-insightlens',
  'Delivery Model': 'text-brand-amber',
};

const saLinks: Record<string, { name: string; href: string; color: string }> = {
  propeledge: { name: 'PropelEdge', href: '/solutions/propeledge', color: 'border-sa-propeledge/30 text-sa-propeledge' },
  engageos: { name: 'EngageOS', href: '/solutions/engageos', color: 'border-sa-engageos/30 text-sa-engageos' },
  insightlens: { name: 'InsightLens', href: '/solutions/insightlens', color: 'border-sa-insightlens/30 text-sa-insightlens' },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const categoryColor = categoryColors[post.category] || 'text-brand-amber';
  const relatedSA = post.relatedSA ? saLinks[post.relatedSA] : null;
  const shareUrl = `https://tvameva.ai/blog/${post.slug}`;

  return (
    <>
      {/* JSON-LD for BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedDate,
            author: { '@type': 'Person', name: post.author },
            publisher: { '@type': 'Organization', name: 'Tvameva', url: 'https://tvameva.ai' },
            url: shareUrl,
            keywords: post.category,
            ...(post.featuredImage ? { image: post.featuredImage } : {}),
          }),
        }}
      />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy-light to-brand-navy-card" />
          <div className="relative section-container">
            <div className="max-w-2xl mx-auto">
              {/* Category + Read time */}
              <div className="flex items-center gap-4 mb-6">
                <span className={`text-xs font-mono uppercase tracking-widest ${categoryColor}`}>
                  {post.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-brand-gray-500">
                  <Clock className="w-3 h-3" />
                  {post.readingTime} min read
                </div>
              </div>

              {/* Title */}
              <h1 className="text-hero-md font-display font-bold text-white text-balance">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="mt-6 text-lg text-brand-gray-300 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Author + Date */}
              <div className="mt-8 flex items-center justify-between">
                <div>
                  <p className="font-display font-semibold text-white text-sm">{post.author}</p>
                  <p className="text-xs text-brand-gray-500">
                    {post.authorTitle} · {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>

                {/* Share */}
                <div className="flex items-center gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-brand-navy-surface hover:bg-brand-navy-card transition-colors text-brand-gray-400 hover:text-white"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-brand-navy-surface hover:bg-brand-navy-card transition-colors text-brand-gray-400 hover:text-white"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.featuredImage && (
          <section className="pb-12">
            <div className="section-container">
              <div className="max-w-3xl mx-auto">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full rounded-xl border border-brand-border/30"
                />
              </div>
            </div>
          </section>
        )}

        {/* Article Body */}
        <article className="pb-16">
          <div className="section-container">
            <div
              className="max-w-2xl mx-auto prose prose-invert prose-lg prose-headings:font-display prose-headings:font-bold prose-headings:text-white prose-p:text-brand-gray-300 prose-p:leading-relaxed prose-a:text-brand-amber prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-brand-amber/40 prose-blockquote:text-brand-gray-300 prose-blockquote:italic prose-strong:text-white prose-code:text-brand-amber/80"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          </div>
        </article>

        {/* Key Stats (if available) */}
        {post.keyStats && post.keyStats.length > 0 && (
          <section className="py-12 border-t border-brand-border/30">
            <div className="section-container">
              <div className="max-w-2xl mx-auto">
                <p className="text-xs font-mono text-brand-amber uppercase tracking-widest mb-6">Key Takeaways</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {post.keyStats.map((ks) => (
                    <div key={ks.stat} className="p-4 rounded-xl bg-brand-amber/5 border border-brand-amber/20">
                      <div className="text-lg font-display font-bold text-brand-amber">{ks.stat}</div>
                      <div className="text-xs text-brand-gray-400 mt-1">{ks.context}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Solution Area */}
        {relatedSA && (
          <section className="py-8">
            <div className="section-container">
              <div className="max-w-2xl mx-auto">
                <Link
                  href={relatedSA.href}
                  className={`block p-5 rounded-xl border ${relatedSA.color} bg-brand-navy-card/50 hover:bg-brand-navy-card transition-colors group`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-mono text-brand-gray-500 uppercase tracking-wider">Related Solution</p>
                      <p className="font-display font-semibold text-white mt-1">{relatedSA.name}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-brand-gray-500 group-hover:text-brand-amber transition-colors" />
                  </div>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 border-t border-brand-border/30">
          <div className="section-container text-center">
            <h2 className="text-section-title font-display font-bold text-white mb-4">
              Ready to stop losing proposals you should win?
            </h2>
            <p className="text-brand-gray-300 mb-8 max-w-lg mx-auto">
              30 minutes. No pitch. Just a conversation about what&apos;s possible.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://calendly.com/varada-tvameva/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-8 py-4"
              >
                Book a 30-Minute Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              <Link href="/contact" className="btn-secondary text-base px-8 py-4">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
