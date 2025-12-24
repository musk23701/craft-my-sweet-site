import { Home, User, Images, FileText, Mail, Calendar, Users, ExternalLink } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useHeaderConfig } from "@/hooks/useHeaderConfig";
import automindLogo from "@/assets/automind-labs-logo-new.png";

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  is_visible?: boolean;
}

const defaultMenuItems: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Book Call", href: "/booking" },
  { label: "Skool Community", href: "https://www.skool.com/automind", external: true },
];

const getIcon = (label: string) => {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes('home')) return Home;
  if (lowerLabel.includes('about')) return User;
  if (lowerLabel.includes('portfolio')) return Images;
  if (lowerLabel.includes('blog')) return FileText;
  if (lowerLabel.includes('contact')) return Mail;
  if (lowerLabel.includes('book')) return Calendar;
  if (lowerLabel.includes('skool') || lowerLabel.includes('community')) return Users;
  return ExternalLink;
};

const Sidebar = () => {
  const location = useLocation();
  const { logoUrl, navLinks, loading } = useHeaderConfig();

  // Use cached/fetched nav links or defaults
  const menuItems = navLinks.length > 0 ? navLinks : defaultMenuItems;
  const currentLogo = logoUrl || automindLogo;

  return (
    <nav className="hidden lg:flex bg-background w-28 border-r border-border flex-col items-center justify-center py-6 flex-shrink-0 h-screen sticky top-0">
      {/* Logo */}
      <Link to="/" className="mb-10">
        <img 
          src={currentLogo} 
          alt="Automind Labs" 
          className="w-20 h-auto object-contain"
        />
      </Link>

      {/* Menu */}
      <div className="flex flex-col items-center gap-6">
        {menuItems.map((item, index) => {
          const isActive = !item.external && location.pathname === item.href;
          const Icon = getIcon(item.label);

          if (item.external) {
            return (
              <a
                key={item.label + index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 text-foreground hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group w-24 px-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Icon className="w-5 h-5 group-hover:text-primary transition-colors flex-shrink-0" />
                <span className="text-[10px] tracking-wide text-center leading-tight line-clamp-2">
                  {item.label}
                </span>
              </a>
            );
          }

          return (
            <Link
              key={item.label + index}
              to={item.href}
              className={`flex flex-col items-center gap-1.5 text-foreground hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group w-24 px-1 ${isActive ? "text-primary" : ""}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Icon
                className={`w-5 h-5 group-hover:text-primary transition-colors flex-shrink-0 ${isActive ? "text-primary" : ""}`}
              />
              <span className="text-[10px] tracking-wide text-center leading-tight line-clamp-2">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;
