import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Lessons } from './components/Lessons';
import { Vocabulary } from './components/Vocabulary';
import { Practice } from './components/Practice';
import { Progress } from './components/Progress';
import { Footer } from './components/Footer';
import { GDPRCCPAConsent } from './components/Consent';
import { GiscusComments } from './components/Comments'; 



export type Section = 'home' | 'lessons' | 'vocabulary' | 'practice' | 'progress';

function App() {
  const [currentSection, setCurrentSection] = useState<Section>('home');

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <Hero onGetStarted={() => setCurrentSection('lessons')} />;
      case 'lessons':
        return <Lessons />;
      case 'vocabulary':
        return <Vocabulary />;
      case 'practice':
        return <Practice />;
      case 'progress':
        return <Progress />;
      default:
        return <Hero onGetStarted={() => setCurrentSection('lessons')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-amber-50">
      <Header currentSection={currentSection} onSectionChange={setCurrentSection} />
      <main className="pt-16">
        {renderSection()}
        <GDPRCCPAConsent />
      </main>
       <GiscusComments />
      <Footer />
    </div>
  );
}

export default App;
