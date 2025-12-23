import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import BlogsAdmin from "./pages/admin/BlogsAdmin";
import PortfolioAdmin from "./pages/admin/PortfolioAdmin";
import VideosAdmin from "./pages/admin/VideosAdmin";
import MediaAdmin from "./pages/admin/MediaAdmin";
import ReviewsAdmin from "./pages/admin/ReviewsAdmin";
import FAQsAdmin from "./pages/admin/FAQsAdmin";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import SectionsAdmin from "./pages/admin/SectionsAdmin";
import HeaderFooterAdmin from "./pages/admin/HeaderFooterAdmin";
import ContactAdmin from "./pages/admin/ContactAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/blogs" element={<ProtectedRoute><BlogsAdmin /></ProtectedRoute>} />
            <Route path="/admin/portfolio" element={<ProtectedRoute><PortfolioAdmin /></ProtectedRoute>} />
            <Route path="/admin/videos" element={<ProtectedRoute><VideosAdmin /></ProtectedRoute>} />
            <Route path="/admin/media" element={<ProtectedRoute><MediaAdmin /></ProtectedRoute>} />
            <Route path="/admin/reviews" element={<ProtectedRoute><ReviewsAdmin /></ProtectedRoute>} />
            <Route path="/admin/faqs" element={<ProtectedRoute><FAQsAdmin /></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute><ServicesAdmin /></ProtectedRoute>} />
            <Route path="/admin/sections" element={<ProtectedRoute><SectionsAdmin /></ProtectedRoute>} />
            <Route path="/admin/header-footer" element={<ProtectedRoute><HeaderFooterAdmin /></ProtectedRoute>} />
            <Route path="/admin/contact" element={<ProtectedRoute><ContactAdmin /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
