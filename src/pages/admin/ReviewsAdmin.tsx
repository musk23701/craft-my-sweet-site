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
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2, Star, GripVertical } from 'lucide-react';
import MediaUploader from '@/components/admin/MediaUploader';

interface Review {
  id: string;
  author_name: string;
  author_title: string | null;
  author_image: string | null;
  content: string;
  rating: number | null;
  is_visible: boolean;
  order_index: number;
}

const ReviewsAdmin = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [authorName, setAuthorName] = useState('');
  const [authorTitle, setAuthorTitle] = useState('');
  const [authorImage, setAuthorImage] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [isVisible, setIsVisible] = useState(true);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setReviews(data || []);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  const resetForm = () => {
    setAuthorName('');
    setAuthorTitle('');
    setAuthorImage('');
    setContent('');
    setRating(5);
    setIsVisible(true);
    setEditingReview(null);
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setAuthorName(review.author_name);
    setAuthorTitle(review.author_title || '');
    setAuthorImage(review.author_image || '');
    setContent(review.content);
    setRating(review.rating || 5);
    setIsVisible(review.is_visible);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!authorName.trim() || !content.trim()) {
      toast({ title: 'Error', description: 'Name and content are required', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const reviewData = {
        author_name: authorName,
        author_title: authorTitle || null,
        author_image: authorImage || null,
        content,
        rating,
        is_visible: isVisible,
        order_index: editingReview?.order_index || reviews.length,
      };

      if (editingReview) {
        const { error } = await supabase.from('reviews').update(reviewData).eq('id', editingReview.id);
        if (error) throw error;
        toast({ title: 'Review updated' });
      } else {
        const { error } = await supabase.from('reviews').insert(reviewData);
        if (error) throw error;
        toast({ title: 'Review created' });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchReviews();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this review?')) return;
    try {
      const { error } = await supabase.from('reviews').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Review deleted' });
      fetchReviews();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const toggleVisibility = async (review: Review) => {
    try {
      const { error } = await supabase.from('reviews').update({ is_visible: !review.is_visible }).eq('id', review.id);
      if (error) throw error;
      toast({ title: review.is_visible ? 'Review hidden' : 'Review visible' });
      fetchReviews();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Reviews</h1>
            <p className="text-muted-foreground mt-1">Manage testimonials and reviews</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" />Add Review</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingReview ? 'Edit Review' : 'Add New Review'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Author Name</Label>
                    <Input value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label>Title/Role</Label>
                    <Input value={authorTitle} onChange={(e) => setAuthorTitle(e.target.value)} placeholder="CEO at Company" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Author Image</Label>
                  {authorImage ? (
                    <div className="relative inline-block">
                      <img src={authorImage} alt="Author" className="w-16 h-16 rounded-full object-cover" />
                      <Button variant="destructive" size="icon" className="absolute -top-1 -right-1 h-5 w-5" onClick={() => setAuthorImage('')}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <MediaUploader accept="image/*" onUpload={setAuthorImage} />
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Review Content</Label>
                  <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What they said..." className="h-24" />
                </div>

                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setRating(star)}>
                        <Star className={`w-6 h-6 ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch checked={isVisible} onCheckedChange={setIsVisible} />
                  <Label>Visible on website</Label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>Cancel</Button>
                  <Button onClick={handleSave} disabled={saving}>
                    {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingReview ? 'Update' : 'Create'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : reviews.length === 0 ? (
          <Card><CardContent className="py-12 text-center"><p className="text-muted-foreground">No reviews yet.</p></CardContent></Card>
        ) : (
          <div className="grid gap-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {review.author_image ? (
                      <img src={review.author_image} alt={review.author_name} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        {review.author_name[0]}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{review.author_name}</h3>
                        {!review.is_visible && <span className="text-xs bg-muted px-2 py-0.5 rounded">Hidden</span>}
                      </div>
                      {review.author_title && <p className="text-sm text-muted-foreground">{review.author_title}</p>}
                      <p className="text-sm mt-2">{review.content}</p>
                      {review.rating && (
                        <div className="flex gap-0.5 mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className={`w-4 h-4 ${star <= review.rating! ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => toggleVisibility(review)}>
                        {review.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(review)}><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(review.id)}><Trash2 className="w-4 h-4" /></Button>
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

export default ReviewsAdmin;
