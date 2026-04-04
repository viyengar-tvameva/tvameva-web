import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import drupalClient, { BlogPost } from '@/utils/drupal-client';

export const metadata: Metadata = {
  title: 'Blog — Insights on AI-Native Enterprise Solutions | Tvameva',
  description: 'Ideas that earn their keep. Insights on digital experience, decision intelligence, revenue orchestration, and the AI pod delivery model.',
};

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'Revenue Orchestration': { bg: 'bg-sa-propeledge/10', text: 'text-sa-propeledge', border: 'border-sa-propeledge/30' },
  'Digital Experience': { bg: 'bg-sa-engageos/10', text: 'text-sa-engageos', border: 'border-sa-engageos/30' },
  'Decision Intelligence': { bg: 'bg-sa-insightlens/10', text: 'text-sa-insightlens', border: 'border-sa-insightlens/30' },
  'Delivery Model': { bg: 'bg-brand-amber/10', text: 'text-brand-amber', border: 'border-brand-amber/30' },
};

function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const colors = categoryColors[post.category] || categoryColors['Delivery Model'];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block rounded-xl border border-brand-border/30 bg-brand-navy-card/50 overflow-hidden hover:border-brand-amber/30 transition-all duration-300 hover:-translate-y-1 ${featured ? 'md:col-span-2' : ''}`}
    >
      {post.featuredImage && (
        <div className="w-full h-48 overflow-hidden">
          <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} ${colors.border} border`}>
            {post.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-brand-gray-500">
            <Clock className="w-3 h-3" />
            {post.readingTime} min
          </div>
        </div>

        <h3 className={`font-display font-bold text-white group-hover:text-brand-amber transition-colors ${featured ? 'text-xl lg:text-2xl' : 'text-lg'}`}>
          {post.title}
        </h3>

        <p className="mt-2 text-sm text-brand-gray-300 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-brand-gray-500">
            <Calendar className="w-3 h-3" />
            {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          <span className="text-xs text-brand-amber opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            Read <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function BlogListingPage() {
  const posts = await drupalClient.getBlogPosts();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy-light to-brand-navy-card" />
          <div className="relative section-container">
            <p className="font-mono text-xs text-brand-amber uppercase tracking-widest mb-4">
              Insights
            </p>
            <h1 className="text-hero-md lg:text-hero-lg font-display font-bold text-white max-w-2xl">
              Ideas that earn their keep.
            </h1>
            <p className="mt-4 text-lg text-brand-gray-300 max-w-xl">
              Perspectives on building the AI-native enterprise — from the team that burned
              their own playbook and built something better.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16">
          <div className="section-container">
            {posts && posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, i) => (
                  <BlogCard key={post.slug} post={post} featured={i === 0} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-brand-gray-400 text-lg">Coming soon.</p>
                <p className="text-brand-gray-500 text-sm mt-2">
                  Our first articles are in the works. Check back shortly.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
