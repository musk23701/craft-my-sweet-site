import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import SEO, { createBlogListSchema, createBreadcrumbSchema } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  author: string | null;
  featured_image: string | null;
  created_at: string;
  tags: string[] | null;
}

const POSTS_PER_PAGE = 6;

const BlogCard = ({ post }: { post: BlogPost }) => (
  <Link to={`/blog/${post.slug}`} className="group cursor-pointer block">
    <div className="relative overflow-hidden rounded-xl mb-4">
      <img 
        src={post.featured_image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop'} 
        alt={post.title}
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt || 'Read more about this topic...'}</p>
    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-primary text-[10px] font-bold">AI</span>
        </div>
        <span>{post.author || 'Automind Labs'}</span>
      </div>
      <span>{new Date(post.created_at).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
    </div>
  </Link>
);

const Blog = () => {
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);
  const [displayedBlogs, setDisplayedBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('id, title, slug, excerpt, author, featured_image, created_at, tags')
          .eq('is_published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const blogs = data || [];
        setAllBlogs(blogs);
        setDisplayedBlogs(blogs.slice(0, POSTS_PER_PAGE));
        setHasMore(blogs.length > POSTS_PER_PAGE);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const loadMore = () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    const start = 0;
    const end = nextPage * POSTS_PER_PAGE;
    
    setTimeout(() => {
      setDisplayedBlogs(allBlogs.slice(start, end));
      setPage(nextPage);
      setHasMore(end < allBlogs.length);
      setLoadingMore(false);
    }, 300);
  };

  // Group blogs by category
  const popularBlogs = displayedBlogs.slice(0, 3);
  const latestBlogs = displayedBlogs.slice(3, 6);
  const thoughtLeadershipBlogs = displayedBlogs.slice(6, 9);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      createBlogListSchema(),
      createBreadcrumbSchema([
        { name: 'Home', url: 'https://automindlabs.ai' },
        { name: 'Blog', url: 'https://automindlabs.ai/blog' },
      ]),
    ],
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <SEO
        title="AI Automation Blog | Latest Trends & Expert Insights 2025"
        description="Stay ahead with Automind Labs' AI automation blog. Get expert insights on workflow optimization, RPA, machine learning, and business automation strategies. Updated weekly with the latest AI industry trends."
        keywords="AI automation blog 2025, automation insights, workflow optimization tips, AI trends USA, business automation strategies, artificial intelligence articles, RPA best practices, digital transformation blog, automation guides, AI industry updates, machine learning news"
        canonical="/blog"
        structuredData={blogSchema}
      />
      <PageHero 
        title="Our"
        titleAccent="Blogs"
        subtitle="Our Take on AI Evolution"
        backgroundImage="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&h=1080&fit=crop"
      />

      <main>
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : displayedBlogs.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <>
            {/* Popular Section */}
            {popularBlogs.length > 0 && (
              <section className="py-16">
                <div className="max-w-6xl mx-auto px-6">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2">Popular</h2>
                  <p className="text-muted-foreground text-center mb-12">Top Insights</p>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {popularBlogs.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Latest Section */}
            {latestBlogs.length > 0 && (
              <div className="bg-card">
                <section className="py-16">
                  <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2">Latest</h2>
                    <p className="text-muted-foreground text-center mb-12">Fresh from the Future</p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {latestBlogs.map((post) => (
                        <BlogCard key={post.id} post={post} />
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Thought Leadership Section */}
            {thoughtLeadershipBlogs.length > 0 && (
              <section className="py-16">
                <div className="max-w-6xl mx-auto px-6">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2">Thought Leadership</h2>
                  <p className="text-muted-foreground text-center mb-12">Our commentary on AI trends</p>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {thoughtLeadershipBlogs.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* See More Button */}
            {hasMore && (
              <div className="text-center pb-16">
                <Button 
                  variant="outline" 
                  className="rounded-full px-8"
                  onClick={loadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'SEE MORE'
                  )}
                </Button>
              </div>
            )}
          </>
        )}

        <Footer />
      </main>
    </div>
  );
};

export default Blog;
