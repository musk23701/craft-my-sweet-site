import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ChevronRight, Home, Info, Briefcase, FileText, Phone, Calendar } from 'lucide-react';

interface PageConfig {
  id: string;
  name: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const pages: PageConfig[] = [
  { id: 'home', name: 'home', label: 'Home', icon: <Home className="w-5 h-5" />, description: 'Hero, About, Services, Reviews, FAQ, Videos, and more' },
  { id: 'about', name: 'about', label: 'About', icon: <Info className="w-5 h-5" />, description: 'About page sections' },
  { id: 'portfolio', name: 'portfolio', label: 'Portfolio', icon: <Briefcase className="w-5 h-5" />, description: 'Projects and Featured Wins' },
  { id: 'blog', name: 'blog', label: 'Blog', icon: <FileText className="w-5 h-5" />, description: 'Blog listing and posts' },
  { id: 'contact', name: 'contact', label: 'Contact', icon: <Phone className="w-5 h-5" />, description: 'Contact information and form' },
  { id: 'booking', name: 'booking', label: 'Book Call', icon: <Calendar className="w-5 h-5" />, description: 'Booking calendar embed' },
];

const PagesAdmin = () => {
  const navigate = useNavigate();
  const [loading] = useState(false);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Pages</h1>
          <p className="text-muted-foreground mt-1">Select a page to manage its sections</p>
        </div>

        <div className="grid gap-4">
          {pages.map((page) => (
            <Card 
              key={page.id} 
              className="cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
              onClick={() => navigate(`/admin/pages/${page.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    {page.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{page.label}</h3>
                    <p className="text-sm text-muted-foreground">{page.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default PagesAdmin;
