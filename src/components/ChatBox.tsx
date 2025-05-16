
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export function ChatBox() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi there! I'm EduBot, your AI assistant for EduPathfinder. How can I help you today? Ask me about degree programs, college options, or registration!",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isConversationComplete, setIsConversationComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Clear chat functionality
  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        text: "👋 Hi there! I'm EduBot, your AI assistant for EduPathfinder. How can I help you today? Ask me about degree programs, college options, or registration!",
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
    setIsConversationComplete(false);
    toast({
      title: "Chat cleared",
      description: "Starting a fresh conversation",
      duration: 3000,
    });
  };

  // AI response generation based on user query
  const generateAIResponse = (query: string) => {
    setIsTyping(true);
    
    // Simulate AI "thinking" time
    setTimeout(() => {
      let response = "";
      const lowerQuery = query.toLowerCase();
      
      // Simple rule-based responses
      if (lowerQuery.includes("registration") || lowerQuery.includes("sign up") || lowerQuery.includes("register")) {
        response = "You can register by clicking the 'Register' button in the navigation menu. We'll need your name, email, and academic details to get you started. Need help with any specific part of registration?";
      } 
      else if (lowerQuery.includes("degree") || lowerQuery.includes("program") || lowerQuery.includes("course")) {
        response = "We offer various degree programs including Computer Science, Engineering, Business, and more. You can explore all available programs in the Degrees section. What specific field are you interested in?";
      } 
      else if (lowerQuery.includes("college") || lowerQuery.includes("university")) {
        response = "We partner with over 200 colleges and universities across the country. You can find detailed information about each institution, including rankings, admission requirements, and tuition fees in our Colleges section.";
      } 
      else if (lowerQuery.includes("career") || lowerQuery.includes("job")) {
        response = "Your career journey is important to us! Our platform can suggest career paths based on your interests and qualifications. Check out our Careers section to explore potential opportunities in different fields.";
      }
      else if (lowerQuery.includes("eligibility") || lowerQuery.includes("qualify")) {
        response = "Eligibility criteria vary based on the programs you're interested in. Generally, we look at your academic history, standardized test scores, and sometimes work experience. Visit our Eligibility page to check specific requirements for different programs.";
      }
      else if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("hey")) {
        response = "Hello there! How can I assist you with your educational journey today?";
      }
      else if (lowerQuery.includes("thank") || lowerQuery.includes("bye") || lowerQuery.includes("goodbye")) {
        response = "You're welcome! If you have any more questions in the future, feel free to ask. Have a great day!";
        setIsConversationComplete(true); // Mark conversation as complete
      }
      else {
        response = "Thanks for your question! I'd be happy to help with that. Could you please provide more details about what specific information you're looking for regarding our educational programs or services?";
      }
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: response,
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === "") return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    const query = newMessage;
    setNewMessage("");
    
    // Generate AI response based on the user's query
    generateAIResponse(query);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="flex flex-col bg-white rounded-lg shadow-xl w-80 md:w-96 h-96 border border-gray-200 animate-fade-in">
          <div className="flex items-center justify-between bg-primary p-4 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="bg-primary-foreground rounded-full p-1">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium text-primary-foreground">EduBot Assistant</h3>
            </div>
            <div className="flex items-center gap-2">
              {isConversationComplete && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary-foreground hover:bg-primary/90 p-1 h-8 w-8"
                  onClick={clearChat}
                  title="Clear chat"
                >
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-primary-foreground hover:bg-primary/90" 
                onClick={toggleChat}
              >
                &times;
              </Button>
            </div>
          </div>
          
          <ScrollArea className="flex-grow p-4 bg-slate-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={cn(
                    "max-w-[80%] p-3 rounded-lg shadow-sm",
                    message.sender === "user" 
                      ? "bg-primary text-primary-foreground ml-auto" 
                      : "bg-white border border-gray-100 mr-auto"
                  )}
                >
                  {message.text}
                </div>
              ))}
              {isTyping && (
                <div className="bg-white border border-gray-100 p-3 rounded-lg max-w-[80%] mr-auto shadow-sm">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-gray-300 animate-bounce"></div>
                    <div className="h-2 w-2 rounded-full bg-gray-300 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="h-2 w-2 rounded-full bg-gray-300 animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-white">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask me anything about your career or registration..."
                className="flex-grow shadow-sm"
              />
              <Button type="submit" size="icon" className="shadow-sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          className="h-12 w-12 rounded-full shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
