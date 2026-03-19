export interface Service {
  _id: string;
  title: string;
  description?: string;
  status?: string;
}

export interface SubService {
  _id: string;
  title: string;
  description?: string;
  serviceId?: {
    _id: string;
    title: string;
  };
  status?: string;
}

export interface SelectedServiceItem {
  serviceId: string;
  serviceName: string;
  subServiceId: string;
  subServiceName: string;
  displayText: string;
}

export interface ProposalPayload {
  fullname: string;
  email: string;
  password: string; // ✅ ADD THIS
  services?: string[];
  subServices?: string[];
  budget?: string | null;
  messages?: string | null;

  // ✅ NAYA ADD KARO
  nationalId?: string | null;
  document?: File | null;
}


