import fs from 'fs';
import path from 'path';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
// import { Features } from './components/Features';
// import { Analytics } from './components/Analytics';
// import { NearbyAreas } from './components/NearbyAreas';
// import { Events } from './components/Events';
// import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

// Data fetching function
async function getData() {
  const filePath = path.join(process.cwd(), 'data/app-details.json');
  const jsonData = await fs.promises.readFile(filePath, 'utf8');
  return JSON.parse(jsonData);
}

export default async function Home() {
  const data = await getData();
  const { 
    appDetails, 
    // features, 
    // analytics, 
    // testimonials, 
    // nearbyAreas, 
    // events, 
    // categories, 
    contact, 
    social 
  } = data;

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <Hero 
        tagline={appDetails.tagline}
        appName={appDetails.name}
        description={appDetails.shortDescription}
        ctaText={appDetails.cta}
      />
      
      {/* <Features 
        title={features.title}
        subtitle={features.subtitle}
        features={features.items}
      /> */}
      
      {/* <Analytics 
        title={analytics.title}
        subtitle={analytics.subtitle}
        stats={analytics.stats}
      />
      
      <NearbyAreas 
        areas={nearbyAreas}
      />
      
      <Events 
        events={events}
        categories={categories}
        exploreCta={appDetails.exploreCta}
      /> */}
      
      {/* <Testimonials 
        title={testimonials.title}
        subtitle={testimonials.subtitle}
        testimonials={testimonials.items}
      /> */}
      
      <Contact 
        title={contact.title}
      />
      
      <Footer 
        appName={appDetails.name}
        social={social}
      />
    </main>
  );
}
