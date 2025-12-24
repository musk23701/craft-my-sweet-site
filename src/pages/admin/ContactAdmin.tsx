import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, AlertCircle, CheckCircle } from 'lucide-react';

// Allowed booking domains for security
const ALLOWED_BOOKING_DOMAINS = [
  'calendly.com',
  'cal.com',
  'hubspot.com',
  'acuityscheduling.com',
  'youcanbook.me',
  'squareup.com',
  'schedule.google.com',
  'outlook.office365.com',
  'tidycal.com',
  'savvycal.com',
];

// Extract and validate iframe src URL from HTML or direct URL
const extractBookingUrl = (input: string): { url: string | null; error: string | null } => {
  if (!input || !input.trim()) return { url: null, error: null };
  
  let url = input.trim();
  
  // If it looks like an iframe tag, extract the src
  if (url.toLowerCase().includes('<iframe')) {
    const srcMatch = url.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) {
      url = srcMatch[1];
    } else {
      return { url: null, error: 'Could not extract src from iframe code' };
    }
  }
  
  // Validate URL format
  try {
    const parsedUrl = new URL(url);
    
    // Only allow https
    if (parsedUrl.protocol !== 'https:') {
      return { url: null, error: 'URL must use HTTPS' };
    }
    
    // Check against whitelist of allowed domains
    const hostname = parsedUrl.hostname.toLowerCase();
    const isAllowed = ALLOWED_BOOKING_DOMAINS.some(domain => 
      hostname === domain || hostname.endsWith('.' + domain)
    );
    
    if (!isAllowed) {
      return { url: null, error: `Domain "${hostname}" not in allowed list. Supported: ${ALLOWED_BOOKING_DOMAINS.join(', ')}` };
    }
    
    return { url, error: null };
  } catch {
    return { url: null, error: 'Invalid URL format' };
  }
};

const ContactAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [contactId, setContactId] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bookingIframeCode, setBookingIframeCode] = useState('');
  const [mapUrl, setMapUrl] = useState('');

  const fetchContact = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setContactId(data.id);
        setEmail(data.email || '');
        setPhone(data.phone || '');
        setAddress(data.address || '');
        setMapUrl((data as any).map_url || '');
        setBookingIframeCode(data.booking_iframe_code || '');
      } else {
        setEmail('Info@automindlabs.ai');
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContact(); }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const contactData = {
        email: email || null,
        phone: phone || null,
        address: address || null,
        booking_iframe_code: bookingIframeCode || null,
        map_url: mapUrl || null,
      };

      if (contactId) {
        const { error } = await supabase
          .from('contact_info')
          .update(contactData)
          .eq('id', contactId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('contact_info')
          .insert(contactData)
          .select()
          .single();
        if (error) throw error;
        setContactId(data.id);
      }

      toast({ title: 'Contact info saved successfully' });
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
            <h1 className="text-3xl font-bold">Contact Information</h1>
            <p className="text-muted-foreground mt-1">Manage contact details and booking settings</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@company.com"
                />
              </div>

              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Business St, City, Country"
                  className="h-20"
                />
              </div>

              <div className="space-y-2">
                <Label>Google Maps URL</Label>
                <Input
                  value={mapUrl}
                  onChange={(e) => setMapUrl(e.target.value)}
                  placeholder="https://www.google.com/maps/embed?..."
                />
                <p className="text-xs text-muted-foreground">
                  Paste the embed URL from Google Maps (click Share → Embed a map → copy the src URL)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Booking Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Booking Iframe Code</Label>
                <Textarea
                  value={bookingIframeCode}
                  onChange={(e) => setBookingIframeCode(e.target.value)}
                  placeholder='<iframe src="https://calendly.com/..." ...></iframe>'
                  className="h-32 font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Paste the complete iframe embed code from your booking provider (Calendly, Cal.com, etc.)
                </p>
              </div>

              {bookingIframeCode && (() => {
                const { url, error } = extractBookingUrl(bookingIframeCode);
                return (
                  <div className="space-y-2">
                    <Label>Preview</Label>
                    {error ? (
                      <div className="border rounded-lg p-4 bg-destructive/10 border-destructive/30 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-destructive">Invalid booking URL</p>
                          <p className="text-sm text-muted-foreground mt-1">{error}</p>
                        </div>
                      </div>
                    ) : url ? (
                      <>
                        <div className="flex items-center gap-2 text-sm text-green-600 mb-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>Valid booking URL detected</span>
                        </div>
                        <div className="border rounded-lg overflow-hidden bg-muted/50 min-h-[300px]">
                          <iframe
                            src={url}
                            width="100%"
                            height="400"
                            frameBorder="0"
                            allow="camera; microphone; fullscreen; payment"
                            title="Booking preview"
                            loading="lazy"
                          />
                        </div>
                      </>
                    ) : null}
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </div>

        <p className="text-sm text-muted-foreground">
          Social media links are managed in Settings → Header & Footer
        </p>
      </div>
    </AdminLayout>
  );
};

export default ContactAdmin;
