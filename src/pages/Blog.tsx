import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

interface BlogPost {
  image: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
}

const popularPosts: BlogPost[] = [
  {
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    title: "The Future of AI Research...",
    excerpt: "As someone who has closely tracked AI automation and capabilities, I've observed that saturated...",
    author: "Automind Labs",
    date: "17 Dec 2025"
  },
  {
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=250&fit=crop",
    title: "AI-Generated Five-Star...",
    excerpt: "AI-generated fake reviews designed to manipulate purchasing decisions and boost sales for...",
    author: "Automind Labs",
    date: "15 Dec 2025"
  },
  {
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
    title: "GPT-5.2 Launch Signals New...",
    excerpt: "OpenAI's release of GPT-5.2 this week marks a pivotal moment in the automation industry...",
    author: "Automind Labs",
    date: "12 Dec 2025"
  }
];

const latestPosts: BlogPost[] = [
  {
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=250&fit=crop",
    title: "AI Promised a Revolution....",
    excerpt: "An analysis of why generative AI investments haven't delivered expected results—and what businesses...",
    author: "Automind Labs",
    date: "17 Dec 2025"
  },
  {
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=250&fit=crop",
    title: "The AI Research Agent Wars:...",
    excerpt: "The AI landscape just experienced one of its most significant 24-hour periods in recent history...",
    author: "Automind Labs",
    date: "15 Dec 2025"
  },
  {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    title: "AI Creates New Talent...",
    excerpt: "The marketing industry stands at a critical juncture...",
    author: "Automind Labs",
    date: "12 Dec 2025"
  }
];

const thoughtLeadershipPosts: BlogPost[] = [
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    title: "The Future of Work: Humans...",
    excerpt: "Explore the future of work where humans and AI collaborate, not compete. Learn how AI can enhance...",
    author: "Automind Labs",
    date: "02 Dec 2025"
  },
  {
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop",
    title: "Lessons From History:...",
    excerpt: "Discover how to build a modern empire with AI, not armies. Learn lessons from history and use...",
    author: "Automind Labs",
    date: "02 Dec 2025"
  },
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=250&fit=crop",
    title: "The Automation Mindset:...",
    excerpt: "Learn how the automation mindset helps you work smarter, not harder. Discover strategies to save time...",
    author: "Automind Labs",
    date: "02 Dec 2025"
  }
];

const BlogCard = ({ post }: { post: BlogPost }) => (
  <div className="group">
    <div className="relative overflow-hidden rounded-xl mb-4">
      <img 
        src={post.image} 
        alt={post.title}
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-primary text-[10px] font-bold">AI</span>
        </div>
        <span>{post.author}</span>
      </div>
      <span>{post.date}</span>
    </div>
  </div>
);

const BlogSection = ({ title, subtitle, posts }: { title: string; subtitle: string; posts: BlogPost[] }) => (
  <section className="py-16">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2">{title}</h2>
      <p className="text-muted-foreground text-center mb-12">{subtitle}</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <BlogCard key={index} post={post} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" className="rounded-full px-8">
          SEE MORE
        </Button>
      </div>
    </div>
  </section>
);

const Blog = () => {
  return (
    <div className="min-h-screen w-full bg-background">
      <PageHero 
        title="Our"
        titleAccent="Blogs"
        subtitle="Our Take on AI Evolution"
        backgroundImage="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&h=1080&fit=crop"
      />

      <main>
        <BlogSection 
          title="Popular" 
          subtitle="Top Insights" 
          posts={popularPosts} 
        />

        <div className="bg-card">
          <BlogSection 
            title="Latest" 
            subtitle="Fresh from the Future" 
            posts={latestPosts} 
          />
        </div>

        <BlogSection 
          title="Thought Leadership" 
          subtitle="Our commentary on AI trends" 
          posts={thoughtLeadershipPosts} 
        />

        <Footer />
      </main>
    </div>
  );
};

export default Blog;
