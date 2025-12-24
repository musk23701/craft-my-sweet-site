import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  is_visible?: boolean;
}

interface HeaderConfig {
  logoUrl: string | null;
  navLinks: NavLink[];
}

// Global cache to prevent reloading on every component mount
let cachedConfig: HeaderConfig | null = null;
let cachePromise: Promise<HeaderConfig> | null = null;

const fetchHeaderConfig = async (): Promise<HeaderConfig> => {
  const { data } = await supabase
    .from('header_config')
    .select('nav_links, logo_url')
    .limit(1)
    .maybeSingle();

  const allLinks = (data?.nav_links as unknown as NavLink[]) || [];
  // Filter out hidden pages
  const visibleLinks = allLinks.filter(link => link.is_visible !== false);

  const config: HeaderConfig = {
    logoUrl: data?.logo_url || null,
    navLinks: visibleLinks,
  };

  cachedConfig = config;
  return config;
};

export const useHeaderConfig = () => {
  const [config, setConfig] = useState<HeaderConfig | null>(cachedConfig);
  const [loading, setLoading] = useState(!cachedConfig);

  useEffect(() => {
    // If already cached, use it immediately
    if (cachedConfig) {
      setConfig(cachedConfig);
      setLoading(false);
      return;
    }

    // If fetch is already in progress, wait for it
    if (cachePromise) {
      cachePromise.then(result => {
        setConfig(result);
        setLoading(false);
      });
      return;
    }

    // Start new fetch
    cachePromise = fetchHeaderConfig();
    cachePromise.then(result => {
      setConfig(result);
      setLoading(false);
      cachePromise = null;
    });
  }, []);

  return { 
    logoUrl: config?.logoUrl, 
    navLinks: config?.navLinks || [], 
    loading 
  };
};

// Function to invalidate cache when admin updates
export const invalidateHeaderCache = () => {
  cachedConfig = null;
  cachePromise = null;
};
