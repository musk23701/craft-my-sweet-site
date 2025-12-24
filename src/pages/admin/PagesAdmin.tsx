import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, GripVertical, Eye, EyeOff, Save, Plus, Trash2, ExternalLink } from 'lucide-react';
import { SortableList } from '@/hooks/useSortable';
import { invalidateHeaderCache } from '@/hooks/useHeaderConfig';

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  is_visible?: boolean;
}

const defaultPages: NavLink[] = [
  { label: 'Home', href: '/', is_visible: true },
  { label: 'About', href: '/about', is_visible: true },
  { label: 'Portfolio', href: '/portfolio', is_visible: true },
  { label: 'Blog', href: '/blog', is_visible: true },
  { label: 'Contact', href: '/contact', is_visible: true },
  { label: 'Booking', href: '/booking', is_visible: true },
];

const PagesAdmin = () => {
  const [pages, setPages] = useState<(NavLink & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [configId, setConfigId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('header_config')
        .select('id, nav_links')
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setConfigId(data.id);
        const navLinks = (data.nav_links as unknown as NavLink[]) || [];
        // Add id and is_visible if not present
        const pagesWithId = navLinks.map((link, index) => ({
          ...link,
          id: `page-${index}`,
          is_visible: link.is_visible !== false, // default to true
        }));
        setPages(pagesWithId.length > 0 ? pagesWithId : defaultPages.map((p, i) => ({ ...p, id: `page-${i}` })));
      } else {
        // No config yet, use defaults
        setPages(defaultPages.map((p, i) => ({ ...p, id: `page-${i}` })));
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPages(); }, []);

  const toggleVisibility = (pageId: string) => {
    setPages(pages.map(p => 
      p.id === pageId ? { ...p, is_visible: !p.is_visible } : p
    ));
    setHasChanges(true);
  };

  const updatePage = (pageId: string, field: keyof NavLink, value: string | boolean) => {
    setPages(pages.map(p => 
      p.id === pageId ? { ...p, [field]: value } : p
    ));
    setHasChanges(true);
  };

  const addPage = () => {
    const newPage = {
      id: `page-${Date.now()}`,
      label: 'New Page',
      href: '/new-page',
      is_visible: true,
      external: false,
    };
    setPages([...pages, newPage]);
    setHasChanges(true);
  };

  const removePage = (pageId: string) => {
    setPages(pages.filter(p => p.id !== pageId));
    setHasChanges(true);
  };

  const handleReorder = (newPages: (NavLink & { id: string })[]) => {
    setPages(newPages);
    setHasChanges(true);
  };

  const savePages = async () => {
    setSaving(true);
    try {
      // Convert to nav_links format (without id)
      const navLinks = pages.map(({ id, ...rest }) => rest);

      if (configId) {
        const { error } = await supabase
          .from('header_config')
          .update({ nav_links: navLinks })
          .eq('id', configId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('header_config')
          .insert({ nav_links: navLinks })
          .select()
          .single();
        if (error) throw error;
        setConfigId(data.id);
      }

      // Invalidate cache so sidebar updates
      invalidateHeaderCache();
      
      setHasChanges(false);
      toast({ title: 'Pages saved successfully' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Pages</h1>
            <p className="text-muted-foreground mt-1">Manage navigation pages, reorder, and toggle visibility</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={addPage}>
              <Plus className="w-4 h-4 mr-2" />
              Add Page
            </Button>
            <Button onClick={savePages} disabled={saving || !hasChanges}>
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
          </div>
        </div>

        <SortableList
          items={pages}
          onReorder={handleReorder}
          renderItem={(page, listeners, isDragging) => (
            <Card className={isDragging ? 'ring-2 ring-primary' : ''}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div {...listeners} className="cursor-grab active:cursor-grabbing">
                    <GripVertical className="w-5 h-5 text-muted-foreground" />
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs">Label</Label>
                      <Input
                        value={page.label}
                        onChange={(e) => updatePage(page.id, 'label', e.target.value)}
                        placeholder="Page Name"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">URL Path</Label>
                      <Input
                        value={page.href}
                        onChange={(e) => updatePage(page.id, 'href', e.target.value)}
                        placeholder="/page-path"
                      />
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={page.external || false}
                          onCheckedChange={(checked) => updatePage(page.id, 'external', checked)}
                        />
                        <Label className="text-xs flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          External
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {page.is_visible ? (
                      <Eye className="w-4 h-4 text-green-500" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    )}
                    <Switch
                      checked={page.is_visible}
                      onCheckedChange={() => toggleVisibility(page.id)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removePage(page.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        />
      </div>
    </AdminLayout>
  );
};

export default PagesAdmin;
