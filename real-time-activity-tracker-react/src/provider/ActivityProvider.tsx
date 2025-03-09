import { ReactNode } from "react";
import { ActivityContext } from "../context/ActivityContext";
import { useWebSocket } from "../hooks/useWebSocket";

export const ActivityProvider = ({ children }: { children: ReactNode }) => {
    const activities = useWebSocket();
    return <ActivityContext.Provider value={activities}>{children}</ActivityContext.Provider>;
};