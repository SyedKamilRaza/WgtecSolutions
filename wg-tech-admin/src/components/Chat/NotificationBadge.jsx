import React from "react";
import "./NotificationBadge.css";

const NotificationBadge = ({ count }) => {
  if (count === 0) return null;

  return (
    <div className={`notification-badge ${count > 9 ? "large" : ""}`}>
      {count > 99 ? "99+" : count}
    </div>
  );
};

export default NotificationBadge;
