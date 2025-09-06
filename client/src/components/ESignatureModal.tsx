import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ESignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (signature: string) => void;
  permitTitle: string;
}

const ESignatureModal = ({ isOpen, onClose, onConfirm, permitTitle }: ESignatureModalProps) => {
  const [signature, setSignature] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signature.trim()) {
      onConfirm(signature);
      setSignature("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md-elevation-3">
        <DialogHeader>
          <DialogTitle className="text-xl font-roboto text-md-text-primary">
            Electronic Signature Required
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-md-text-secondary font-roboto">
            You are about to approve: <strong>{permitTitle}</strong>
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signature" className="text-md-text-primary font-roboto">
                Enter your full name to confirm approval
              </Label>
              <Input
                id="signature"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Your full name"
                className="border-md-border focus:border-md-primary font-roboto"
                required
              />
            </div>
            
            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                <span className="material-icons text-sm mr-2">check</span>
                Confirm Approval
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ESignatureModal;