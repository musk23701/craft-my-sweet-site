import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Section {
  id: string;
  name: string;
  display_name: string;
  is_visible: boolean;
  order_index: number;
}

// Global cache to prevent refetching on every component mount
let cachedSections: Section[] | null = null;
let sectionsFetchPromise: Promise<Section[]> | null = null;

const fetchSectionsData = async (): Promise<Section[]> => {
  const { data, error } = await supabase
    .from('sections')
    .select('*')
    .order('order_index', { ascending: true });
  
  if (error) {
    console.error('Error fetching sections:', error);
    return [];
  }
  
  cachedSections = data || [];
  return cachedSections;
};

export const useSections = () => {
  const [sections, setSections] = useState<Section[]>(cachedSections || []);
  const [loading, setLoading] = useState(!cachedSections);

  useEffect(() => {
    // If we already have cached data, use it
    if (cachedSections && cachedSections.length > 0) {
      setSections(cachedSections);
      setLoading(false);
      return;
    }

    // If a fetch is already in progress, wait for it
    if (sectionsFetchPromise) {
      sectionsFetchPromise.then(data => {
        setSections(data);
        setLoading(false);
      });
      return;
    }

    // Start a new fetch
    sectionsFetchPromise = fetchSectionsData();
    sectionsFetchPromise.then(data => {
      setSections(data);
      setLoading(false);
      sectionsFetchPromise = null;
    });
  }, []);

  const isSectionVisible = (name: string) => {
    // Use the local state sections which will have the latest data
    const section = sections.find(s => s.name === name);
    // If section not found in database, default to hidden (safer default)
    // This prevents showing sections that haven't been configured
    if (!section) {
      console.warn(`Section "${name}" not found in database, defaulting to hidden`);
      return false;
    }
    return section.is_visible;
  };

  return { sections, loading, isSectionVisible };
};

// Function to invalidate cache when admin updates sections
export const invalidateSectionsCache = () => {
  cachedSections = null;
  sectionsFetchPromise = null;
};

export const useFAQs = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      const { data } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_visible', true)
        .order('order_index', { ascending: true });
      
      setFaqs(data || []);
      setLoading(false);
    };

    fetchFaqs();
  }, []);

  return { faqs, loading };
};

export const useReviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_visible', true)
        .order('order_index', { ascending: true });
      
      setReviews(data || []);
      setLoading(false);
    };

    fetchReviews();
  }, []);

  return { reviews, loading };
};

export const useServices = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from('services')
        .select('*')
        .eq('is_visible', true)
        .order('order_index', { ascending: true });
      
      setServices(data || []);
      setLoading(false);
    };

    fetchServices();
  }, []);

  return { services, loading };
};

export const useVideos = (platform?: 'instagram' | 'youtube' | 'tiktok') => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      let query = supabase
        .from('videos')
        .select('*')
        .eq('is_visible', true)
        .order('order_index', { ascending: true });

      if (platform) {
        query = query.eq('platform', platform);
      }

      const { data } = await query;
      setVideos(data || []);
      setLoading(false);
    };

    fetchVideos();
  }, [platform]);

  return { videos, loading };
};

export const useContactInfo = () => {
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      const { data } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .maybeSingle();
      
      setContactInfo(data);
      setLoading(false);
    };

    fetchContactInfo();
  }, []);

  return { contactInfo, loading };
};

export const useFooterConfig = () => {
  const [footerConfig, setFooterConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterConfig = async () => {
      const { data } = await supabase
        .from('footer_config')
        .select('*')
        .limit(1)
        .maybeSingle();
      
      setFooterConfig(data);
      setLoading(false);
    };

    fetchFooterConfig();
  }, []);

  return { footerConfig, loading };
};

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      
      setBlogs(data || []);
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  return { blogs, loading };
};

export const usePortfolio = () => {
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data } = await supabase
        .from('portfolio')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true });
      
      setPortfolio(data || []);
      setLoading(false);
    };

    fetchPortfolio();
  }, []);

  return { portfolio, loading };
};
