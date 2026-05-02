import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import TopBar from "@/components/TopBar";

interface ApiStatusContextType {
  apiStatus: "connected" | "disconnected";
}

const ApiStatusContext = createContext<ApiStatusContextType | undefined>(undefined);

export function useApiStatus() {
  const context = useContext(ApiStatusContext);
  if (context === undefined) {
    throw new Error("useApiStatus must be used within an ApiStatusProvider");
  }
  return context;
}

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [apiStatus, setApiStatus] = useState<"connected" | "disconnected">("disconnected");

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const res = await fetch("/api/status");
        const data = await res.json();
        setApiStatus(data.connected ? "connected" : "disconnected");
      } catch (error) {
        setApiStatus("disconnected");
      }
    };

    checkApiStatus();
  }, []);

  return (
    <ApiStatusContext.Provider value={{ apiStatus }}>
      <div className="min-h-screen flex flex-col bg-[#0C0C0E] text-slate-200 selection:bg-primary/30">
        <TopBar apiStatus={apiStatus} />
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </ApiStatusContext.Provider>
  );
}
