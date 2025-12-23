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
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  is_visible: boolean;
  order_index: number;
}

const ServicesAdmin = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase.from('services').select('*').order('order_index', { ascending: true });
      if (error) throw error;
      setServices(data || []);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setIcon('');
    setIsVisible(true);
    setEditingService(null);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setTitle(service.title);
    setDescription(service.description || '');
    setIcon(service.icon || '');
    setIsVisible(service.is_visible);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast({ title: 'Error', description: 'Title is required', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const serviceData = {
        title,
        description: description || null,
        icon: icon || null,
        is_visible: isVisible,
        order_index: editingService?.order_index || services.length,
      };

      if (editingService) {
        const { error } = await supabase.from('services').update(serviceData).eq('id', editingService.id);
        if (error) throw error;
        toast({ title: 'Service updated' });
      } else {
        const { error } = await supabase.from('services').insert(serviceData);
        if (error) throw error;
        toast({ title: 'Service created' });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchServices();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Service deleted' });
      fetchServices();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const toggleVisibility = async (service: Service) => {
    try {
      const { error } = await supabase.from('services').update({ is_visible: !service.is_visible }).eq('id', service.id);
      if (error) throw error;
      toast({ title: service.is_visible ? 'Service hidden' : 'Service visible' });
      fetchServices();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Services</h1>
            <p className="text-muted-foreground mt-1">Manage your service offerings</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" />Add Service</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Service title" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Service description..." className="h-24" />
                </div>
                <div className="space-y-2">
                  <Label>Icon (Lucide icon name)</Label>
                  <Input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="e.g., Bot, Workflow, Database" />
                  <p className="text-xs text-muted-foreground">Enter a Lucide icon name like Bot, Workflow, Database, BarChart3</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={isVisible} onCheckedChange={setIsVisible} />
                  <Label>Visible on website</Label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>Cancel</Button>
                  <Button onClick={handleSave} disabled={saving}>
                    {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingService ? 'Update' : 'Create'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : services.length === 0 ? (
          <Card><CardContent className="py-12 text-center"><p className="text-muted-foreground">No services yet.</p></CardContent></Card>
        ) : (
          <div className="grid gap-4">
            {services.map((service) => (
              <Card key={service.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{service.title}</h3>
                        {service.icon && <span className="text-xs bg-muted px-2 py-0.5 rounded">{service.icon}</span>}
                        {!service.is_visible && <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded">Hidden</span>}
                      </div>
                      {service.description && <p className="text-sm text-muted-foreground mt-1">{service.description}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => toggleVisibility(service)}>
                        {service.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(service.id)}><Trash2 className="w-4 h-4" /></Button>
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

export default ServicesAdmin;
