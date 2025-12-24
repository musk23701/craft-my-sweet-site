import { Mail, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { useSocialLinks } from "@/hooks/useSocialLinks";

const getSocialIcon = (platform: string) => {
  switch (platform?.toLowerCase()) {
    case 'instagram': return <Instagram className="w-4 h-4" />;
    case 'twitter': return <Twitter className="w-4 h-4" />;
    case 'linkedin': return <Linkedin className="w-4 h-4" />;
    case 'youtube': return <Youtube className="w-4 h-4" />;
    default: return null;
  }
};

const defaultSocials = [
  { platform: "Instagram", url: "#" },
  { platform: "Twitter", url: "#" },
  { platform: "LinkedIn", url: "#" },
  { platform: "YouTube", url: "#" },
];

const Footer = () => {
  const { socialLinks } = useSocialLinks();
  
  const links = socialLinks.length > 0 ? socialLinks : defaultSocials;
  
  // Get company info from footer_config - we'll use defaults for now since
  // we're using useSocialLinks which already fetches from footer_config
  const companyName = "Automind Labs AI";
  const tagline = "Building intelligent systems for modern businesses.";
  const email = "Info@automindlabs.ai";

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
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url || '#'}
                  target={link.url && link.url !== '#' ? "_blank" : undefined}
                  rel={link.url && link.url !== '#' ? "noopener noreferrer" : undefined}
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
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
