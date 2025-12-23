import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Plus, Trash2 } from 'lucide-react';
import MediaUploader from '@/components/admin/MediaUploader';

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

interface SocialLink {
  platform: string;
  url: string;
}

const HeaderFooterAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Header state
  const [logoUrl, setLogoUrl] = useState('');
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [headerId, setHeaderId] = useState<string | null>(null);

  // Footer state
  const [companyName, setCompanyName] = useState('');
  const [tagline, setTagline] = useState('');
  const [footerEmail, setFooterEmail] = useState('');
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [footerId, setFooterId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      // Fetch header config
      const { data: headerData } = await supabase.from('header_config').select('*').limit(1).maybeSingle();
      
      if (headerData) {
        setHeaderId(headerData.id);
        setLogoUrl(headerData.logo_url || '');
        setNavLinks(Array.isArray(headerData.nav_links) ? (headerData.nav_links as unknown as NavLink[]) : []);
      } else {
        // Initialize with defaults
        setNavLinks([
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Portfolio', href: '/portfolio' },
          { label: 'Blog', href: '/blog' },
          { label: 'Contact', href: '/contact' },
          { label: 'Book Call', href: '/booking' },
        ]);
      }

      // Fetch footer config
      const { data: footerData } = await supabase.from('footer_config').select('*').limit(1).maybeSingle();
      
      if (footerData) {
        setFooterId(footerData.id);
        setCompanyName(footerData.company_name || '');
        setTagline(footerData.tagline || '');
        setFooterEmail(footerData.email || '');
        setSocialLinks(Array.isArray(footerData.social_links) ? (footerData.social_links as unknown as SocialLink[]) : []);
      } else {
        setCompanyName('Automind Labs AI');
        setTagline('Building intelligent systems for modern businesses.');
        setFooterEmail('Info@automindlabs.ai');
        setSocialLinks([
          { platform: 'instagram', url: '#' },
          { platform: 'twitter', url: '#' },
          { platform: 'linkedin', url: '#' },
          { platform: 'youtube', url: '#' },
        ]);
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const addNavLink = () => {
    setNavLinks([...navLinks, { label: '', href: '' }]);
  };

  const updateNavLink = (index: number, field: keyof NavLink, value: string | boolean) => {
    const updated = [...navLinks];
    updated[index] = { ...updated[index], [field]: value };
    setNavLinks(updated);
  };

  const removeNavLink = (index: number) => {
    setNavLinks(navLinks.filter((_, i) => i !== index));
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: '', url: '' }]);
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setSocialLinks(updated);
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save header
      const headerData = {
        logo_url: logoUrl || null,
        nav_links: navLinks as unknown as any,
      };

      if (headerId) {
        const { error } = await supabase.from('header_config').update(headerData).eq('id', headerId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from('header_config').insert(headerData).select().single();
        if (error) throw error;
        setHeaderId(data.id);
      }

      // Save footer
      const footerData = {
        company_name: companyName || null,
        tagline: tagline || null,
        email: footerEmail || null,
        social_links: socialLinks as unknown as any,
      };

      if (footerId) {
        const { error } = await supabase.from('footer_config').update(footerData).eq('id', footerId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from('footer_config').insert(footerData).select().single();
        if (error) throw error;
        setFooterId(data.id);
      }

      toast({ title: 'Settings saved successfully' });
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
            <h1 className="text-3xl font-bold">Header & Footer</h1>
            <p className="text-muted-foreground mt-1">Manage navigation and footer settings</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Header Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Header Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Logo</Label>
                {logoUrl ? (
                  <div className="relative inline-block">
                    <img src={logoUrl} alt="Logo" className="h-16 w-auto" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => setLogoUrl('')}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <MediaUploader accept="image/*" onUpload={setLogoUrl} />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Navigation Links</Label>
                  <Button variant="outline" size="sm" onClick={addNavLink}>
                    <Plus className="w-4 h-4 mr-1" /> Add Link
                  </Button>
                </div>
                <div className="space-y-2">
                  {navLinks.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Label"
                        value={link.label}
                        onChange={(e) => updateNavLink(index, 'label', e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="/path or https://..."
                        value={link.href}
                        onChange={(e) => updateNavLink(index, 'href', e.target.value)}
                        className="flex-1"
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeNavLink(index)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Footer Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your Company Name"
                />
              </div>

              <div className="space-y-2">
                <Label>Tagline</Label>
                <Input
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Your company tagline"
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  placeholder="contact@company.com"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Social Links</Label>
                  <Button variant="outline" size="sm" onClick={addSocialLink}>
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {socialLinks.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Platform"
                        value={link.platform}
                        onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                        className="w-32"
                      />
                      <Input
                        placeholder="https://..."
                        value={link.url}
                        onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                        className="flex-1"
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeSocialLink(index)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HeaderFooterAdmin;
