import { Mail, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { useFooterConfig } from "@/hooks/useCMSData";

const Footer = () => {
  const { footerConfig } = useFooterConfig();

  const companyName = footerConfig?.company_name || "Automind Labs AI";
  const tagline = footerConfig?.tagline || "Building intelligent systems for modern businesses.";
  const email = footerConfig?.email || "Info@automindlabs.ai";
  const socialLinks = (footerConfig?.social_links as any[]) || [];

  const getSocialIcon = (platform: string) => {
    switch (platform?.toLowerCase()) {
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'youtube': return <Youtube className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <footer className="py-12 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <span className="text-2xl font-black">{companyName}</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              {tagline}
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center gap-4">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Mail className="w-5 h-5" />
              {email}
            </a>
            <div className="flex items-center gap-3">
              {socialLinks.length > 0 ? (
                socialLinks.map((link: any, index: number) => (
                  <a
                    key={index}
                    href={link.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-primary-foreground/10 border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                ))
              ) : (
                <>
                  <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                    <Youtube className="w-4 h-4" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} {companyName} — All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
