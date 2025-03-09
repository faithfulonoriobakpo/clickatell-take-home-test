import { useEffect, useReducer } from "react";
import { io, Socket } from "socket.io-client";
import { Activity } from "../context/ActivityContext";

const SOCKET_URL = "http://localhost:4000";

interface State {
  activities: Activity[];
}

export type Action = { type: "ADD_ACTIVITY"; payload: Activity };

export const activityReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_ACTIVITY":
      return { activities: [action.payload, ...state.activities] };
    default:
      return state;
  }
};

export const useWebSocket = () => {
  const [state, dispatch] = useReducer(activityReducer, { activities: [] });

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL);

    socket.on("activity", (newActivity: Activity) => {
      dispatch({ type: "ADD_ACTIVITY", payload: newActivity });
      console.log("Dispatched new activity", newActivity)
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return state.activities;
};
