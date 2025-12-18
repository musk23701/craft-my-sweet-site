import { Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

const socials = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "X / Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

const SocialIcons = () => {
  return (
    <div className="flex items-center gap-3">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          aria-label={social.label}
          className="social-icon-btn"
        >
          <social.icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
