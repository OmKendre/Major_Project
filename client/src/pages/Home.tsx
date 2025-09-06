import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import railwayLogo from '../assets/images/railway.png';

// SVG for the Ashoka Emblem
const AshokaEmblem = () => (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1"/>
        {[...Array(24)].map((_, i) => (
            <line key={i} x1="12" y1="12" x2="12" y2="3" transform={`rotate(${i * 15}, 12, 12)`} stroke="currentColor" strokeWidth="0.75"/>
        ))}
    </svg>
);

// SVG for the Login Icon
const LoginIcon = () => (
    <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
);

// SVG for the Safety Icon
const SafetyIcon = () => (
    <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
);

// SVG Background Pattern
const TechGridPattern = () => (
    <div className="absolute inset-0 w-full h-full opacity-20" style={{backgroundColor: '#F7FAFC', backgroundImage: 'radial-gradient(#DADCE0 1px, transparent 1px)', backgroundSize: '2rem 2rem'}}></div>
);

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-roboto relative">
      <TechGridPattern />

      {/* --- HEADER WITH RESPONSIVE EMBLEM --- */}
      <header className="w-full bg-slate-100 border-b border-gray-200 shadow-sm z-10">
        <div className="max-w-7xl mx-auto flex justify-center sm:justify-start items-center px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            {/* The Emblem is now hidden by default and appears on small screens and up */}
            <div className="hidden sm:flex">
              <AshokaEmblem />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-semibold text-base sm:text-lg leading-tight text-gray-800">Government of India</p>
              <p className="text-xs sm:text-sm leading-tight text-gray-600">Ministry of Railways</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center z-10 w-full">
        <div className="text-center w-full max-w-4xl px-4 py-8 sm:py-16">
          
          <img 
            src={railwayLogo} 
            alt="Central Railway Workshop Logo" 
            className="mx-auto mb-6 w-auto h-40 md:h-[220px]" 
          />
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.1)'}}>
            Safety Management System
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            A unified platform for the Central Railway Workshop to manage and digitize safety-critical operations.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xs sm:max-w-none mx-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-3 px-8 rounded-lg shadow-md transform hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => navigate('/role-selection')}
            >
              <LoginIcon />
              Portal Login
            </Button>
            
            <a 
              href="https://tinyurl.com/27nehrtw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full font-semibold py-3 px-8 rounded-lg border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
              >
                <SafetyIcon />
                Safety Instructions
              </Button>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 z-10">
        <div className="max-w-7xl mx-auto text-center px-6 py-6">
            <div className="flex justify-center gap-x-6 gap-y-2 flex-wrap mb-4">
                <a href="#" className="text-sm text-gray-500 hover:text-blue-600 hover:underline">About</a>
                <a href="#" className="text-sm text-gray-500 hover:text-blue-600 hover:underline">Privacy Policy</a>
                <a href="#" className="text-sm text-gray-500 hover:text-blue-600 hover:underline">Contact Us</a>
            </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Central Railway, Indian Railways. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;