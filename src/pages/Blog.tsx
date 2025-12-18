import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

interface BlogPost {
  image: string;
  title: string;
  excerpt: string;
  author: string;
  authorImage: string;
  date: string;
}

const popularPosts: BlogPost[] = [
  {
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
    title: "OpenAI's FrontierScience: What It Means for the Future of AI-Accelerated Research",
    excerpt: "As someone who has closely tracked AI automation and capabilities, I've observed that saturated benchmarks create a dangerous blind spot.",
    author: "Hamza Baig",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    date: "17 Dec 2025"
  },
  {
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=450&fit=crop",
    title: "AI-Generated Five-Star Reviews Are Deceiving Online Shoppers: What You Need to Know",
    excerpt: "AI-generated fake reviews designed to manipulate purchasing decisions and boost sales for questionable products.",
    author: "Hamza Baig",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    date: "15 Dec 2025"
  },
  {
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop",
    title: "GPT-5.2 Launch Signals New Era for Automation Operators: Expert Analysis",
    excerpt: "OpenAI's release of GPT-5.2 this week marks a pivotal moment in the automation industry.",
    author: "Hamza Baig",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    date: "12 Dec 2025"
  }
];

const latestPosts: BlogPost[] = [
  {
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=450&fit=crop",
    title: "AI Promised a Revolution But Failed to Deliver Results for Most Companies",
    excerpt: "An analysis of why generative AI investments haven't delivered expected results—and what businesses need to change.",
    author: "Hamza Baig",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    date: "17 Dec 2025"
  },
  {
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=450&fit=crop",
    title: "The AI Research Agent Wars: How Tech Giants Are Competing for Dominance",
    excerpt: "The AI landscape just experienced one of its most significant 24-hour periods in recent history.",
    author: "Hamza Baig",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    date: "15 Dec 2025"
  },
  {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop",
    title: "AI Creates New Talent Pipeline: Marketing Industry Transformation",
    excerpt: "The marketing industry stands at a critical juncture with AI reshaping talent acquisition.",
    author: "Hamza Baig",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    date: "12 Dec 2025"
  }
];

const thoughtLeadershipPosts: BlogPost[] = [
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop",
    title: "The Future of Work: Humans and AI Working Together",
    excerpt: "Explore the future of work where humans and AI collaborate, not compete. Learn how AI can enhance productivity.",
    author: "Hamza Baig",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    date: "02 Dec 2025"
  },
  {
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=450&fit=crop",
    title: "Lessons From History: Building Modern Empires with AI",
    excerpt: "Discover how to build a modern empire with AI, not armies. Learn lessons from history.",
    author: "Hamza Baig",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    date: "02 Dec 2025"
  },
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=450&fit=crop",
    title: "The Automation Mindset: Working Smarter Not Harder",
    excerpt: "Learn how the automation mindset helps you work smarter, not harder. Discover strategies to save time.",
    author: "Hamza Baig",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    date: "02 Dec 2025"
  }
];

const BlogCard = ({ post }: { post: BlogPost }) => (
  <div className="max-w-xs space-y-3 text-foreground">
    <div className="border-primary border-2 relative min-h-[180px] aspect-video">
      <img 
        src={post.image} 
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
    <h2 className="font-bold text-xl text-left line-clamp-1">{post.title}</h2>
    <p className="text-xs text-left line-clamp-2 text-muted-foreground">{post.excerpt}</p>
    <div className="text-muted-foreground flex items-center w-full justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-7 w-7">
          <img 
            src={post.authorImage} 
            alt={post.author}
            className="absolute inset-0 w-full h-full rounded-full object-cover"
          />
        </div>
        <p className="text-xs">{post.author}</p>
      </div>
      <p className="text-xs">{post.date}</p>
    </div>
  </div>
);

const BlogSection = ({ title, subtitle, posts }: { title: string; subtitle: string; posts: BlogPost[] }) => (
  <section className="py-16">
    <div className="max-w-6xl mx-auto px-6">
      <h1 className="text-[40px] lg:text-[70px] text-foreground font-extrabold mb-4 text-center">
        {title}
      </h1>
      <p className="text-sm sm:text-base lg:text-lg mb-5 mt-5 flex flex-wrap gap-[6px] justify-center text-muted-foreground">
        <span className="inline-block">{subtitle.split(' ')[0]}</span>
        <span className="inline-block">{subtitle.split(' ').slice(1).join(' ')}</span>
      </p>

      <div className="flex justify-center flex-col items-center mt-8 md:mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {posts.map((post, index) => (
            <BlogCard key={index} post={post} />
          ))}
        </div>

        <div className="flex gap-5 justify-center">
          <button className="bg-primary cursor-pointer text-xs font-medium rounded-lg mx-auto w-fit py-3 px-10 mt-10 text-primary-foreground hover:bg-primary/90 transition-colors">
            SEE MORE
          </button>
        </div>
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
