import { ReactNode, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Import Sheet components
import { useIsMobile } from "@/hooks/use-mobile"; // Import the custom hook

// Define a type for our user object for better type safety
interface User {
  name: string;
  role: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const isMobile = useIsMobile(); // Hook to check for mobile screen size

  useEffect(() => {
    // When the component loads, try to get the user info from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Clear user info on logout
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  const renderDesktopNavbar = () => (
    <div className="flex justify-between items-center h-16">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-md-text-primary font-roboto">
          {title}
        </h1>
        {user && (
          <span className="ml-4 px-3 py-1 bg-md-border text-md-text-secondary text-sm rounded-full font-roboto">
            {user.role}
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-md-text-primary font-roboto">
            Welcome, <strong>{user.name}</strong>
          </span>
        )}
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleLogout}
        >
          <span className="material-icons text-sm mr-2">logout</span>
          Logout
        </Button>
      </div>
    </div>
  );

  const renderMobileNavbar = () => (
    <div className="flex justify-between items-center h-16">
      <div className="flex items-center">
        <h1 className="text-lg font-bold text-md-text-primary font-roboto">
          {title}
        </h1>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <span className="material-icons">menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[250px] p-6">
          <div className="flex flex-col h-full">
            {user && (
              <div className="mb-6 pb-4 border-b border-md-border">
                <p className="font-bold text-md-text-primary">{user.name}</p>
                <p className="text-sm text-md-text-secondary">{user.role}</p>
              </div>
            )}
            <div className="mt-auto">
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={handleLogout}
              >
                <span className="material-icons text-sm mr-2">logout</span>
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );

  return (
    <div className="min-h-screen bg-md-background">
      <nav className="bg-md-surface border-b border-md-border md-elevation-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isMobile ? renderMobileNavbar() : renderDesktopNavbar()}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;