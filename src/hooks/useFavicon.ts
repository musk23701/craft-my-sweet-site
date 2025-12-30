import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useFavicon = () => {
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavicon = async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'favicon')
        .maybeSingle();

      if (data?.value) {
        const val = data.value as { url?: string };
        if (val.url) {
          setFaviconUrl(val.url);
        }
      }
    };

    fetchFavicon();
  }, []);

  useEffect(() => {
    if (!faviconUrl) return;

    // Find existing favicon link or create one
    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    
    link.type = 'image/x-icon';
    link.href = faviconUrl;

    // Also update apple-touch-icon if exists or create one
    let appleLink = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement;
    if (!appleLink) {
      appleLink = document.createElement('link');
      appleLink.rel = 'apple-touch-icon';
      document.head.appendChild(appleLink);
    }
    appleLink.href = faviconUrl;

  }, [faviconUrl]);

  return faviconUrl;
};
