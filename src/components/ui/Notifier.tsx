import { createContext, useContext, useState, ReactNode } from "react";
import { Alert } from "@heroui/react";

export type NotifierColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

interface Notification {
  id: number;
  color: NotifierColor;
  message: string;
}

interface NotifierContextProps {
  notify: (message: string, color?: NotifierColor) => void;
}

const NotifierContext = createContext<NotifierContextProps | undefined>(undefined);

let notificationId = 0;

export const NotifierProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = (message: string, color: NotifierColor = "default") => {
    const id = ++notificationId;
    setNotifications((prev) => [...prev, { id, color, message }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  return (
    <NotifierContext.Provider value={{ notify }}>
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-xs">
        {notifications.map((n) => (
          <Alert key={n.id} color={n.color} title={n.message} />
        ))}
      </div>
      {children}
    </NotifierContext.Provider>
  );
};

export const useNotifier = () => {
  const context = useContext(NotifierContext);
  if (!context) throw new Error("useNotifier must be used within NotifierProvider");
  return context;
};
