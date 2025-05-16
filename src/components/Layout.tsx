
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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
    
    const handleMouseMove = (e: MouseEvent) => {
      // Update mouse position for parallax effect
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    // Slowly cycle through colors
    const colorInterval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % pastelColors.length);
    }, 8000); // Change color every 8 seconds

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(colorInterval);
    };
  }, []);

  // Calculate parallax effect based on scroll position and mouse movement
  const backgroundOffset = scrollPosition * 0.05;
  const mouseParallaxX = mousePosition.x * 20 - 10;
  const mouseParallaxY = mousePosition.y * 20 - 10;

  return (
    <div className={`flex flex-col min-h-screen transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Advanced animated background with multiple layers */}
      <div 
        className={`fixed inset-0 -z-20 hero-pattern transition-colors duration-3000 ${pastelColors[colorIndex]}`}
        style={{ transform: `translateY(${backgroundOffset * 0.5}px)` }}
      />
      <div 
        className="fixed inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {/* Floating shapes in the background */}
        <div className="absolute top-[10%] right-[10%] w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float" 
             style={{ transform: `translate(${mouseParallaxX * 0.3}px, ${mouseParallaxY * 0.3}px)` }} 
        />
        <div className="absolute bottom-[15%] left-[15%] w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: '1s', transform: `translate(${mouseParallaxX * -0.2}px, ${mouseParallaxY * -0.2}px)` }} 
        />
        <div className="absolute top-[40%] left-[25%] w-48 h-48 bg-white/5 rounded-full blur-2xl animate-float" 
             style={{ animationDelay: '2s', transform: `translate(${mouseParallaxX * 0.4}px, ${mouseParallaxY * 0.4}px)` }} 
        />
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_70%)]" />
      </div>
      
      {/* Main content */}
      <Header />
      <main className="flex-grow relative">{children}</main>
      <Footer />
    </div>
  );
}
