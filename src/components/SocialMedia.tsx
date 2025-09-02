import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

// TikTok icon as SVG component since it's not in Lucide
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.923-1.342-2.089-1.374-3.338h-3.232v13.717c0 .726-.31 1.417-.85 1.892a2.59 2.59 0 0 1-1.862.736 2.59 2.59 0 0 1-1.862-.736 2.59 2.59 0 0 1-.85-1.892c0-.726.31-1.417.85-1.892a2.59 2.59 0 0 1 1.862-.736c.295 0 .583.05.854.145V9.302a5.515 5.515 0 0 0-.854-.067c-1.55 0-3.036.647-4.119 1.794S4.5 13.661 4.5 15.283s.617 3.178 1.704 4.326c1.087 1.147 2.569 1.794 4.119 1.794s3.036-.647 4.119-1.794c1.087-1.148 1.704-2.704 1.704-4.326V9.014c.9.64 1.97 1.01 3.075 1.063V6.845c-.677-.054-1.318-.282-1.9-.68z"/>
  </svg>
);

const socialPlatforms = [
  {
    name: 'TikTok',
    icon: TikTokIcon,
    url: 'https://www.tiktok.com/@rajo.solutions?_t=ZM-8zOchR9IOlM&_r=1',
    color: 'hover:bg-black hover:text-white',
    description: 'Creative content & trends'
  },
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://facebook.com/rajosolutions',
    color: 'hover:bg-blue-600 hover:text-white',
    description: 'Business updates & community'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com/rajosolutions',
    color: 'hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white',
    description: 'Behind the scenes & portfolio'
  },
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    url: 'https://wa.me/15551234567',
    color: 'hover:bg-green-500 hover:text-white',
    description: 'Direct messaging & support'
  }
];

export function SocialMedia() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 to-primary-light/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Connect With Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow us on social media for the latest updates, behind-the-scenes content, and creative inspiration
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {socialPlatforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`
                  group block p-8 rounded-2xl border border-border bg-card hover:shadow-xl 
                  transition-all duration-300 transform hover:-translate-y-2 ${platform.color}
                `}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary group-hover:bg-transparent flex items-center justify-center transition-all duration-300">
                    <Icon className="w-8 h-8 text-primary-foreground group-hover:text-current" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-current">
                      {platform.name}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-current/80">
                      {platform.description}
                    </p>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 p-8 rounded-2xl bg-gradient-primary text-primary-foreground"
        >
          <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
          <p className="text-primary-foreground/90 mb-6">
            Join our community of entrepreneurs, creatives, and innovators. Get exclusive insights, 
            tips, and early access to our latest work.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {socialPlatforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <platform.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}