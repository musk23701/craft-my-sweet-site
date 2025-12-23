import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';
import ContentEditor, { ContentBlock } from '@/components/admin/ContentEditor';
import MediaUploader from '@/components/admin/MediaUploader';

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: ContentBlock[];
  featured_image: string | null;
  category: string | null;
  client_name: string | null;
  project_url: string | null;
  is_published: boolean;
  order_index: number;
  created_at: string;
}

const PortfolioAdmin = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState<ContentBlock[]>([]);
  const [featuredImage, setFeaturedImage] = useState('');
  const [category, setCategory] = useState('');
  const [clientName, setClientName] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;

      const typedData = (data || []).map(item => ({
        ...item,
        content: Array.isArray(item.content) ? (item.content as unknown as ContentBlock[]) : [],
      }));

      setItems(typedData);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setDescription('');
    setContent([]);
    setFeaturedImage('');
    setCategory('');
    setClientName('');
    setProjectUrl('');
    setIsPublished(false);
    setEditingItem(null);
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setSlug(item.slug);
    setDescription(item.description || '');
    setContent(item.content);
    setFeaturedImage(item.featured_image || '');
    setCategory(item.category || '');
    setClientName(item.client_name || '');
    setProjectUrl(item.project_url || '');
    setIsPublished(item.is_published);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!title.trim() || !slug.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Title and slug are required',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);

    try {
      const itemData = {
        title,
        slug,
        description: description || null,
        content: content as unknown as any,
        featured_image: featuredImage || null,
        category: category || null,
        client_name: clientName || null,
        project_url: projectUrl || null,
        is_published: isPublished,
        order_index: editingItem?.order_index || items.length,
      };

      if (editingItem) {
        const { error } = await supabase
          .from('portfolio')
          .update(itemData)
          .eq('id', editingItem.id);

        if (error) throw error;

        toast({ title: 'Portfolio item updated' });
      } else {
        const { error } = await supabase.from('portfolio').insert(itemData);

        if (error) throw error;

        toast({ title: 'Portfolio item created' });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchItems();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const { error } = await supabase.from('portfolio').delete().eq('id', id);

      if (error) throw error;

      toast({ title: 'Portfolio item deleted' });
      fetchItems();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const togglePublish = async (item: PortfolioItem) => {
    try {
      const { error } = await supabase
        .from('portfolio')
        .update({ is_published: !item.is_published })
        .eq('id', item.id);

      if (error) throw error;

      toast({ title: item.is_published ? 'Item unpublished' : 'Item published' });
      fetchItems();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Portfolio</h1>
            <p className="text-muted-foreground mt-1">Manage your case studies and portfolio items</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? 'Edit Portfolio Item' : 'Create New Portfolio Item'}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        if (!editingItem) setSlug(generateSlug(e.target.value));
                      }}
                      placeholder="Project title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="project-url-slug"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description..."
                    className="h-20"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Featured Image</Label>
                  {featuredImage ? (
                    <div className="relative inline-block">
                      <img src={featuredImage} alt="Featured" className="max-h-40 rounded-lg" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => setFeaturedImage('')}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <MediaUploader accept="image/*" onUpload={setFeaturedImage} />
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Content</Label>
                  <ContentEditor blocks={content} onChange={setContent} />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g., AI Automation"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                      id="clientName"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Client name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectUrl">Project URL</Label>
                    <Input
                      id="projectUrl"
                      value={projectUrl}
                      onChange={(e) => setProjectUrl(e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch id="published" checked={isPublished} onCheckedChange={setIsPublished} />
                  <Label htmlFor="published">Publish immediately</Label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={saving}>
                    {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingItem ? 'Update' : 'Create'} Item
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : items.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No portfolio items yet. Create your first one!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {item.featured_image && (
                      <img src={item.featured_image} alt={item.title} className="w-20 h-20 rounded-lg object-cover" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold truncate">{item.title}</h3>
                        {item.is_published ? (
                          <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">Published</span>
                        ) : (
                          <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full">Draft</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{item.description || 'No description'}</p>
                      {item.category && (
                        <span className="text-xs text-muted-foreground">{item.category}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => togglePublish(item)}>
                        {item.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
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

export default PortfolioAdmin;
