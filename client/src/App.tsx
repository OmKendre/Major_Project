import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoleSelection from "./pages/RoleSelection";
import SseMaintenanceDashboard from "./pages/SseMaintenanceDashboard"; // <-- Import new component
import SseShopDashboard from "./pages/SseShopDashboard";             // <-- Import new component
import SafetyOfficerDashboard from "./pages/SafetyOfficerDashboard";
import NotFound from "./pages/NotFound";
import HeightPermitForm from "./pages/HeightPermitForm"; // <-- Import new component

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          
          {/* --- UPDATED DASHBOARD ROUTES --- */}
          <Route path="/dashboard/sse-maintenance" element={<SseMaintenanceDashboard />} />
          <Route path="/dashboard/sse-shop" element={<SseShopDashboard />} />
          <Route path="/dashboard/safety-officer" element={<SafetyOfficerDashboard />} />
          <Route path="/permits/height/new" element={<HeightPermitForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;