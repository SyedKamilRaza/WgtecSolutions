import React from "react";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import "./ProjectStatusIndicator.css";

const ProjectStatusIndicator = ({
  projectId,
  projectName,
  currentStatus,
}) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle size={20} className="status-icon approved" />;
      case "Completed":
        return <CheckCircle size={20} className="status-icon completed" />;
      case "Under Review":
        return <Clock size={20} className="status-icon pending" />;
      case "Rejected":
        return <XCircle size={20} className="status-icon rejected" />;
      default:
        return <AlertCircle size={20} className="status-icon" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "#3b82f6";
      case "Completed":
        return "#10b981";
      case "Under Review":
        return "#f59e0b";
      case "Rejected":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="project-status-indicator">
      <div className="status-container">
        <span className="status-label">Project Status:</span>
        <div
          className="status-badge"
          style={{ borderLeftColor: getStatusColor(currentStatus) }}
        >
          {getStatusIcon(currentStatus)}
          <span className="status-text">{currentStatus}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatusIndicator;
