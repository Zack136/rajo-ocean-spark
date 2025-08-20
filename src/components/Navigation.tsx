import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { 
    label: 'Home', 
    href: '#hero',
    dropdown: null
  },
  {
    label: 'About',
    href: '#about',
    dropdown: [
      { label: 'Who We Are', href: '#about' },
      { label: 'Mission', href: '#about' },
      { label: 'Vision', href: '#about' },
    ]
  },
  {
    label: 'Services',
    href: '#services',
    dropdown: [
      { label: 'Graphic Design', href: '#services' },
      { label: 'Web Development', href: '#services' },
      { label: 'Marketing', href: '#services' },
      { label: 'Consulting', href: '#services' },
    ]
  },
  {
    label: 'Projects',
    href: '#projects',
    dropdown: [
      { label: 'Portfolio', href: '#projects' },
      { label: 'Case Studies', href: '#projects' },
    ]
  },
  {
    label: 'Team',
    href: '#team',
    dropdown: [
      { label: 'Members', href: '#team' },
      { label: 'Leadership', href: '#team' },
    ]
  },
  {
    label: 'Contact',
    href: '#contact',
    dropdown: [
      { label: 'Order Services', href: '#contact' },
      { label: 'Social Media Links', href: '#social' },
    ]
  },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleMobileDropdown = (label: string) => {
    setOpenMobileDropdown(openMobileDropdown === label ? null : label);
  };

  return (
    <>
      <motion.nav
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.button
              onClick={scrollToTop}
              className="text-2xl font-bold text-white cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Rajo Solutions
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                item.dropdown ? (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className="flex items-center space-x-1 px-4 py-2 text-white hover:text-white/80 transition-colors duration-200 font-medium rounded-md hover:bg-white/10">
                      <span>{item.label}</span>
                      <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl"
                      sideOffset={8}
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <DropdownMenuItem 
                          key={dropdownItem.label}
                          onClick={() => handleNavClick(dropdownItem.href)}
                          className="cursor-pointer hover:bg-primary/10 dark:hover:bg-[#03045E]/20 text-gray-900 dark:text-gray-100"
                        >
                          {dropdownItem.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
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
            className="fixed top-16 left-0 right-0 z-40 md:hidden bg-primary/95 dark:bg-[#03045E]/95 backdrop-blur-lg border-b border-white/10"
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
                            className="ml-4 space-y-1"
                          >
                            {item.dropdown.map((dropdownItem) => (
                              <button
                                key={dropdownItem.label}
                                onClick={() => handleNavClick(dropdownItem.href)}
                                className="block w-full text-left text-white/80 hover:text-white transition-colors duration-200 py-2 px-3 rounded-md hover:bg-white/5"
                              >
                                {dropdownItem.label}
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