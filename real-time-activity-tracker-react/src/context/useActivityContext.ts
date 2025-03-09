import { useContext } from "react";
import { ActivityContext } from "./ActivityContext";

export const useActivityContext = () => useContext(ActivityContext);