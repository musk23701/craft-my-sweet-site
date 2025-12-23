import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Loader2, Image, Video, FileText, Copy, Check } from 'lucide-react';
import MediaUploader from '@/components/admin/MediaUploader';

interface MediaItem {
  id: string;
  name: string;
  file_url: string;
  file_type: string;
  file_size: number | null;
  alt_text: string | null;
  created_at: string;
}

const MediaAdmin = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedia(data || []);
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleDelete = async (item: MediaItem) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      // Extract file path from URL
      const urlParts = item.file_url.split('/media/');
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        await supabase.storage.from('media').remove([filePath]);
      }

      const { error } = await supabase.from('media').delete().eq('id', item.id);
      if (error) throw error;

      toast({ title: 'File deleted successfully' });
      fetchMedia();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({ title: 'URL copied to clipboard' });
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (type: string) => {
    if (type === 'image') return <Image className="w-5 h-5 text-green-500" />;
    if (type === 'video') return <Video className="w-5 h-5 text-red-500" />;
    return <FileText className="w-5 h-5 text-blue-500" />;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="text-muted-foreground mt-1">Upload and manage images, videos, and GIFs</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <MediaUploader
              accept="image/*,video/*,.gif"
              maxSize={50}
              onUpload={() => fetchMedia()}
            />
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : media.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No media files yet. Upload your first file above!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {media.map((item) => (
              <Card key={item.id} className="overflow-hidden group">
                <div className="aspect-square bg-muted relative">
                  {item.file_type === 'image' ? (
                    <img
                      src={item.file_url}
                      alt={item.alt_text || item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : item.file_type === 'video' ? (
                    <video
                      src={item.file_url}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {getFileIcon(item.file_type)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => copyUrl(item.file_url, item.id)}
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDelete(item)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    {getFileIcon(item.file_type)}
                    <span className="text-xs text-muted-foreground">
                      {formatFileSize(item.file_size)}
                    </span>
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

export default MediaAdmin;
