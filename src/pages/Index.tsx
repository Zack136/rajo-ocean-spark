import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Projects } from '@/components/Projects';
import { Team } from '@/components/Team';
import { Contact } from '@/components/Contact';
import { SocialMedia } from '@/components/SocialMedia';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Team />
      <Contact />
      <SocialMedia />
      <Footer />
    </div>
  );
};

export default Index;
