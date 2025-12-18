import { Home, User, Images, FileText, Grid3X3, Users, Bot } from "lucide-react";

const menuItems = [
  { icon: Home, label: "Home", href: "#home" },
  { icon: User, label: "About", href: "#about" },
  { icon: Images, label: "Portfolio", href: "#portfolio" },
  { icon: FileText, label: "Blog", href: "#blog" },
  { icon: Grid3X3, label: "Hexona\nSystems", href: "#hexona" },
  { icon: Users, label: "Skool\nCommunity", href: "#skool" },
  { icon: Bot, label: "AI Automation\nInstitute", href: "#ai-institute" },
];

const Sidebar = () => {
  return (
    <nav className="hidden lg:flex bg-background w-28 border-r border-border flex-col items-center py-6 flex-shrink-0 h-screen sticky top-0">
      {/* Logo */}
      <a href="#home" className="mb-10">
        <div className="w-20 h-12 flex items-center justify-center">
          <span className="text-xl font-black text-primary">AI</span>
        </div>
      </a>

      {/* Menu */}
      <div className="flex flex-col items-center gap-6">
        {menuItems.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-1.5 text-foreground hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <item.icon className="w-5 h-5 group-hover:text-primary transition-colors" />
            <span className="text-[10px] tracking-wide text-center whitespace-pre-line leading-tight">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
