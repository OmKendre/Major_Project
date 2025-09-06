import { useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Permit {
  id: string;
  title: string;
  status: 'approved' | 'pending' | 'denied' | 'ongoing';
  location: string;
  type: string;
  creator: string;
  createdAt: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
}

const mockPermits: Permit[] = [
  {
    id: '1',
    title: 'Electrical Work - Building A',
    status: 'ongoing',
    location: 'Building A, Floor 3',
    type: 'Electrical',
    creator: 'Mike Davis',
    createdAt: '2024-01-15',
    description: 'Installation of new electrical panels and wiring',
    riskLevel: 'medium'
  },
  {
    id: '2',
    title: 'Hot Work - Welding Bay',
    status: 'pending',
    location: 'Manufacturing Floor',
    type: 'Hot Work',
    creator: 'John Smith',
    createdAt: '2024-01-16',
    description: 'Welding repairs on production equipment',
    riskLevel: 'high'
  },
  {
    id: '3',
    title: 'Confined Space Entry',
    status: 'approved',
    location: 'Tank Farm',
    type: 'Confined Space',
    creator: 'Lisa Wilson',
    createdAt: '2024-01-14',
    description: 'Routine maintenance inspection of storage tank',
    riskLevel: 'high'
  },
  {
    id: '4',
    title: 'Chemical Handling - Lab Area',
    status: 'pending',
    location: 'Research Lab B',
    type: 'Chemical',
    creator: 'Sarah Johnson',
    createdAt: '2024-01-16',
    description: 'Handling of corrosive chemicals for testing',
    riskLevel: 'medium'
  }
];

const statusFilters = [
  { label: 'All', value: 'all' },
  { label: 'On-going', value: 'ongoing' },
  { label: 'Approved', value: 'approved' },
  { label: 'Pending', value: 'pending' },
  { label: 'Denied', value: 'denied' }
];

const SafetyOfficerDashboard = () => {
  const [permits, setPermits] = useState<Permit[]>(mockPermits);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const { toast } = useToast();

  const filteredPermits = permits.filter(permit => {
    const matchesSearch = permit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permit.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permit.creator.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || permit.status === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-md-success text-white">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-md-warning text-white">Pending</Badge>;
      case 'denied':
        return <Badge className="bg-md-error text-white">Denied</Badge>;
      case 'ongoing':
        return <Badge className="bg-md-primary text-white">On-going</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'high':
        return <Badge variant="destructive">High Risk</Badge>;
      case 'medium':
        return <Badge className="bg-md-warning text-white">Medium Risk</Badge>;
      case 'low':
        return <Badge className="bg-md-success text-white">Low Risk</Badge>;
      default:
        return <Badge variant="secondary">{risk}</Badge>;
    }
  };

  const handleClosePermit = (permitId: string) => {
    const permit = permits.find(p => p.id === permitId);
    if (permit) {
      setPermits(prev => prev.map(p => 
        p.id === permitId ? { ...p, status: 'approved' as const } : p
      ));
      toast({
        title: "Permit Closed",
        description: `${permit.title} has been closed and marked as completed`,
      });
    }
  };

  const handleViewDetails = (permitId: string) => {
    console.log('Viewing details for permit:', permitId);
  };

  const getContextualActionButton = (permit: Permit) => {
    if (permit.status === 'ongoing') {
      return (
        <Button 
          size="sm"
          onClick={() => handleClosePermit(permit.id)}
        >
          <span className="material-icons text-sm mr-2">close</span>
          Close Permit
        </Button>
      );
    } else {
      return (
        <Button 
          size="sm" 
          variant="link"
          onClick={() => handleViewDetails(permit.id)}
        >
          View Details
        </Button>
      );
    }
  };

  return (
    <DashboardLayout title="Safety Officer Dashboard" role="Safety Officer">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-md-text-primary font-roboto mb-2">
            Permit Overview
          </h2>
          <p className="text-md-text-secondary font-roboto">
            Monitor and oversee all permit activities across the facility
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-md-text-secondary">
              search
            </span>
            <Input
              placeholder="Search permits by title, location, or creator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base border-md-border focus:border-md-primary font-roboto"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {statusFilters.map((filter) => (
              <Button
                key={filter.value}
                variant={activeFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.value)}
                className={`rounded-full ${
                  activeFilter === filter.value 
                    ? 'bg-md-primary text-white' 
                    : 'text-md-text-secondary border-md-border hover:border-md-primary'
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Permits List */}
        <div className="space-y-4">
          {filteredPermits.map((permit) => (
            <Card key={permit.id} className="md-elevation-1 hover:md-elevation-2 transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-md-text-primary font-roboto mb-2">
                      {permit.title}
                    </h3>
                    <div className="flex gap-2 mb-3">
                      {getStatusBadge(permit.status)}
                      {getRiskBadge(permit.riskLevel)}
                    </div>
                  </div>
                  {getContextualActionButton(permit)}
                </div>
                
                <div className="grid md:grid-cols-4 gap-4 text-sm mb-4">
                  <div className="flex items-center text-md-text-secondary">
                    <span className="material-icons text-sm mr-2">location_on</span>
                    {permit.location}
                  </div>
                  <div className="flex items-center text-md-text-secondary">
                    <span className="material-icons text-sm mr-2">category</span>
                    {permit.type}
                  </div>
                  <div className="flex items-center text-md-text-secondary">
                    <span className="material-icons text-sm mr-2">person</span>
                    {permit.creator}
                  </div>
                  <div className="flex items-center text-md-text-secondary">
                    <span className="material-icons text-sm mr-2">calendar_today</span>
                    {new Date(permit.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <p className="text-md-text-secondary font-roboto">
                  {permit.description}
                </p>
              </CardContent>
            </Card>
          ))}
          
          {filteredPermits.length === 0 && (
            <Card className="md-elevation-1">
              <CardContent className="p-8 text-center">
                <span className="material-icons text-4xl text-md-text-secondary mb-4 block">
                  search_off
                </span>
                <p className="text-md-text-secondary font-roboto">
                  No permits found matching your search criteria
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SafetyOfficerDashboard;