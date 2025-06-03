import React from "react";

interface AvatarStackProps {
  users: { name: string; avatar: string }[];
  max?: number;
}

const AvatarStack: React.FC<AvatarStackProps> = ({ users, max = 4 }) => {
  const displayUsers = users.slice(0, max);
  const extra = users.length - max;

  return (
    <div className="flex -space-x-2">
      {displayUsers.map((user, idx) => (
        <img
          key={user.name}
          src={user.avatar}
          alt={user.name}
          className="w-6 h-6 rounded-full border border-gray-800 shadow"
          style={{ zIndex: displayUsers.length - idx }}
        />
      ))}
      {extra > 0 && (
        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 text-xs font-semibold border border-gray-800 shadow">
          +{extra}
        </span>
      )}
    </div>
  );
};

export default AvatarStack;
