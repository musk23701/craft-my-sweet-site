import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2, Instagram, Youtube } from 'lucide-react';
import MediaUploader from '@/components/admin/MediaUploader';

interface Video {
  id: string;
  platform: 'instagram' | 'youtube' | 'tiktok';
  title: string | null;
  video_url: string;
  thumbnail_url: string | null;
  is_visible: boolean;
  order_index: number;
  created_at: string;
}

const VideosAdmin = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('instagram');
  const { toast } = useToast();

  // Form state
  const [platform, setPlatform] = useState<'instagram' | 'youtube' | 'tiktok'>('instagram');
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;

      setVideos(data as Video[]);
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
    fetchVideos();
  }, []);

  const resetForm = () => {
    setPlatform('instagram');
    setTitle('');
    setVideoUrl('');
    setThumbnailUrl('');
    setIsVisible(true);
    setEditingVideo(null);
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setPlatform(video.platform);
    setTitle(video.title || '');
    setVideoUrl(video.video_url);
    setThumbnailUrl(video.thumbnail_url || '');
    setIsVisible(video.is_visible);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!videoUrl.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Video URL is required',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);

    try {
      const videoData = {
        platform,
        title: title || null,
        video_url: videoUrl,
        thumbnail_url: thumbnailUrl || null,
        is_visible: isVisible,
        order_index: editingVideo?.order_index || videos.filter(v => v.platform === platform).length,
      };

      if (editingVideo) {
        const { error } = await supabase
          .from('videos')
          .update(videoData)
          .eq('id', editingVideo.id);

        if (error) throw error;

        toast({ title: 'Video updated successfully' });
      } else {
        const { error } = await supabase.from('videos').insert(videoData);

        if (error) throw error;

        toast({ title: 'Video added successfully' });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchVideos();
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
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      const { error } = await supabase.from('videos').delete().eq('id', id);

      if (error) throw error;

      toast({ title: 'Video deleted successfully' });
      fetchVideos();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const toggleVisibility = async (video: Video) => {
    try {
      const { error } = await supabase
        .from('videos')
        .update({ is_visible: !video.is_visible })
        .eq('id', video.id);

      if (error) throw error;

      toast({ title: video.is_visible ? 'Video hidden' : 'Video visible' });
      fetchVideos();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getFilteredVideos = (platform: string) => {
    return videos.filter(v => v.platform === platform);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-5 h-5 text-pink-500" />;
      case 'youtube':
        return <Youtube className="w-5 h-5 text-red-500" />;
      case 'tiktok':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Videos</h1>
            <p className="text-muted-foreground mt-1">Manage Instagram, YouTube, and TikTok videos</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Video
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingVideo ? 'Edit Video' : 'Add New Video'}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select value={platform} onValueChange={(v) => setPlatform(v as any)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title (optional)</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Video title"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Video File</Label>
                  {videoUrl ? (
                    <div className="relative">
                      <video
                        src={videoUrl}
                        className="w-full h-40 object-cover rounded-lg"
                        controls
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => setVideoUrl('')}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <MediaUploader
                      accept="video/*"
                      maxSize={50}
                      onUpload={setVideoUrl}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Thumbnail (optional)</Label>
                  {thumbnailUrl ? (
                    <div className="relative inline-block">
                      <img src={thumbnailUrl} alt="Thumbnail" className="max-h-32 rounded-lg" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => setThumbnailUrl('')}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <MediaUploader
                      accept="image/*"
                      onUpload={setThumbnailUrl}
                    />
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Switch id="visible" checked={isVisible} onCheckedChange={setIsVisible} />
                  <Label htmlFor="visible">Visible on website</Label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={saving}>
                    {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingVideo ? 'Update' : 'Add'} Video
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
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="instagram" className="flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                Instagram ({getFilteredVideos('instagram').length})
              </TabsTrigger>
              <TabsTrigger value="youtube" className="flex items-center gap-2">
                <Youtube className="w-4 h-4" />
                YouTube ({getFilteredVideos('youtube').length})
              </TabsTrigger>
              <TabsTrigger value="tiktok" className="flex items-center gap-2">
                TikTok ({getFilteredVideos('tiktok').length})
              </TabsTrigger>
            </TabsList>

            {['instagram', 'youtube', 'tiktok'].map((platform) => (
              <TabsContent key={platform} value={platform}>
                {getFilteredVideos(platform).length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground">No {platform} videos yet.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getFilteredVideos(platform).map((video) => (
                      <Card key={video.id}>
                        <CardContent className="p-4">
                          <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-3">
                            {video.thumbnail_url ? (
                              <img
                                src={video.thumbnail_url}
                                alt={video.title || 'Video thumbnail'}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <video
                                src={video.video_url}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getPlatformIcon(video.platform)}
                              <span className="text-sm font-medium truncate">
                                {video.title || 'Untitled'}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => toggleVisibility(video)}
                              >
                                {video.is_visible ? (
                                  <Eye className="w-4 h-4" />
                                ) : (
                                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleEdit(video)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => handleDelete(video.id)}
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
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </AdminLayout>
  );
};

export default VideosAdmin;
