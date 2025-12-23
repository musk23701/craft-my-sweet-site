import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, GripVertical, Eye, EyeOff, Save } from 'lucide-react';

interface Section {
  id: string;
  name: string;
  display_name: string;
  is_visible: boolean;
  order_index: number;
}

const defaultSections = [
  { name: 'hero', display_name: 'Hero Section' },
  { name: 'about', display_name: 'About Us' },
  { name: 'featured', display_name: 'Featured Section' },
  { name: 'reviews', display_name: 'Reviews Carousel' },
  { name: 'who-we-help', display_name: 'Who We Help' },
  { name: 'services', display_name: 'Services' },
  { name: 'approach', display_name: 'Our Approach' },
  { name: 'why-us', display_name: 'Why Us' },
  { name: 'faq', display_name: 'FAQ' },
  { name: 'videos', display_name: 'Video Carousels' },
  { name: 'blogs-podcasts', display_name: 'Blogs & Podcasts' },
  { name: 'linkedin', display_name: 'LinkedIn Connect' },
  { name: 'cta', display_name: 'Call to Action' },
  { name: 'footer', display_name: 'Footer' },
];

const SectionsAdmin = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase.from('sections').select('*').order('order_index', { ascending: true });
      
      if (error) throw error;

      if (!data || data.length === 0) {
        // Initialize with default sections
        const initialSections = defaultSections.map((s, i) => ({
          name: s.name,
          display_name: s.display_name,
          is_visible: true,
          order_index: i,
          content: {},
        }));

        const { data: inserted, error: insertError } = await supabase
          .from('sections')
          .insert(initialSections)
          .select();

        if (insertError) throw insertError;
        setSections(inserted || []);
      } else {
        setSections(data);
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSections(); }, []);

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

  const saveOrder = async () => {
    setSaving(true);
    try {
      const updates = sections.map((s, i) => ({
        id: s.id,
        name: s.name,
        display_name: s.display_name,
        is_visible: s.is_visible,
        order_index: i,
        content: {},
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('sections')
          .update({ order_index: update.order_index })
          .eq('id', update.id);
        if (error) throw error;
      }

      toast({ title: 'Section order saved' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Sections</h1>
            <p className="text-muted-foreground mt-1">Toggle section visibility on the homepage</p>
          </div>
          <Button onClick={saveOrder} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Order
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="space-y-2">
            {sections.map((section) => (
              <Card key={section.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />
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
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default SectionsAdmin;
