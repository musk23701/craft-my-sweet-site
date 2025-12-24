import { Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
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

const SocialIcons = () => {
  const { socialLinks } = useSocialLinks();
  
  const links = socialLinks.length > 0 ? socialLinks : defaultSocials;

  return (
    <div className="flex items-center gap-3">
      {links.map((social, index) => (
        <a
          key={index}
          href={social.url || '#'}
          target={social.url && social.url !== '#' ? "_blank" : undefined}
          rel={social.url && social.url !== '#' ? "noopener noreferrer" : undefined}
          aria-label={social.platform}
          className="social-icon-btn"
        >
          {getSocialIcon(social.platform)}
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
