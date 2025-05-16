
import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate parallax effect based on scroll position
  const backgroundOffset = scrollPosition * 0.05;

  return (
    <div className={`flex flex-col min-h-screen transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        className="absolute inset-0 -z-10 hero-pattern" 
        style={{ transform: `translateY(${backgroundOffset}px)` }}
      />
      <Header />
      <main className="flex-grow relative">{children}</main>
      <Footer />
    </div>
  );
}
