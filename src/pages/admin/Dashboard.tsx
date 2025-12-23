import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Briefcase, Video, Image, Star, HelpCircle, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Stats {
  blogs: number;
  portfolio: number;
  videos: number;
  media: number;
  reviews: number;
  faqs: number;
  services: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    blogs: 0,
    portfolio: 0,
    videos: 0,
    media: 0,
    reviews: 0,
    faqs: 0,
    services: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogs, portfolio, videos, media, reviews, faqs, services] = await Promise.all([
          supabase.from('blogs').select('id', { count: 'exact', head: true }),
          supabase.from('portfolio').select('id', { count: 'exact', head: true }),
          supabase.from('videos').select('id', { count: 'exact', head: true }),
          supabase.from('media').select('id', { count: 'exact', head: true }),
          supabase.from('reviews').select('id', { count: 'exact', head: true }),
          supabase.from('faqs').select('id', { count: 'exact', head: true }),
          supabase.from('services').select('id', { count: 'exact', head: true }),
        ]);

        setStats({
          blogs: blogs.count || 0,
          portfolio: portfolio.count || 0,
          videos: videos.count || 0,
          media: media.count || 0,
          reviews: reviews.count || 0,
          faqs: faqs.count || 0,
          services: services.count || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Blogs', value: stats.blogs, icon: FileText, href: '/admin/blogs', color: 'text-blue-500' },
    { label: 'Portfolio', value: stats.portfolio, icon: Briefcase, href: '/admin/portfolio', color: 'text-purple-500' },
    { label: 'Videos', value: stats.videos, icon: Video, href: '/admin/videos', color: 'text-red-500' },
    { label: 'Media Files', value: stats.media, icon: Image, href: '/admin/media', color: 'text-green-500' },
    { label: 'Reviews', value: stats.reviews, icon: Star, href: '/admin/reviews', color: 'text-yellow-500' },
    { label: 'FAQs', value: stats.faqs, icon: HelpCircle, href: '/admin/faqs', color: 'text-cyan-500' },
    { label: 'Services', value: stats.services, icon: Wrench, href: '/admin/services', color: 'text-orange-500' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to your CMS dashboard</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Link key={stat.label} to={stat.href}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {loading ? '...' : stat.value}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                to="/admin/blogs"
                className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <FileText className="w-5 h-5 text-blue-500" />
                <span>Create new blog post</span>
              </Link>
              <Link
                to="/admin/portfolio"
                className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <Briefcase className="w-5 h-5 text-purple-500" />
                <span>Add portfolio item</span>
              </Link>
              <Link
                to="/admin/videos"
                className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <Video className="w-5 h-5 text-red-500" />
                <span>Upload new video</span>
              </Link>
              <Link
                to="/admin/media"
                className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <Image className="w-5 h-5 text-green-500" />
                <span>Upload media files</span>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                to="/admin/sections"
                className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <span>Manage page sections visibility</span>
              </Link>
              <Link
                to="/admin/header-footer"
                className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <span>Edit header & footer</span>
              </Link>
              <Link
                to="/admin/contact"
                className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <span>Update contact information</span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
