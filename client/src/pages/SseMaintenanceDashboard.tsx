import { useState, useEffect } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HeightPermitForm from "./HeightPermitForm"; // adjust path if needed

interface Permit {
  id: string;
  title: string;
  status: "approved" | "pending" | "denied" | "ongoing";
  location: string;
  type: string;
  createdAt: string;
  description: string;
}

const SseMaintenanceDashboard = () => {
  const [permits, setPermits] = useState<Permit[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch permits from backend (or fallback to mock)
  async function fetchPermits() {
    try {
      const res = await fetch("/api/permits"); // adjust backend URL
      if (!res.ok) throw new Error("Failed to fetch permits");
      const data = await res.json();
      setPermits(data);
    } catch (err) {
      console.error(err);
      // fallback mock
      setPermits([
        {
          id: "1",
          title: "Electrical Work - Building A",
          status: "ongoing",
          location: "Building A, Floor 3",
          type: "Electrical",
          createdAt: "2024-01-15",
          description: "Installation of new electrical panels and wiring",
        },
        {
          id: "2",
          title: "Hot Work - Welding Bay",
          status: "pending",
          location: "Manufacturing Floor",
          type: "Hot Work",
          createdAt: "2024-01-16",
          description: "Welding repairs on production equipment",
        },
      ]);
    }
  }

  useEffect(() => {
    fetchPermits();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-md-success text-white">Approved</Badge>;
      case "pending":
        return <Badge className="bg-md-warning text-white">Pending</Badge>;
      case "denied":
        return <Badge className="bg-md-error text-white">Denied</Badge>;
      case "ongoing":
        return <Badge className="bg-md-primary text-white">On-going</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout title="SSE (Maintenance) Dashboard">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-md-text-primary font-roboto mb-2">
            My Permits
          </h2>
          <p className="text-md-text-secondary font-roboto">
            Manage and track your submitted permits
          </p>
        </div>

        {/* Permit list */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {permits.map((permit) => (
            <Card
              key={permit.id}
              className="md-elevation-1 hover:md-elevation-2 transition-all duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-roboto text-md-text-primary">
                    {permit.title}
                  </CardTitle>
                  {getStatusBadge(permit.status)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{permit.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {permit.type} • {permit.location}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Floating Add button */}
        <div className="fixed bottom-6 right-6">
          <Button
            variant="fab"
            size="fab"
            onClick={() => setShowForm(true)}
            title="New Permit"
          >
            <span className="material-icons text-xl">add</span>
          </Button>
        </div>

        {/* Modal with HeightPermitForm */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto z-50">
            <div className="min-h-screen flex items-start justify-center py-10">
              <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-xl font-bold">New Height Permit</h2>
                  <button
                    className="text-gray-500 hover:text-gray-800"
                    onClick={() => setShowForm(false)}
                  >
                    ✕
                  </button>
                </div>
                <div className="p-6">
                  <HeightPermitForm
                    onCreated={() => {
                      setShowForm(false);
                      fetchPermits();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SseMaintenanceDashboard;
