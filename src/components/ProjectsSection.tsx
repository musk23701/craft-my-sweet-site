import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { usePortfolio } from "@/hooks/useCMSData";

const ProjectsSection = () => {
  const { portfolio, loading } = usePortfolio();

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-background px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  const projects = portfolio.length > 0 ? portfolio : [];

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-20 bg-background px-4 sm:px-6 lg:px-24">
      <div className="max-w-[1300px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-4xl lg:text-6xl font-extrabold mb-8 md:mb-12 text-center text-foreground"
        >
          Our <span className="text-primary">Projects</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative w-full pt-[56.25%] overflow-hidden">
                <img
                  src={project.featured_image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop'}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                {project.category && (
                  <span className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {project.category}
                  </span>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                {project.client_name && (
                  <p className="text-sm text-primary mb-2">{project.client_name}</p>
                )}
                {project.description && (
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    {project.description}
                  </p>
                )}
                {project.project_url && (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
                  >
                    View Project <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
