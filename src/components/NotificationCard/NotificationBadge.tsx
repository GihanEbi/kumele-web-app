import React from "react";
type NotificationBadgeProps = {
  icon?: React.ReactNode;
  name?: string;
};

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  icon,
  name,
}) => {
  return (
    <div className="inline-flex text-[10px] bg-app-badge-background-qr rounded-full py-1 px-2 items-center space-x-2 text-app-text-secondary font-plusJakartaSans w-auto">
      {icon}
      <div>{name}</div>
    </div>
  );
};

export default NotificationBadge;
