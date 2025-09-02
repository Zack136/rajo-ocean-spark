import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';

// Import project images
import ecommercePlatform from '@/assets/projects/ecommerce-platform.jpg';
import brandIdentity from '@/assets/projects/brand-identity.jpg';
import marketingCampaign from '@/assets/projects/marketing-campaign.jpg';
import businessConsulting from '@/assets/projects/business-consulting.jpg';
import mobileApp from '@/assets/projects/mobile-app.jpg';
import corporateWebsite from '@/assets/projects/corporate-website.jpg';

const projects = [
  {
    title: 'E-commerce Platform',
    category: 'Web Development',
    description: 'Modern e-commerce solution with advanced features and seamless user experience.',
    image: ecommercePlatform
  },
  {
    title: 'Brand Identity Design',
    category: 'Graphic Design',
    description: 'Complete brand makeover including logo, color palette, and marketing materials.',
    image: brandIdentity
  },
  {
    title: 'Digital Marketing Campaign',
    category: 'Marketing',
    description: 'Multi-channel marketing strategy that increased client engagement by 300%.',
    image: marketingCampaign
  },
  {
    title: 'Business Transformation',
    category: 'Consulting',
    description: 'Strategic consulting project that optimized operations and boosted revenue.',
    image: businessConsulting
  },
  {
    title: 'Mobile App Design',
    category: 'Design & Development',
    description: 'User-centric mobile application with intuitive interface and robust functionality.',
    image: mobileApp
  },
  {
    title: 'Corporate Website',
    category: 'Web Development',
    description: 'Professional corporate website with CMS integration and SEO optimization.',
    image: corporateWebsite
  }
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="projects" className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Our Portfolio
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our latest projects and see how we've helped businesses achieve their goals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="project-card group cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 right-4">
                    <ExternalLink className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}