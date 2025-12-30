import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const DatabaseBackup = () => {
  const handleDownload = () => {
    const sqlContent = `-- =====================================================
-- AUTOMIND LABS DATABASE BACKUP
-- Generated: 2025-12-30
-- =====================================================

-- =====================================================
-- EXTENSIONS
-- =====================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CUSTOM TYPES
-- =====================================================
DO $$ BEGIN
    CREATE TYPE app_role AS ENUM ('admin', 'editor');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- =====================================================
-- FUNCTIONS
-- =====================================================

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- =====================================================
-- TABLES
-- =====================================================

CREATE TABLE IF NOT EXISTS public.blogs (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    slug text NOT NULL UNIQUE,
    excerpt text,
    content jsonb NOT NULL DEFAULT '[]'::jsonb,
    featured_image text,
    author text,
    tags text[] DEFAULT '{}'::text[],
    is_published boolean NOT NULL DEFAULT false,
    published_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.faqs (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    question text NOT NULL,
    answer text NOT NULL,
    order_index integer NOT NULL DEFAULT 0,
    is_visible boolean NOT NULL DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.reviews (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    author_name text NOT NULL,
    author_title text,
    author_image text,
    content text NOT NULL,
    rating integer,
    order_index integer NOT NULL DEFAULT 0,
    is_visible boolean NOT NULL DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.services (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    description text,
    icon text,
    order_index integer NOT NULL DEFAULT 0,
    is_visible boolean NOT NULL DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.videos (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title text,
    video_url text NOT NULL,
    thumbnail_url text,
    platform text NOT NULL,
    order_index integer NOT NULL DEFAULT 0,
    is_visible boolean NOT NULL DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.sections (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    display_name text NOT NULL,
    content jsonb NOT NULL DEFAULT '{}'::jsonb,
    order_index integer NOT NULL DEFAULT 0,
    is_visible boolean NOT NULL DEFAULT true,
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.portfolio (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    slug text NOT NULL UNIQUE,
    description text,
    content jsonb NOT NULL DEFAULT '[]'::jsonb,
    featured_image text,
    category text,
    client_name text,
    project_url text,
    order_index integer NOT NULL DEFAULT 0,
    is_published boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.media (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    file_url text NOT NULL,
    file_type text NOT NULL,
    file_size integer,
    alt_text text,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.contact_info (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    email text,
    phone text,
    address text,
    map_url text,
    booking_iframe_code text,
    social_links jsonb NOT NULL DEFAULT '{}'::jsonb,
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.footer_config (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    company_name text,
    tagline text,
    email text,
    social_links jsonb NOT NULL DEFAULT '[]'::jsonb,
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.header_config (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    logo_url text,
    nav_links jsonb NOT NULL DEFAULT '[]'::jsonb,
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.site_settings (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    key text NOT NULL UNIQUE,
    value jsonb NOT NULL DEFAULT '{}'::jsonb,
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL UNIQUE,
    email text NOT NULL,
    full_name text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_roles (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.header_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published blogs" ON public.blogs FOR SELECT USING ((is_published = true) OR has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage blogs" ON public.blogs FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can read visible faqs" ON public.faqs FOR SELECT USING ((is_visible = true) OR has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage faqs" ON public.faqs FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can read visible reviews" ON public.reviews FOR SELECT USING ((is_visible = true) OR has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage reviews" ON public.reviews FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can read visible services" ON public.services FOR SELECT USING ((is_visible = true) OR has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage services" ON public.services FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can read visible videos" ON public.videos FOR SELECT USING ((is_visible = true) OR has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage videos" ON public.videos FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can read sections" ON public.sections FOR SELECT USING (true);
CREATE POLICY "Admins can manage sections" ON public.sections FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can read published portfolio" ON public.portfolio FOR SELECT USING ((is_published = true) OR has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage portfolio" ON public.portfolio FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can read media" ON public.media FOR SELECT USING (true);
CREATE POLICY "Admins can manage media" ON public.media FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can read contact info" ON public.contact_info FOR SELECT USING (true);
CREATE POLICY "Admins can manage contact info" ON public.contact_info FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can read footer config" ON public.footer_config FOR SELECT USING (true);
CREATE POLICY "Admins can manage footer config" ON public.footer_config FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can read header config" ON public.header_config FOR SELECT USING (true);
CREATE POLICY "Admins can manage header config" ON public.header_config FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can read site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage site settings" ON public.site_settings FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can update all profiles" ON public.profiles FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- =====================================================
-- DATA: BLOGS
-- =====================================================
INSERT INTO public.blogs (id, title, slug, excerpt, content, featured_image, author, tags, is_published, published_at, created_at, updated_at) VALUES
('91c892ea-dd01-440e-b139-b99b004dfbae', 'The AI Research Agent Wars: A 24-Hour Analysis', 'ai-research-agent-wars', 'The AI landscape just experienced one of its most significant 24-hour periods in recent history with major announcements from multiple players.', '[{"content":"In a single day, we saw announcements from OpenAI, Google, and Anthropic that will shape the future of AI agents.","type":"paragraph"},{"content":"What This Means for Businesses","level":2,"type":"heading"},{"content":"The competition is driving rapid innovation. Businesses that wait too long to adopt AI agents risk falling behind competitors.","type":"paragraph"}]', 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=500&fit=crop', 'Automind Labs', '{"AI Agents","Competition","Analysis"}', true, NULL, '2025-12-23 07:21:13.302542+00', '2025-12-23 07:21:13.302542+00'),
('4126d27c-5135-4d0f-8c74-23198341a3fb', 'The Future of Work: Humans and AI Collaboration', 'future-work-humans-ai', 'Explore the future of work where humans and AI collaborate, not compete. Learn how AI can enhance human capabilities.', '[{"content":"The narrative of AI replacing humans is overblown. The real opportunity lies in human-AI collaboration that amplifies both.","type":"paragraph"},{"content":"Augmentation Over Replacement","level":2,"type":"heading"},{"content":"The most successful companies are using AI to enhance their workforce, not replace it. This approach leads to better outcomes and higher employee satisfaction.","type":"paragraph"}]', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop', 'Automind Labs', '{"Future of Work","Collaboration","AI"}', true, NULL, '2025-12-23 07:21:13.302542+00', '2025-12-23 07:21:13.302542+00'),
('9e828823-60b8-4f59-b1d1-704fc8352b12', 'Lessons From History: Building Empires with AI', 'building-empires-ai', 'Discover how to build a modern empire with AI, not armies. Learn lessons from history and apply them to the digital age.', '[{"content":"Throughout history, empires rose on the back of transformative technologies. Today, AI is that technology.","type":"paragraph"},{"content":"Strategic Implementation","level":2,"type":"heading"},{"content":"Like the great empire builders of the past, modern business leaders must think strategically about AI adoption.","type":"paragraph"}]', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=500&fit=crop', 'Automind Labs', '{"Strategy","AI","Leadership"}', true, NULL, '2025-12-23 07:21:13.302542+00', '2025-12-23 07:21:13.302542+00'),
('b73aede4-2afe-4cf0-802c-b1e56ff8bd71', 'The Automation Mindset: Working Smarter', 'automation-mindset-smarter', 'Learn how the automation mindset helps you work smarter, not harder. Discover strategies to save time and boost productivity.', '[{"content":"The automation mindset is not about replacing everything with machines—it is about identifying the highest-leverage opportunities.","type":"paragraph"},{"content":"Start with High-Impact Tasks","level":2,"type":"heading"},{"content":"Focus automation efforts on repetitive, time-consuming tasks that free up time for strategic thinking and creative work.","type":"paragraph"}]', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop', 'Automind Labs', '{"Productivity","Mindset","Automation"}', true, NULL, '2025-12-23 07:21:13.302542+00', '2025-12-23 07:21:13.302542+00'),
('f6696a1f-950b-4b96-93a1-6a59cd752598', 'AI Promised a Revolution: Why It Has Not Delivered Yet', 'ai-revolution-expectations', 'An analysis of why generative AI investments have not delivered expected results—and what businesses can do differently.', '[{"content":"Despite billions in investments, many businesses report disappointment with their AI initiatives. The problem is not the technology—it is the implementation.","type":"paragraph"},{"content":"The Implementation Gap","level":2,"type":"heading"},{"content":"Most companies focus on tools rather than transformation. True AI success requires rethinking workflows from the ground up.","type":"paragraph"}]', 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=500&fit=crop', 'Automind Labs', '{"AI","Strategy","Business"}', true, '2025-12-24 06:19:53.515+00', '2025-12-23 07:21:13.302542+00', '2025-12-24 06:19:53.498444+00');

-- =====================================================
-- DATA: FAQS
-- =====================================================
INSERT INTO public.faqs (id, question, answer, order_index, is_visible, created_at, updated_at) VALUES
('e5e0c8bc-02a2-43c2-af5f-5b57041b2cb9', 'What makes Automind Labs AI different?', 'We do not sell tools or one-off automations. We build complete AI operating systems designed around your business.', 0, true, '2025-12-23 07:05:03.899808+00', '2025-12-23 07:05:03.899808+00'),
('f61ae9e6-c24e-4b9f-bee8-38f805fbf462', 'Is this only for large companies?', 'No. We work with startups, founders, and growing businesses ready to scale intelligently.', 1, true, '2025-12-23 07:05:03.899808+00', '2025-12-23 07:05:03.899808+00'),
('adbaa3ef-02a2-4a2a-95df-c2275dae4e34', 'Is my data secure?', 'Yes. Security and privacy are built into every system we design.', 2, true, '2025-12-23 07:05:03.899808+00', '2025-12-23 07:05:03.899808+00'),
('c72a71db-fdb3-49fd-93b6-cca48e6e04af', 'How long does implementation take?', 'Timelines vary, but most core systems are deployed within weeks — not months.', 3, true, '2025-12-23 07:05:03.899808+00', '2025-12-23 07:05:03.899808+00');

-- =====================================================
-- DATA: REVIEWS
-- =====================================================
INSERT INTO public.reviews (id, author_name, author_title, author_image, content, rating, order_index, is_visible, created_at, updated_at) VALUES
('394602c8-1c37-4f5b-9298-165ee2d2655b', 'Sarah Chen', 'Startup Founder', NULL, 'Working with Automind was fantastic. Great margins and their operations experience is huge!', 5, 0, true, '2025-12-23 07:05:03.899808+00', '2025-12-23 07:05:03.899808+00'),
('323bd4da-3858-4919-8bbb-a7d2ce47f46b', 'Mike Johnson', 'Agency Owner', NULL, 'POSITIVE: Send thank you email with future discount and a link to Google review', 5, 1, true, '2025-12-23 07:05:03.899808+00', '2025-12-23 07:05:03.899808+00'),
('cf6d5b5b-dbdf-48fa-9766-612f9c0d2517', 'Emily Davis', 'SaaS CEO', NULL, 'The AI agents handle customer inquiries 24/7. Our response time went from hours to seconds.', 5, 2, true, '2025-12-23 07:05:03.899808+00', '2025-12-23 07:05:03.899808+00'),
('1808e5c4-feb3-41ae-b11a-9c95d390476a', 'Alex Rivera', 'E-commerce Director', NULL, 'Data systems gave us one source of truth. Decision-making is now instant.', 5, 3, true, '2025-12-23 07:05:03.899808+00', '2025-12-23 07:05:03.899808+00');

-- =====================================================
-- DATA: SERVICES
-- =====================================================
INSERT INTO public.services (id, title, description, icon, order_index, is_visible, created_at, updated_at) VALUES
('597cdc7c-8b54-4597-8306-5011189734ed', 'AI Agents & Assistants', 'Custom AI agents trained on your business data to answer questions, handle inquiries, and assist operations 24/7.', 'Bot', 0, true, '2025-12-23 07:05:03.899808+00', '2025-12-23 07:05:03.899808+00'),
('6ff5bdb6-d164-4557-9621-93c153816733', 'Workflow Automation', 'Design and implement automations that remove repetitive tasks and connect tools seamlessly.', 'Workflow', 1, true, '2025-12-23 07:05:03.899808+00', '2025-12-23 07:05:03.899808+00'),
('efa60898-13fe-4789-8c9c-201129dfbb77', 'Data Systems & Analytics', 'Build centralized data pipelines, real-time dashboards, and custom reports for smarter decisions.', 'Database', 2, true, '2025-12-23 07:05:03.899808+00', '2025-12-23 07:05:03.899808+00'),
('e6b7de29-4779-4037-81e1-f2ffa2511f8b', 'Custom Dashboards', 'Understand your business at a glance with dashboards showing revenue, funnels, productivity, and AI impact.', 'BarChart3', 3, true, '2025-12-23 07:05:03.899808+00', '2025-12-23 07:05:03.899808+00');

-- =====================================================
-- DATA: VIDEOS
-- =====================================================
INSERT INTO public.videos (id, title, video_url, thumbnail_url, platform, order_index, is_visible, created_at, updated_at) VALUES
('ef7669b2-6bc6-4b4b-942b-03e3bec79b76', 'AI Automation Tips #1', '/videos/instagram/1.mp4', NULL, 'instagram', 0, true, '2025-12-23 07:20:31.355443+00', '2025-12-23 07:20:31.355443+00'),
('b335fbf2-7839-4dd3-94d9-4f5fe887474a', 'AI Automation Tips #2', '/videos/instagram/2.mp4', NULL, 'instagram', 1, true, '2025-12-23 07:20:31.355443+00', '2025-12-23 07:20:31.355443+00'),
('567b2bf1-e106-41d1-b5d5-494a23aab345', 'AI Automation Tips #3', '/videos/instagram/3.mp4', NULL, 'instagram', 2, true, '2025-12-23 07:20:31.355443+00', '2025-12-23 07:20:31.355443+00'),
('d081a907-c3a2-40ed-ad63-2165f0890b3e', 'AI Automation Tips #4', '/videos/instagram/4.mp4', NULL, 'instagram', 3, true, '2025-12-23 07:20:31.355443+00', '2025-12-23 07:20:31.355443+00'),
('3e83fb31-07a6-4d76-9b64-30a5379441ba', 'AI Automation Tips #5', '/videos/instagram/5.mp4', NULL, 'instagram', 4, true, '2025-12-23 07:20:31.355443+00', '2025-12-23 07:20:31.355443+00'),
('448ea52e-09bc-405a-9189-9c5573005647', 'AI Automation Tips #6', '/videos/instagram/6.mp4', NULL, 'instagram', 5, true, '2025-12-23 07:20:31.355443+00', '2025-12-23 07:20:31.355443+00'),
('00b6005c-e131-4405-a683-8873f07e60b8', 'AI Automation Tips #7', '/videos/instagram/7.mp4', NULL, 'instagram', 6, true, '2025-12-23 07:20:31.355443+00', '2025-12-23 07:20:31.355443+00'),
('3bdf450d-d720-4382-86e1-116253417171', 'AI Automation Tips #8', '/videos/instagram/8.mp4', NULL, 'instagram', 7, true, '2025-12-23 07:20:31.355443+00', '2025-12-23 07:20:31.355443+00'),
('0d6740da-c3a4-4f49-bfe8-3ccc1b75f787', 'Full AI Tutorial #1', '/videos/youtube/1.mp4', NULL, 'youtube', 0, true, '2025-12-23 07:20:31.355443+00', '2025-12-23 07:20:31.355443+00'),
('9d68e899-940e-4d7b-8200-da8cb92cf558', 'Full AI Tutorial #2', '/videos/youtube/2.mp4', NULL, 'youtube', 1, true, '2025-12-23 07:20:31.355443+00', '2025-12-23 07:20:31.355443+00'),
('5e5e555c-72ea-474a-aaa4-d201b5185791', 'Full AI Tutorial #3', '/videos/youtube/3.mp4', NULL, 'youtube', 2, true, '2025-12-23 07:20:31.355443+00', '2025-12-23 07:20:31.355443+00'),
('dafa642c-4fe1-4766-b950-346770d5e284', 'Full AI Tutorial #4', '/videos/youtube/4.mp4', NULL, 'youtube', 3, true, '2025-12-23 07:20:31.355443+00', '2025-12-23 07:20:31.355443+00'),
('5c4c6b38-f2d1-46eb-b637-dab6965073c5', 'Full AI Tutorial #5', '/videos/youtube/5.mp4', NULL, 'youtube', 4, true, '2025-12-23 07:20:31.355443+00', '2025-12-23 07:20:31.355443+00');

-- =====================================================
-- DATA: SECTIONS
-- =====================================================
INSERT INTO public.sections (id, name, display_name, content, order_index, is_visible, updated_at) VALUES
('21f49729-c9a4-47f2-a1ea-5b91f8486cf0', 'about-hero', 'About Hero', '{}', 0, true, '2025-12-24 07:07:38.990641+00'),
('3f4418a5-273f-4cd7-8d84-789ec2d44cd2', 'about-story', 'Our Story', '{}', 1, true, '2025-12-24 07:07:38.990641+00'),
('a1601db2-2550-4cb6-989a-be6aacbcb6b9', 'about-mission', 'Mission & Vision', '{}', 2, true, '2025-12-24 07:07:38.990641+00'),
('3d4b9579-0d17-4e94-a94e-36b6d3fe3684', 'about-team', 'Team', '{}', 3, true, '2025-12-24 07:07:38.990641+00'),
('73ec6f5b-d907-4028-94d8-484d30e874d7', 'contact-hero', 'Contact Hero', '{}', 0, true, '2025-12-24 07:07:43.786459+00'),
('bcf9dcac-aef7-43c6-b517-5f2514bacf7e', 'contact-info', 'Contact Information', '{}', 1, true, '2025-12-24 07:07:43.786459+00'),
('f2a77518-703f-43a6-8886-cc159a55b7b9', 'contact-map', 'Map', '{}', 2, true, '2025-12-24 07:07:43.786459+00'),
('67406394-e869-40b2-a5b8-75c7a085d1dc', 'booking-hero', 'Booking Hero', '{}', 0, true, '2025-12-24 07:07:47.621692+00'),
('99bc411f-5c30-494d-801f-8ba071f54f95', 'booking-calendar', 'Calendar Embed', '{}', 1, true, '2025-12-24 07:07:47.621692+00'),
('27154bee-ab7f-4bb1-90e4-0756c5df18de', 'hero', 'Hero Section', '{}', 0, true, '2025-12-24 11:11:17.666847+00'),
('a738b1d9-be5c-46d4-8d81-6d13f2ea8595', 'services', 'Services', '{}', 1, true, '2025-12-24 11:11:18.062829+00'),
('139491d1-1506-43f0-8971-831e6791a336', 'about', 'About Us', '{}', 2, true, '2025-12-24 11:11:18.473182+00'),
('10d84d90-7ea7-49e7-bfcc-d320e3eae1e7', 'reviews', 'Reviews', '{}', 3, true, '2025-12-24 11:11:18.871066+00'),
('692b48a0-1546-4205-8cab-3b2498370a96', 'faq', 'FAQ', '{}', 5, true, '2025-12-24 11:11:19.583094+00'),
('b802d3bd-31b1-4271-b84d-6d976adf8670', 'cta', 'Call to Action', '{}', 6, true, '2025-12-24 11:11:19.973186+00'),
('b424c828-0903-4696-8cf7-65261b6ad91b', 'featured', 'Featured Section', '{}', 9, true, '2025-12-24 11:11:20.89683+00'),
('264fd7cb-7236-4907-ba96-528a2b66fc17', 'who-we-help', 'Who We Help', '{}', 10, true, '2025-12-24 11:11:21.289675+00'),
('81d308be-4d9b-477c-b148-dfe439791142', 'approach', 'Our Approach', '{}', 11, true, '2025-12-24 11:11:21.653529+00'),
('513397fc-4839-4186-b053-b5aad58a34ac', 'why-us', 'Why Us', '{}', 12, true, '2025-12-24 11:11:22.026841+00'),
('ed5b63b6-254f-4249-8d0c-25bb455050d1', 'blogs-podcasts', 'Blogs & Podcasts', '{}', 13, true, '2025-12-24 11:11:22.438851+00'),
('761e3d17-8145-4544-bc32-43c8addc48eb', 'linkedin', 'LinkedIn Connect', '{}', 14, true, '2025-12-24 11:11:22.826324+00'),
('6c7b78d0-a64b-4e00-b9eb-bdbdce2db2ae', 'footer', 'Footer', '{}', 100, true, '2025-12-24 11:14:05.227573+00'),
('f1559962-f6ed-481b-9719-9c4c8314df3f', 'videos-youtube', 'YouTube Videos', '{}', 7, false, '2025-12-29 10:11:21.888402+00'),
('4b9d0874-e613-4684-b1fe-d8b5511c8059', 'videos-tiktok', 'TikTok Videos', '{}', 8, false, '2025-12-29 10:11:24.692087+00'),
('ebe382e5-a9d9-4d4a-95f7-4389ab236ce8', 'videos-instagram', 'Instagram Videos', '{}', 4, false, '2025-12-29 17:52:25.574119+00');

-- =====================================================
-- DATA: PORTFOLIO
-- =====================================================
INSERT INTO public.portfolio (id, title, slug, description, content, featured_image, category, client_name, project_url, order_index, is_published, created_at, updated_at) VALUES
('974e44d6-a1e7-46a7-806b-450852fa5af6', 'Automation Institute', 'automation-institute', 'Founded by Automind Labs and built for the ones who want to break out of the busy loop. We are here to help you escape the chaos by teaching you how to use AI and automation to take back your time and redesign the way you work.', '[{"content":"The Automation Institute is our flagship educational platform, designed to transform how professionals approach their work.","type":"paragraph"},{"content":"Program Highlights","level":2,"type":"heading"},{"content":"We offer comprehensive courses on AI automation, workflow optimization, and productivity enhancement.","type":"paragraph"}]', 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=500&fit=crop', 'Education', 'Automind Labs', NULL, 0, true, '2025-12-23 07:21:32.151709+00', '2025-12-23 07:21:32.151709+00'),
('d4b863e9-e737-4208-a656-8f8c633f0377', 'Hexona Systems', 'hexona-systems', 'It started with one client. Then two. Then hundreds. Now, 500+ agencies across 6 continents run smoothly because of Hexona.', '[{"content":"Hexona is a globally recognized AI-powered automation agency and software platform.","type":"paragraph"},{"content":"Impact","level":2,"type":"heading"},{"content":"We have helped streamline workflows and power 1000+ businesses across marketing and finance.","type":"paragraph"}]', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop', 'Software', 'Hexona', NULL, 1, true, '2025-12-23 07:21:32.151709+00', '2025-12-23 07:21:32.151709+00'),
('44792eae-ce84-4d05-aa38-d5ef42b0d411', 'Enterprise Automation Success', 'enterprise-automation-success', 'Complete workflow transformation saving 40+ hours per week for TechFlow Inc.', '[{"content":"TechFlow Inc. came to us with a challenge: their team was drowning in repetitive tasks.","type":"paragraph"},{"content":"The Solution","level":2,"type":"heading"},{"content":"We implemented end-to-end automation that transformed their entire workflow.","type":"paragraph"},{"content":"Automind Labs transformed our entire workflow. We saved 40+ hours per week!","type":"quote"}]', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=500&fit=crop', 'Case Study', 'TechFlow Inc.', NULL, 2, true, '2025-12-23 07:21:32.151709+00', '2025-12-23 07:21:32.151709+00'),
('43be20f5-b14d-4f1b-9f9f-2c3ba14c28e2', 'Scaling Operations with AI', 'scaling-operations-ai', 'How ScaleUp Co. doubled their output with half the effort using our AI solutions.', '[{"content":"ScaleUp Co. needed to grow without proportionally increasing their team size.","type":"paragraph"},{"content":"Results","level":2,"type":"heading"},{"content":"Within 3 months, they doubled their output with half the effort.","type":"paragraph"},{"content":"The ROI was incredible. Within 3 months, we doubled our output with half the effort.","type":"quote"}]', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=500&fit=crop', 'Case Study', 'ScaleUp Co.', NULL, 3, true, '2025-12-23 07:21:32.151709+00', '2025-12-23 07:21:32.151709+00'),
('3db596ec-e4d7-4d89-b677-0c29cf52b9dd', 'Workflow Transformation', 'workflow-transformation', 'A complete overhaul of creative agency workflows using AI-powered automation systems.', '[{"content":"Creative agencies face unique challenges: balancing creativity with efficiency.","type":"paragraph"},{"content":"Our Approach","level":2,"type":"heading"},{"content":"We automated the mundane so creatives could focus on what they do best.","type":"paragraph"},{"content":"Best investment we ever made. The automation systems are game-changers.","type":"quote"}]', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=500&fit=crop', 'Featured Win', 'Creative Agency', NULL, 4, true, '2025-12-23 07:21:32.151709+00', '2025-12-23 07:21:32.151709+00');

-- =====================================================
-- DATA: MEDIA
-- =====================================================
INSERT INTO public.media (id, name, file_url, file_type, file_size, alt_text, created_at) VALUES
('80aba624-1eec-49bb-961a-ab1660151935', 'Automind Labs ai logo.png', 'https://faywairypofjuzarlsoc.supabase.co/storage/v1/object/public/media/uploads/1766478075439-n0sv.png', 'image', 60666, NULL, '2025-12-23 08:21:16.692986+00'),
('64bbb716-47d0-45d4-a289-5a83b49974d4', 'Automind Labs Fav icon.svg', 'https://faywairypofjuzarlsoc.supabase.co/storage/v1/object/public/media/uploads/1767090275476-4lkwm.svg', 'image', 1717, NULL, '2025-12-30 10:24:36.517292+00');

-- =====================================================
-- DATA: CONTACT INFO
-- =====================================================
INSERT INTO public.contact_info (id, email, phone, address, map_url, booking_iframe_code, social_links, updated_at) VALUES
('ef6250df-a0fd-4c5e-af4b-bd6c247e5cd1', 'Info@automindlabs.ai', '+1 (555) 123-4880', 'New Jersey USA - Dubai UAE', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1563360.0620062624!2d-76.04357186579821!3d40.06564953298139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c0fb959e00409f%3A0x2cd27b07f83f6d8d!2sNew%20Jersey%2C%20USA!5e0!3m2!1sen!2s!4v1766558575746!5m2!1sen!2s', '<iframe src="https://app.devtrest.com/widget/booking/PGxIYRNyQaZdkJtSMxrl" style="width: 100%;border:none;overflow: hidden;" scrolling="no" id="PGxIYRNyQaZdkJtSMxrl_1766995560584"></iframe><br><script src="https://app.devtrest.com/js/form_embed.js" type="text/javascript"></script>', '{"instagram":"https://instagram.com/automindlabsai","linkedin":"https://linkedin.com/automindlabsai","tiktok":"https://tiktok.com/automindlabsai","twitter":"https://x.com/automindlabsai","youtube":"https://youtube.com/automindlabsai"}', '2025-12-29 11:31:11.434429+00');

-- =====================================================
-- DATA: FOOTER CONFIG
-- =====================================================
INSERT INTO public.footer_config (id, company_name, tagline, email, social_links, updated_at) VALUES
('64e1f271-800b-4cb1-a812-bf56eb7c4b2d', 'Automind Labs AI', 'Building intelligent systems for modern businesses.', 'Info@automindlabs.ai', '[{"platform":"instagram","url":"https://instagram.com/automindlabs.ai"},{"platform":"twitter","url":"https://x.com/automindlabsai"},{"platform":"linkedin","url":"https://linkedin.com/automindlabsai"},{"platform":"youtube","url":"https://youtube.com/automindlabsai"}]', '2025-12-30 10:58:44.490125+00');

-- =====================================================
-- DATA: HEADER CONFIG
-- =====================================================
INSERT INTO public.header_config (id, logo_url, nav_links, updated_at) VALUES
('489c42f6-4a29-4f66-afc0-09027277ab70', 'https://faywairypofjuzarlsoc.supabase.co/storage/v1/object/public/media/uploads/1766478075439-n0sv.png', '[{"href":"/","label":"Home"},{"href":"/about","label":"About"},{"href":"/portfolio","label":"Portfolio"},{"href":"/blog","label":"Blog"},{"href":"/contact","label":"Contact"},{"href":"/booking","label":"Book Call"},{"external":true,"href":"https://www.skool.com/","label":"Skool Community"}]', '2025-12-30 10:58:44.250356+00');

-- =====================================================
-- DATA: SITE SETTINGS
-- =====================================================
INSERT INTO public.site_settings (id, key, value, updated_at) VALUES
('a2de13d5-9e50-4ab6-8d3c-3d156d2761ca', 'favicon', '{"url":"https://faywairypofjuzarlsoc.supabase.co/storage/v1/object/public/media/uploads/1767090275476-4lkwm.svg"}', '2025-12-30 10:58:44.995395+00');

-- =====================================================
-- STORAGE BUCKET (run in new project)
-- =====================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- =====================================================
-- END OF BACKUP
-- =====================================================
`;

    const blob = new Blob([sqlContent], { type: "text/sql" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "automind-labs-database-backup.sql";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-3xl font-bold text-foreground">Database Backup</h1>
        <p className="text-muted-foreground">
          Download your complete database backup including all tables, RLS policies, and data.
        </p>
        <Button onClick={handleDownload} size="lg" className="gap-2">
          <Download className="h-5 w-5" />
          Download SQL Backup
        </Button>
        <p className="text-sm text-muted-foreground">
          The file includes schema, RLS policies, and all your data.
        </p>
      </div>
    </div>
  );
};

export default DatabaseBackup;
