// Centralized proposals data store
export const proposalsData = [
  {
    id: 1,
    proposalId: "12345678",
    fullname: "John Smith",
    email: "john.smith@email.com",
    services: ["Web Development", "Mobile App", "UI/UX Design"],
    budget: "$10,000",
    messages:
      "Looking for a complete e-commerce solution with modern design and mobile responsiveness.",
    status: "Pending",
    createdAt: "2024-01-15",
    phone: "+1 (555) 123-4567",
    company: "Tech Solutions Inc.",
    isActive: true,
  },
  {
    id: 2,
    proposalId: "87654321",
    fullname: "Emily Johnson",
    email: "emily.johnson@email.com",
    services: ["Digital Marketing", "SEO Optimization"],
    budget: " $5,000",
    messages:
      "Need help with digital marketing strategy and SEO optimization for my business website.",
    status: "In Progress",
    createdAt: "2024-01-14",
    phone: "+1 (555) 234-5678",
    company: "Marketing Pro LLC",
    isActive: true,
  },
  {
    id: 3,
    proposalId: "11223344",
    fullname: "Michael Brown",
    email: "michael.brown@email.com",
    services: ["Backend Development", "Database Design", "API Integration"],
    budget: "$15,000",
    messages:
      "Require backend development for a complex enterprise application with microservices architecture.",
    status: "Locked",
    createdAt: "2024-01-13",
    phone: "+1 (555) 345-6789",
    company: "Enterprise Systems",
    isActive: true,
  },
  {
    id: 4,
    proposalId: "55667788",
    fullname: "Sophia Williams",
    email: "sophia.williams@email.com",
    services: ["Graphic Design", "Brand Identity"],
    budget: "$3,000",
    messages:
      "Need a complete brand identity package including logo, business cards, and marketing materials.",
    status: "Pending",
    createdAt: "2024-01-12",
    phone: "+1 (555) 456-7890",
    company: "Creative Studio",
    isActive: true,
  },
  {
    id: 5,
    proposalId: "99887766",
    fullname: "David Miller",
    email: "david.miller@email.com",
    services: ["Cloud Migration", "DevOps", "Security Audit"],
    budget: "$20,000",
    messages:
      "Looking to migrate our infrastructure to cloud and implement DevOps practices with security audit.",
    status: "In Progress",
    createdAt: "2024-01-11",
    phone: "+1 (555) 567-8901",
    company: "CloudTech Solutions",
    isActive: true,
  },
];

// Helper functions for data management
export const getProposalById = (id) => {
  return proposalsData.find((proposal) => proposal.id === parseInt(id));
};

export const getAllProposals = () => {
  return proposalsData;
};

export const updateProposalStatus = (id, newStatus) => {
  const proposalIndex = proposalsData.findIndex(
    (proposal) => proposal.id === parseInt(id)
  );
  if (proposalIndex !== -1) {
    proposalsData[proposalIndex].status = newStatus;
    return proposalsData[proposalIndex];
  }
  return null;
};

export const addProposal = (newProposal) => {
  const id = Math.max(...proposalsData.map((p) => p.id)) + 1;
  const proposal = {
    ...newProposal,
    id,
    createdAt: new Date().toISOString().split("T")[0],
  };
  proposalsData.push(proposal);
  return proposal;
};

export const updateProposal = (updatedProposal) => {
  const proposalIndex = proposalsData.findIndex(
    (proposal) => proposal.id === updatedProposal.id
  );
  if (proposalIndex !== -1) {
    proposalsData[proposalIndex] = {
      ...proposalsData[proposalIndex],
      ...updatedProposal,
    };
    return proposalsData[proposalIndex];
  }
  return null;
};

export const deleteProposal = (id) => {
  const proposalIndex = proposalsData.findIndex(
    (proposal) => proposal.id === parseInt(id)
  );
  if (proposalIndex !== -1) {
    return proposalsData.splice(proposalIndex, 1)[0];
  }
  return null;
};

// Event system for data changes (optional - for real-time updates)
const listeners = [];

export const subscribeToChanges = (callback) => {
  listeners.push(callback);
  return () => {
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
};

export const notifyListeners = () => {
  listeners.forEach((callback) => callback(proposalsData));
};

// Enhanced update functions that notify listeners
export const updateProposalStatusWithNotification = (id, newStatus) => {
  const result = updateProposalStatus(id, newStatus);
  if (result) {
    notifyListeners();
  }
  return result;
};
