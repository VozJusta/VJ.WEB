export type RequestStatus = "pending" | "accepted" | "rejected";

export type RequestCardProps = {
  id: string;
  protocol: string;
  citizenName: string;
  citizenInitials?: string;
  area: string;
  status: RequestStatus;
  createdAt: string;
  onClick?: (id: string) => void;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onViewDossier?: (id: string) => void;
  className?: string;
};
