import { useState } from "react";
import { Home, User, Images, FileText, Mail, Calendar, Users, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: User, label: "About", href: "/about" },
  { icon: Images, label: "Portfolio", href: "/portfolio" },
  { icon: FileText, label: "Blog", href: "/blog" },
  { icon: Mail, label: "Contact", href: "/contact" },
  { icon: Calendar, label: "Book Call", href: "/booking" },
  { icon: Users, label: "Skool Community", href: "https://www.skool.com/automind", external: true },
];

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Top Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-[70px] flex items-center justify-between px-5 bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <Link to="/">
          <div className="h-12 flex items-center">
            <span className="text-2xl font-black text-primary">Automind Labs</span>
          </div>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center shadow-lg"
          aria-label="Toggle menu"
        >
          <div className="relative w-[18px] h-3 flex flex-col justify-between">
            <span
              className={`w-full h-[1.6px] bg-background rounded transition-all duration-200 origin-center ${
                isOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`w-full h-[1.6px] bg-background rounded transition-all duration-200 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-full h-[1.6px] bg-background rounded transition-all duration-200 origin-center ${
                isOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            />
          </div>
        </button>
      </header>

      {/* Bottom Sheet Menu */}
      <div
        className={`lg:hidden fixed left-0 right-0 bottom-0 bg-background border-t border-border rounded-t-3xl z-40 transition-transform duration-400 shadow-[0_-18px_35px_rgba(0,0,0,0.8)] ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "80vh" }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <p className="font-semibold uppercase tracking-[0.08em] text-sm">Menu</p>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full border border-foreground/40 flex items-center justify-center hover:bg-foreground/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {menuItems.map((item) => {
              const isActive = !item.external && location.pathname === item.href;

              if (item.external) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex flex-col items-center gap-2 text-foreground"
                  >
                    <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center bg-foreground/5">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs leading-tight text-center">{item.label}</span>
                  </a>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col items-center gap-2 text-foreground"
                >
                  <div className={`w-[34px] h-[34px] rounded-full flex items-center justify-center ${isActive ? "bg-primary/20" : "bg-foreground/5"}`}>
                    <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                  </div>
                  <span className="text-xs leading-tight">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/50 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default MobileNav;
