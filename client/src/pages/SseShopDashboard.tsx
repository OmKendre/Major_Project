import { useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ESignatureModal from "@/components/ESignatureModal";
import { useToast } from "@/hooks/use-toast";

interface Permit {
  id: string;
  title: string;
  submittedBy: string;
  location: string;
  type: string;
  submittedAt: string;
  description: string;
  status: 'pending' | 'approved' | 'denied';
}

const mockPendingPermits: Permit[] = [
    // Keeping mock data for now
    { id: '1', title: 'Hot Work - Welding Bay', submittedBy: 'John Smith', location: 'Manufacturing Floor', type: 'Hot Work', submittedAt: '2024-01-16', description: 'Welding repairs on production equipment requires approval for safety protocols', status: 'pending' },
];

const SseShopDashboard = () => {
    const [pendingPermits, setPendingPermits] = useState<Permit[]>(mockPendingPermits);
    const [signatureModal, setSignatureModal] = useState<{ isOpen: boolean; permit: Permit | null }>({ isOpen: false, permit: null });
    const { toast } = useToast();

    const handleApproveClick = (permit: Permit) => {
        setSignatureModal({ isOpen: true, permit });
    };

    const handleConfirmApproval = (signature: string) => {
        if (signatureModal.permit) {
            // Handle approval logic
            toast({ title: "Permit Approved", description: `${signatureModal.permit.title} has been approved.` });
            setSignatureModal({ isOpen: false, permit: null }); // Close modal after approval
        }
    };

    return (
        <DashboardLayout title="SSE (Shop) Dashboard">
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-md-text-primary font-roboto mb-2">
                        Pending Permits for Approval
                    </h2>
                    <p className="text-md-text-secondary font-roboto mb-6">
                        Review and approve permits awaiting authorization
                    </p>
                </div>
                <div className="grid gap-6">
                    {pendingPermits.map((permit) => (
                        <Card key={permit.id} className="md-elevation-1">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl font-roboto text-md-text-primary">{permit.title}</CardTitle>
                                        <p className="text-md-text-secondary font-roboto mt-1">Submitted by {permit.submittedBy}</p>
                                    </div>
                                    <Badge className="bg-md-warning text-white">Pending</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={() => handleApproveClick(permit)}>Approve</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <ESignatureModal
                isOpen={signatureModal.isOpen}
                onClose={() => setSignatureModal({ isOpen: false, permit: null })}
                onConfirm={handleConfirmApproval}
                permitTitle={signatureModal.permit?.title || ""}
            />
        </DashboardLayout>
    );
}; // <-- This was the missing closing brace

export default SseShopDashboard;