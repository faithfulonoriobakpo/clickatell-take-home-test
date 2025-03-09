import { createContext } from "react";

export interface Activity {
  user: string,
  message: string;
  timestamp: string;
}


export const ActivityContext = createContext<Activity[]>([]);
