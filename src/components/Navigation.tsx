import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Target,
  Eye,
  Heart,
  Palette,
  Code2,
  Megaphone,
  Briefcase,
  FolderOpen,
  FileBarChart,
  Users,
  Crown,
  Mail,
  Share2,
  Facebook,
  Instagram,
  MessageCircle
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

// Import service images
import graphicDesignImg from '@/assets/services/graphic-design.jpg';
import webDevelopmentImg from '@/assets/services/web-development.jpg';
import marketingImg from '@/assets/services/marketing.jpg';
import consultingImg from '@/assets/services/consulting.jpg';
import portfolioPreviewImg from '@/assets/portfolio-preview.jpg';
import caseStudiesPreviewImg from '@/assets/case-studies-preview.jpg';

interface NavItem {
  label: string;
  href: string;
  type?: 'regular' | 'mega-services' | 'mega-visual';
  dropdown?: Array<{
    label: string;
    href: string;
    icon?: React.ReactNode;
    description?: string;
    image?: string;
  }>;
}

const navItems: NavItem[] = [
  { 
    label: 'Home', 
    href: '#hero',
    type: 'regular'
  },
  {
    label: 'About',
    href: '#about',
    type: 'regular',
    dropdown: [
      { 
        label: 'Who We Are', 
        href: '#about',
        icon: <Target className="w-5 h-5" />,
        description: 'Learn about our company and values'
      },
      { 
        label: 'Mission', 
        href: '#about',
        icon: <Eye className="w-5 h-5" />,
        description: 'Our commitment to excellence'
      },
      { 
        label: 'Vision', 
        href: '#about',
        icon: <Heart className="w-5 h-5" />,
        description: 'Building the future together'
      },
    ]
  },
  {
    label: 'Services',
    href: '#services',
    type: 'mega-services',
    dropdown: [
      { 
        label: 'Graphic Design', 
        href: '#services',
        icon: <Palette className="w-6 h-6" />,
        description: 'Creative visual solutions for your brand',
        image: graphicDesignImg
      },
      { 
        label: 'Web Development', 
        href: '#services',
        icon: <Code2 className="w-6 h-6" />,
        description: 'Modern, responsive websites & applications',
        image: webDevelopmentImg
      },
      { 
        label: 'Marketing', 
        href: '#services',
        icon: <Megaphone className="w-6 h-6" />,
        description: 'Strategic digital marketing campaigns',
        image: marketingImg
      },
      { 
        label: 'Consulting', 
        href: '#services',
        icon: <Briefcase className="w-6 h-6" />,
        description: 'Expert business strategy & consultation',
        image: consultingImg
      },
    ]
  },
  {
    label: 'Projects',
    href: '#projects',
    type: 'mega-visual',
    dropdown: [
      { 
        label: 'Portfolio', 
        href: '#projects',
        icon: <FolderOpen className="w-5 h-5" />,
        description: 'Showcase of our completed works',
        image: portfolioPreviewImg
      },
      { 
        label: 'Case Studies', 
        href: '#projects',
        icon: <FileBarChart className="w-5 h-5" />,
        description: 'Detailed project analysis & results',
        image: caseStudiesPreviewImg
      },
    ]
  },
  {
    label: 'Team',
    href: '#team',
    type: 'regular',
    dropdown: [
      { 
        label: 'Members', 
        href: '#team',
        icon: <Users className="w-5 h-5" />,
        description: 'Meet our talented professionals'
      },
      { 
        label: 'Leadership', 
        href: '#team',
        icon: <Crown className="w-5 h-5" />,
        description: 'Executive team & founders'
      },
    ]
  },
  {
    label: 'Contact',
    href: '#contact',
    type: 'regular',
    dropdown: [
      { 
        label: 'Order Services', 
        href: '#contact',
        icon: <Mail className="w-5 h-5" />,
        description: 'Start your project with us'
      },
      { 
        label: 'Social Media Links', 
        href: '#social',
        icon: <Share2 className="w-5 h-5" />,
        description: 'Follow us on social platforms'
      },
    ]
  },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDesktopDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
    setOpenDesktopDropdown(null);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleMobileDropdown = (label: string) => {
    setOpenMobileDropdown(openMobileDropdown === label ? null : label);
  };

  const handleDesktopDropdown = (label: string) => {
    setOpenDesktopDropdown(openDesktopDropdown === label ? null : label);
  };

  const renderRegularDropdown = (item: NavItem) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 mt-2 w-48 bg-card dark:bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
    >
      {item.dropdown?.map((dropdownItem, index) => (
        <motion.button
          key={dropdownItem.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05, duration: 0.2 }}
          onClick={() => handleNavClick(dropdownItem.href)}
          className="w-full text-left px-3 py-3 hover:bg-accent/50 transition-colors duration-200 flex items-start space-x-3 group"
        >
          <div className="flex-shrink-0 text-primary group-hover:scale-110 transition-transform duration-200 mt-0.5">
            {dropdownItem.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200 text-sm">
              {dropdownItem.label}
            </h4>
            {dropdownItem.description && (
              <p className="text-xs text-muted-foreground mt-1 leading-tight">
                {dropdownItem.description}
              </p>
            )}
          </div>
        </motion.button>
      ))}
    </motion.div>
  );

  const renderMegaServicesDropdown = (item: NavItem) => (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="absolute top-full left-0 mt-2 mx-4 max-w-4xl bg-card dark:bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
    >
      <div className="px-4 py-2">
        <h3 className="text-lg font-semibold text-foreground mb-4">Our Services</h3>
        <div className="grid grid-cols-2 gap-4">
          {item.dropdown?.map((service, index) => (
            <motion.button
              key={service.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              onClick={() => handleNavClick(service.href)}
              className="group p-4 rounded-lg border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 text-left bg-background/50 hover:bg-accent/30"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img 
                    src={service.image} 
                    alt={service.label}
                    className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="text-primary group-hover:scale-110 transition-transform duration-200">
                      {service.icon}
                    </div>
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                      {service.label}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderMegaVisualDropdown = (item: NavItem) => (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="absolute top-full left-0 mt-2 mx-4 max-w-2xl bg-card dark:bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
    >
      <div className="px-4 py-2">
        <h3 className="text-lg font-semibold text-foreground mb-4">Our Work</h3>
        <div className="space-y-3">
          {item.dropdown?.map((project, index) => (
            <motion.button
              key={project.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              onClick={() => handleNavClick(project.href)}
              className="group w-full p-4 rounded-lg border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 text-left bg-background/50 hover:bg-accent/30"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img 
                    src={project.image} 
                    alt={project.label}
                    className="w-20 h-20 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="text-primary group-hover:scale-110 transition-transform duration-200">
                      {project.icon}
                    </div>
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                      {project.label}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled 
            ? 'bg-primary/95 dark:bg-[#03045E]/95 backdrop-blur-lg border-b border-white/10 shadow-lg' 
            : 'bg-primary dark:bg-[#03045E]'
          }
        `}
      >
        <div className="max-w-7xl ml-4 mr-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center space-x-3 text-2xl font-bold text-white cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* HOPE Icon */}
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm font-bold tracking-wider">
                HOPE
              </div>
              <span>Rajo</span>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                item.dropdown ? (
                  <div key={item.label} className="relative">
                    <button
                      onClick={() => handleDesktopDropdown(item.label)}
                      className="flex items-center space-x-1 px-4 py-2 text-white hover:text-white/80 transition-colors duration-200 font-medium rounded-md hover:bg-white/10"
                    >
                      <span>{item.label}</span>
                      <motion.div
                        animate={{ rotate: openDesktopDropdown === item.label ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openDesktopDropdown === item.label && (
                        <>
                          {item.type === 'mega-services' && renderMegaServicesDropdown(item)}
                          {item.type === 'mega-visual' && renderMegaVisualDropdown(item)}
                          {(item.type === 'regular' || !item.type) && renderRegularDropdown(item)}
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="px-4 py-2 text-white hover:text-white/80 transition-colors duration-200 font-medium rounded-md hover:bg-white/10"
                  >
                    {item.label}
                  </button>
                )
              ))}
              <div className="ml-4">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-white/80 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden bg-primary/95 dark:bg-[#03045E]/95 backdrop-blur-lg border-b border-white/10 max-h-[80vh] overflow-y-auto"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleMobileDropdown(item.label)}
                        className="flex items-center justify-between w-full text-left text-white hover:text-white/80 transition-colors duration-200 font-medium py-3 px-2 rounded-md hover:bg-white/10"
                      >
                        <span>{item.label}</span>
                        <motion.div
                          animate={{ rotate: openMobileDropdown === item.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {openMobileDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 space-y-2 mt-2"
                          >
                            {item.dropdown.map((dropdownItem) => (
                              <button
                                key={dropdownItem.label}
                                onClick={() => handleNavClick(dropdownItem.href)}
                                className="flex items-start space-x-3 w-full text-left text-white/80 hover:text-white transition-colors duration-200 px-4 py-2 mx-2 my-1 rounded-md hover:bg-white/5 border border-white/10"
                              >
                                {dropdownItem.icon && (
                                  <div className="flex-shrink-0 text-white/60 mt-0.5">
                                    {dropdownItem.icon}
                                  </div>
                                )}
                                <div>
                                  <div className="font-medium">{dropdownItem.label}</div>
                                  {dropdownItem.description && (
                                    <div className="text-xs text-white/60 mt-1">
                                      {dropdownItem.description}
                                    </div>
                                  )}
                                </div>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="block w-full text-left text-white hover:text-white/80 transition-colors duration-200 font-medium py-3 px-2 rounded-md hover:bg-white/10"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}