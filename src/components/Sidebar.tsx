import { Home, User, Images, FileText, Mail, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: User, label: "About", href: "/about" },
  { icon: Images, label: "Portfolio", href: "/portfolio" },
  { icon: FileText, label: "Blog", href: "/blog" },
  { icon: Mail, label: "Contact", href: "/contact" },
  { icon: Calendar, label: "Book Call", href: "/booking" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <nav className="hidden lg:flex bg-background w-28 border-r border-border flex-col items-center py-6 flex-shrink-0 h-screen sticky top-0">
      {/* Logo */}
      <Link to="/" className="mb-10">
        <div className="w-20 h-12 flex items-center justify-center">
          <span className="text-xl font-black text-primary">AI</span>
        </div>
      </Link>

      {/* Menu */}
      <div className="flex flex-col items-center gap-6">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.label}
              to={item.href}
              className={`flex flex-col items-center gap-1.5 text-foreground hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group ${isActive ? "text-primary" : ""}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <item.icon className={`w-5 h-5 group-hover:text-primary transition-colors ${isActive ? "text-primary" : ""}`} />
              <span className="text-[10px] tracking-wide text-center whitespace-pre-line leading-tight">
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
