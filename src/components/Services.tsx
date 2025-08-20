import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Palette, Code, Megaphone, Users } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Graphic Design',
    emoji: '🎨',
    description: 'Creative visual solutions that captivate your audience and strengthen your brand identity.',
    features: ['Logo Design', 'Brand Identity', 'Marketing Materials', 'Digital Graphics']
  },
  {
    icon: Code,
    title: 'Web Development',
    emoji: '💻',
    description: 'Modern, responsive websites and applications built with cutting-edge technologies.',
    features: ['Custom Websites', 'E-commerce Solutions', 'Web Applications', 'Mobile Responsive']
  },
  {
    icon: Megaphone,
    title: 'Marketing',
    emoji: '📢',
    description: 'Strategic marketing campaigns that drive engagement and boost your business growth.',
    features: ['Digital Marketing', 'Social Media Strategy', 'Content Creation', 'SEO Optimization']
  },
  {
    icon: Users,
    title: 'Consulting Firm',
    emoji: '💼',
    description: 'Expert business consulting to optimize operations and achieve strategic objectives.',
    features: ['Business Strategy', 'Process Optimization', 'Digital Transformation', 'Growth Planning']
  }
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive solutions tailored to elevate your business and drive success
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="service-card group cursor-pointer"
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="text-3xl mb-4">{service.emoji}</div>
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 text-sm">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}