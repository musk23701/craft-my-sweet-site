import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Image,
  Video,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
  Globe,
  Mail,
  HelpCircle,
  Wrench,
  ChevronDown,
  Eye,
} from 'lucide-react';
import automindLogo from '@/assets/automind-labs-logo-new.png';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface AdminLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: FileText, label: 'Blogs', href: '/admin/blogs' },
  { icon: Briefcase, label: 'Portfolio', href: '/admin/portfolio' },
  { icon: Video, label: 'Videos', href: '/admin/videos' },
  { icon: Image, label: 'Media Library', href: '/admin/media' },
  { icon: Star, label: 'Reviews', href: '/admin/reviews' },
  { icon: HelpCircle, label: 'FAQs', href: '/admin/faqs' },
  { icon: Wrench, label: 'Services', href: '/admin/services' },
];

const settingsItems = [
  { icon: Globe, label: 'Sections', href: '/admin/sections' },
  { icon: Settings, label: 'Header & Footer', href: '/admin/header-footer' },
  { icon: Mail, label: 'Contact Info', href: '/admin/contact' },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  const NavItem = ({ item }: { item: typeof menuItems[0] }) => (
    <Link
      to={item.href}
      onClick={() => setIsSidebarOpen(false)}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        isActive(item.href)
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      }`}
    >
      <item.icon className="w-5 h-5" />
      <span className="font-medium">{item.label}</span>
    </Link>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border flex items-center justify-between px-4 z-50">
        <img src={automindLogo} alt="Automind Labs" className="h-8" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-card border-r border-border flex flex-col z-50 transition-transform lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-border">
          <img src={automindLogo} alt="Automind Labs" className="h-10 mx-auto" />
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}

          <Collapsible open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <CollapsibleTrigger className="flex items-center gap-3 px-4 py-3 w-full text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-all">
              <Settings className="w-5 h-5" />
              <span className="font-medium flex-1 text-left">Settings</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isSettingsOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-1 mt-1">
              {settingsItems.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </CollapsibleContent>
          </Collapsible>
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.email}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => {
                const previewUrl = new URL('/', window.location.origin);
                previewUrl.searchParams.set('preview', 'true');
                window.open(previewUrl.toString(), '_blank');
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => window.open('/', '_blank')}
            >
              <Globe className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
