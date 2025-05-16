
import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  
  // Array of pastel colors for background transitions
  const pastelColors = [
    'bg-pastel-blue',
    'bg-pastel-teal',
    'bg-pastel-yellow',
    'bg-pastel-amber',
    'bg-pastel-orange',
    'bg-pastel-pink',
    'bg-pastel-purple'
  ];

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    // Slowly cycle through colors
    const colorInterval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % pastelColors.length);
    }, 10000); // Change color every 10 seconds

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(colorInterval);
    };
  }, []);

  // Calculate parallax effect based on scroll position
  const backgroundOffset = scrollPosition * 0.05;

  return (
    <div className={`flex flex-col min-h-screen transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        className={`absolute inset-0 -z-10 hero-pattern transition-colors duration-3000 ${pastelColors[colorIndex]}`}
        style={{ transform: `translateY(${backgroundOffset}px)` }}
      />
      <Header />
      <main className="flex-grow relative">{children}</main>
      <Footer />
    </div>
  );
}
