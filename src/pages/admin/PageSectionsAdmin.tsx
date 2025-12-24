import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, GripVertical, Eye, EyeOff, Save, ArrowLeft } from 'lucide-react';
import { SortableList } from '@/hooks/useSortable';

interface Section {
  id: string;
  name: string;
  display_name: string;
  is_visible: boolean;
  order_index: number;
}

// Define which sections belong to which page
const pageSectionsMap: Record<string, { name: string; display_name: string }[]> = {
  home: [
    { name: 'hero', display_name: 'Hero Section' },
    { name: 'about', display_name: 'About Us' },
    { name: 'featured', display_name: 'Featured Section' },
    { name: 'reviews', display_name: 'Reviews Carousel' },
    { name: 'who-we-help', display_name: 'Who We Help' },
    { name: 'services', display_name: 'Services' },
    { name: 'approach', display_name: 'Our Approach' },
    { name: 'why-us', display_name: 'Why Us' },
    { name: 'faq', display_name: 'FAQ' },
    { name: 'videos-instagram', display_name: 'Instagram Videos' },
    { name: 'videos-youtube', display_name: 'YouTube Videos' },
    { name: 'videos-tiktok', display_name: 'TikTok Videos' },
    { name: 'blogs-podcasts', display_name: 'Blogs & Podcasts' },
    { name: 'linkedin', display_name: 'LinkedIn Connect' },
    { name: 'cta', display_name: 'Call to Action' },
  ],
  about: [
    { name: 'about-hero', display_name: 'About Hero' },
    { name: 'about-story', display_name: 'Our Story' },
    { name: 'about-mission', display_name: 'Mission & Vision' },
    { name: 'about-team', display_name: 'Team' },
  ],
  portfolio: [
    { name: 'portfolio-hero', display_name: 'Portfolio Hero' },
    { name: 'portfolio-projects', display_name: 'Projects Grid' },
    { name: 'portfolio-featured-wins', display_name: 'Featured Wins' },
  ],
  blog: [
    { name: 'blog-hero', display_name: 'Blog Hero' },
    { name: 'blog-list', display_name: 'Blog Posts List' },
  ],
  contact: [
    { name: 'contact-hero', display_name: 'Contact Hero' },
    { name: 'contact-info', display_name: 'Contact Information' },
    { name: 'contact-map', display_name: 'Map' },
  ],
  booking: [
    { name: 'booking-hero', display_name: 'Booking Hero' },
    { name: 'booking-calendar', display_name: 'Calendar Embed' },
  ],
};

const pageLabels: Record<string, string> = {
  home: 'Home',
  about: 'About',
  portfolio: 'Portfolio',
  blog: 'Blog',
  contact: 'Contact',
  booking: 'Book Call',
};

const PageSectionsAdmin = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const pageSections = pageId ? pageSectionsMap[pageId] || [] : [];
  const pageLabel = pageId ? pageLabels[pageId] || pageId : '';

  const fetchSections = async () => {
    if (!pageId || pageSections.length === 0) {
      setLoading(false);
      return;
    }

    try {
      const sectionNames = pageSections.map(s => s.name);
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .in('name', sectionNames)
        .order('order_index', { ascending: true });

      if (error) throw error;

      // Create any missing sections
      const existingNames = new Set(data?.map(s => s.name) || []);
      const missingSections = pageSections.filter(s => !existingNames.has(s.name));

      if (missingSections.length > 0) {
        const maxOrder = data?.length || 0;
        const newSections = missingSections.map((s, i) => ({
          name: s.name,
          display_name: s.display_name,
          is_visible: true,
          order_index: maxOrder + i,
          content: {},
        }));

        const { data: inserted, error: insertError } = await supabase
          .from('sections')
          .insert(newSections)
          .select();

        if (insertError) throw insertError;
        
        const allSections = [...(data || []), ...(inserted || [])];
        // Sort by the order defined in pageSectionsMap if no custom order
        allSections.sort((a, b) => a.order_index - b.order_index);
        setSections(allSections);
      } else {
        setSections(data || []);
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, [pageId]);

  const toggleVisibility = async (section: Section) => {
    try {
      const { error } = await supabase
        .from('sections')
        .update({ is_visible: !section.is_visible })
        .eq('id', section.id);

      if (error) throw error;

      setSections(sections.map(s =>
        s.id === section.id ? { ...s, is_visible: !s.is_visible } : s
      ));

      toast({ title: `${section.display_name} ${section.is_visible ? 'hidden' : 'visible'}` });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleReorder = (newSections: Section[]) => {
    setSections(newSections);
    setHasChanges(true);
  };

  const saveOrder = async () => {
    setSaving(true);
    try {
      const updates = sections.map((section, i) => ({
        id: section.id,
        order_index: i,
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('sections')
          .update({ order_index: update.order_index })
          .eq('id', update.id);
        if (error) throw error;
      }

      setHasChanges(false);
      toast({ title: 'Section order saved' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (!pageId || !pageSectionsMap[pageId]) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Page not found</h1>
          <Button onClick={() => navigate('/admin/pages')}>Back to Pages</Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/pages')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{pageLabel} Page</h1>
              <p className="text-muted-foreground mt-1">Drag to reorder, toggle visibility for each section</p>
            </div>
          </div>
          <Button onClick={saveOrder} disabled={saving || !hasChanges}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Order
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : sections.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No sections defined for this page yet.
            </CardContent>
          </Card>
        ) : (
          <SortableList
            items={sections}
            onReorder={handleReorder}
            renderItem={(section, listeners, isDragging) => (
              <Card className={isDragging ? 'ring-2 ring-primary' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div {...listeners} className="cursor-grab active:cursor-grabbing">
                      <GripVertical className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{section.display_name}</h3>
                      <p className="text-xs text-muted-foreground">{section.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {section.is_visible ? (
                        <Eye className="w-4 h-4 text-green-500" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      )}
                      <Switch
                        checked={section.is_visible}
                        onCheckedChange={() => toggleVisibility(section)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default PageSectionsAdmin;
