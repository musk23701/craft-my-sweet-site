import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import SEO, { createBlogPostSchema } from "@/components/SEO";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: any;
  excerpt: string | null;
  author: string | null;
  featured_image: string | null;
  created_at: string;
  tags: string[] | null;
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();

      setPost(data);
      setLoading(false);
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const renderContent = (content: any) => {
    if (!content || !Array.isArray(content)) return null;
    
    return content.map((block: any, index: number) => {
      switch (block.type) {
        case 'heading':
          return <h2 key={index} className="text-2xl md:text-3xl font-bold mt-8 mb-4">{block.content}</h2>;
        case 'paragraph':
          return <p key={index} className="text-muted-foreground leading-relaxed mb-4">{block.content}</p>;
        case 'image':
          return (
            <figure key={index} className="my-8">
              <img src={block.url} alt={block.caption || ''} className="w-full rounded-xl" />
              {block.caption && <figcaption className="text-sm text-muted-foreground mt-2 text-center">{block.caption}</figcaption>}
            </figure>
          );
        case 'list':
          return (
            <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
              {block.items?.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
        default:
          return <p key={index} className="text-muted-foreground mb-4">{String(block.content || block)}</p>;
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <PageHero title="Post Not Found" subtitle="The blog post you're looking for doesn't exist." />
        <div className="py-20 text-center">
          <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const blogSchema = post ? createBlogPostSchema({
    title: post.title,
    description: post.excerpt || `Read ${post.title} on Automind Labs blog`,
    image: post.featured_image || 'https://automindlabs.ai/og-image.png',
    datePublished: post.created_at,
    author: post.author || 'Automind Labs',
    url: `https://automindlabs.ai/blog/${post.slug}`,
  }) : undefined;

  return (
    <div className="min-h-screen bg-background">
      {post && (
        <SEO
          title={post.title}
          description={post.excerpt || `Read ${post.title} - AI automation insights from Automind Labs`}
          keywords={post.tags?.join(', ') || 'AI automation, workflow optimization, business automation'}
          canonical={`/blog/${post.slug}`}
          ogType="article"
          ogImage={post.featured_image || undefined}
          author={post.author || 'Automind Labs'}
          publishedTime={post.created_at}
          structuredData={blogSchema}
        />
      )}
      <PageHero
        title={post.title}
        subtitle={post.excerpt || ''}
        backgroundImage={post.featured_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80'}
      />

      <article className="py-12 md:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              {post.author && (
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <span key={index} className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            {renderContent(post.content)}
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
