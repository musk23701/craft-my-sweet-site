import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2, GripVertical, Save } from 'lucide-react';
import { SortableList } from '@/hooks/useSortable';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  is_visible: boolean;
  order_index: number;
}

const FAQsAdmin = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const fetchFaqs = async () => {
    try {
      const { data, error } = await supabase.from('faqs').select('*').order('order_index', { ascending: true });
      if (error) throw error;
      setFaqs(data || []);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFaqs(); }, []);

  const resetForm = () => {
    setQuestion('');
    setAnswer('');
    setIsVisible(true);
    setEditingFaq(null);
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setIsVisible(faq.is_visible);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!question.trim() || !answer.trim()) {
      toast({ title: 'Error', description: 'Question and answer are required', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const faqData = {
        question,
        answer,
        is_visible: isVisible,
        order_index: editingFaq?.order_index || faqs.length,
      };

      if (editingFaq) {
        const { error } = await supabase.from('faqs').update(faqData).eq('id', editingFaq.id);
        if (error) throw error;
        toast({ title: 'FAQ updated' });
      } else {
        const { error } = await supabase.from('faqs').insert(faqData);
        if (error) throw error;
        toast({ title: 'FAQ created' });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchFaqs();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    try {
      const { error } = await supabase.from('faqs').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'FAQ deleted' });
      fetchFaqs();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const toggleVisibility = async (faq: FAQ) => {
    try {
      const { error } = await supabase.from('faqs').update({ is_visible: !faq.is_visible }).eq('id', faq.id);
      if (error) throw error;
      toast({ title: faq.is_visible ? 'FAQ hidden' : 'FAQ visible' });
      fetchFaqs();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleReorder = (newFaqs: FAQ[]) => {
    setFaqs(newFaqs);
    setHasChanges(true);
  };

  const saveOrder = async () => {
    setSaving(true);
    try {
      for (let i = 0; i < faqs.length; i++) {
        const { error } = await supabase.from('faqs').update({ order_index: i }).eq('id', faqs[i].id);
        if (error) throw error;
      }
      setHasChanges(false);
      toast({ title: 'Order saved' });
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
            <h1 className="text-3xl font-bold">FAQs</h1>
            <p className="text-muted-foreground mt-1">Drag to reorder, manage frequently asked questions</p>
          </div>
          <div className="flex gap-2">
            {hasChanges && (
              <Button variant="outline" onClick={saveOrder} disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Order
              </Button>
            )}
            <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
              <DialogTrigger asChild>
                <Button><Plus className="w-4 h-4 mr-2" />Add FAQ</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Question</Label>
                    <Input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="What is your question?" />
                  </div>
                  <div className="space-y-2">
                    <Label>Answer</Label>
                    <Textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Answer to the question..." className="h-32" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={isVisible} onCheckedChange={setIsVisible} />
                    <Label>Visible on website</Label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>Cancel</Button>
                    <Button onClick={handleSave} disabled={saving}>
                      {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      {editingFaq ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : faqs.length === 0 ? (
          <Card><CardContent className="py-12 text-center"><p className="text-muted-foreground">No FAQs yet.</p></CardContent></Card>
        ) : (
          <SortableList
            items={faqs}
            onReorder={handleReorder}
            renderItem={(faq, listeners, isDragging) => (
              <Card className={isDragging ? 'ring-2 ring-primary' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div {...listeners} className="cursor-grab active:cursor-grabbing mt-1">
                      <GripVertical className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{faq.question}</h3>
                        {!faq.is_visible && <span className="text-xs bg-muted px-2 py-0.5 rounded">Hidden</span>}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{faq.answer}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => toggleVisibility(faq)}>
                        {faq.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(faq)}><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(faq.id)}><Trash2 className="w-4 h-4" /></Button>
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

export default FAQsAdmin;
