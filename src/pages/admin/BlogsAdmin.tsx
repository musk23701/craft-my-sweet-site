import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: ContentBlock[];
  featured_image: string | null;
  is_published: boolean;
  author: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}

const BlogsAdmin = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState<ContentBlock[]>([]);
  const [featuredImage, setFeaturedImage] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Type cast to handle JSONB content
      const typedData = (data || []).map(blog => ({
        ...blog,
        content: Array.isArray(blog.content) ? (blog.content as unknown as ContentBlock[]) : [],
        tags: blog.tags || [],
      }));

      setBlogs(typedData);
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
    fetchBlogs();
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent([]);
    setFeaturedImage('');
    setIsPublished(false);
    setAuthor('');
    setTags('');
    setEditingBlog(null);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setSlug(blog.slug);
    setExcerpt(blog.excerpt || '');
    setContent(blog.content);
    setFeaturedImage(blog.featured_image || '');
    setIsPublished(blog.is_published);
    setAuthor(blog.author || '');
    setTags(blog.tags.join(', '));
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
      const blogData = {
        title,
        slug,
        excerpt: excerpt || null,
        content: content as unknown as any,
        featured_image: featuredImage || null,
        is_published: isPublished,
        published_at: isPublished ? new Date().toISOString() : null,
        author: author || null,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      };

      if (editingBlog) {
        const { error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', editingBlog.id);

        if (error) throw error;

        toast({ title: 'Blog updated successfully' });
      } else {
        const { error } = await supabase.from('blogs').insert(blogData);

        if (error) throw error;

        toast({ title: 'Blog created successfully' });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchBlogs();
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
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const { error } = await supabase.from('blogs').delete().eq('id', id);

      if (error) throw error;

      toast({ title: 'Blog deleted successfully' });
      fetchBlogs();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const togglePublish = async (blog: Blog) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .update({
          is_published: !blog.is_published,
          published_at: !blog.is_published ? new Date().toISOString() : null,
        })
        .eq('id', blog.id);

      if (error) throw error;

      toast({
        title: blog.is_published ? 'Blog unpublished' : 'Blog published',
      });
      fetchBlogs();
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
            <h1 className="text-3xl font-bold">Blogs</h1>
            <p className="text-muted-foreground mt-1">Manage your blog posts</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Blog
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingBlog ? 'Edit Blog' : 'Create New Blog'}
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
                        if (!editingBlog) {
                          setSlug(generateSlug(e.target.value));
                        }
                      }}
                      placeholder="Blog title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="blog-url-slug"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief description..."
                    className="h-20"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Featured Image</Label>
                  {featuredImage ? (
                    <div className="relative inline-block">
                      <img
                        src={featuredImage}
                        alt="Featured"
                        className="max-h-40 rounded-lg"
                      />
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
                    <MediaUploader
                      accept="image/*"
                      onUpload={setFeaturedImage}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Content</Label>
                  <ContentEditor blocks={content} onChange={setContent} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Author name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="ai, automation, business"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="published"
                    checked={isPublished}
                    onCheckedChange={setIsPublished}
                  />
                  <Label htmlFor="published">Publish immediately</Label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={saving}>
                    {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingBlog ? 'Update' : 'Create'} Blog
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
        ) : blogs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No blogs yet. Create your first blog post!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {blogs.map((blog) => (
              <Card key={blog.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {blog.featured_image && (
                      <img
                        src={blog.featured_image}
                        alt={blog.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold truncate">{blog.title}</h3>
                        {blog.is_published ? (
                          <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">
                            Published
                          </span>
                        ) : (
                          <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full">
                            Draft
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {blog.excerpt || 'No excerpt'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(blog.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePublish(blog)}
                        title={blog.is_published ? 'Unpublish' : 'Publish'}
                      >
                        {blog.is_published ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(blog)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(blog.id)}
                      >
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

export default BlogsAdmin;
