import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SocialLink {
  platform: string;
  url: string;
}

// Global cache to prevent reloading on every component mount
let cachedSocialLinks: SocialLink[] | null = null;
let cachePromise: Promise<SocialLink[]> | null = null;

const fetchSocialLinks = async (): Promise<SocialLink[]> => {
  const { data } = await supabase
    .from('footer_config')
    .select('social_links')
    .limit(1)
    .maybeSingle();

  const links = (data?.social_links as unknown as SocialLink[]) || [];
  cachedSocialLinks = links;
  return links;
};

export const useSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(cachedSocialLinks || []);
  const [loading, setLoading] = useState(!cachedSocialLinks);

  useEffect(() => {
    if (cachedSocialLinks) {
      setSocialLinks(cachedSocialLinks);
      setLoading(false);
      return;
    }

    if (cachePromise) {
      cachePromise.then(result => {
        setSocialLinks(result);
        setLoading(false);
      });
      return;
    }

    cachePromise = fetchSocialLinks();
    cachePromise.then(result => {
      setSocialLinks(result);
      setLoading(false);
      cachePromise = null;
    });
  }, []);

  return { socialLinks, loading };
};

// Function to invalidate cache when admin updates
export const invalidateSocialLinksCache = () => {
  cachedSocialLinks = null;
  cachePromise = null;
};
