import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// --- UPDATED ROLES ARRAY (Removed testEmail) ---
const roles = [
  {
    id: 'sse_mw',
    name: 'SSE - Maintenance (MW)',
    icon: 'person',
    description: 'Create Work at Height permits',
    apiRole: 'SSE_MAINTENANCE',
    dashboardUrl: '/dashboard/sse-maintenance'
  },
  {
    id: 'sse_substation',
    name: 'SSE - Maintenance (Substation)',
    icon: 'electrical_services',
    description: 'Create Electrical permits',
    apiRole: 'SSE_MAINTENANCE',
    dashboardUrl: '/dashboard/sse-maintenance'
  },
  {
    id: 'sse_shop',
    name: 'SSE - Shop',
    icon: 'check_circle',
    description: 'Review and approve permits',
    apiRole: 'SSE_SHOP',
    dashboardUrl: '/dashboard/sse-shop'
  },
  {
    id: 'safety_officer',
    name: 'Safety Officer',
    icon: 'security',
    description: 'Monitor and oversee safety compliance',
    apiRole: 'SAFETY_OFFICER',
    dashboardUrl: '/dashboard/safety-officer'
  }
];

type RoleInfo = typeof roles[0];

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState<RoleInfo | null>(null);
  const [email, setEmail] = useState(""); // <-- State for user-typed email
  const [password, setPassword] = useState(""); // <-- State for user-typed password
  const navigate = useNavigate();

  const handleRoleSelect = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role) {
      setSelectedRole(role);
    }
  };

  // --- CORRECTED LOGIN FUNCTION ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole || !email || !password) {
      return;
    }

    try {
      // Now uses the email from the input field
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email: email,
        password: password,
        role: selectedRole.apiRole,
      });

      const { token, user } = response.data;
      console.log('Login successful for user:', user);

      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate(selectedRole.dashboardUrl);

    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and role.');
    }
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-md-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md md-elevation-2">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <span className="material-icons text-md-primary text-4xl mb-4 block">
                {selectedRole.icon}
              </span>
              <h2 className="text-2xl font-bold text-md-text-primary font-roboto mb-2">
                {selectedRole.name} Login
              </h2>
            </div>
            
            {/* --- CORRECTED LOGIN FORM --- */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-md-text-primary font-roboto">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-md-border focus:border-md-primary font-roboto"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-md-text-primary font-roboto">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-md-border focus:border-md-primary font-roboto"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setSelectedRole(null)}
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1">
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-md-background flex items-center justify-center px-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-md-text-primary mb-4 font-roboto">
            Select Your Role
          </h1>
          <p className="text-xl text-md-text-secondary font-roboto">
            Choose your role to access the appropriate dashboard
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => (
            <Card 
              key={role.id}
              className="cursor-pointer md-elevation-1 hover:md-elevation-2 transition-all duration-200 border-md-border hover:border-md-primary"
              onClick={() => handleRoleSelect(role.id)}
            >
              <CardContent className="p-8 text-center">
                <span className="material-icons text-md-primary text-5xl mb-4 block">
                  {role.icon}
                </span>
                <h3 className="text-xl font-bold text-md-text-primary mb-2 font-roboto">
                  {role.name}
                </h3>
                <p className="text-md-text-secondary font-roboto">
                  {role.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;