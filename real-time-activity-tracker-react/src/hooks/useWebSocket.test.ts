import { renderHook, act } from "@testing-library/react";
import { activityReducer, useWebSocket } from "../hooks/useWebSocket";
import { io, Socket } from "socket.io-client";
import { Activity } from "../context/ActivityContext";

// Mock socket.io-client
jest.mock("socket.io-client");

describe("State Management with Activity Reducer", () => {
  it("should return the initial state", () => {
    const initialState = { activities: [] };
    const result = activityReducer(initialState, { type: "UNKNOWN_ACTION" as never, payload: {} as never });
  
    expect(result).toEqual(initialState);
  });

  it("should add an activity when receiving ADD_ACTIVITY action", () => {
    const initialState = { activities: [] };

    const newActivity: Activity = {
      user: "John",
      message: "Completed a task",
      timestamp: "2025-03-08T12:00:00Z",
    };

    const result = activityReducer(initialState, { type: "ADD_ACTIVITY", payload: newActivity });

    expect(result.activities).toHaveLength(1);
    expect(result.activities[0]).toEqual(newActivity);
  });

  it("should add multiple activities in reverse order (latest first)", () => {
    const initialState = { activities: [] };

    const activity1: Activity = { user: "Alice", message: "Joined", timestamp: "10:30 AM" };
    const activity2: Activity = { user: "Bob", message: "Left", timestamp: "10:35 AM" };

    let state = activityReducer(initialState, { type: "ADD_ACTIVITY", payload: activity1 });
    state = activityReducer(state, { type: "ADD_ACTIVITY", payload: activity2 });

    expect(state.activities).toEqual([activity2, activity1]); // Newest first
  });
});


describe("WebSocket Connection with useWebSocket Hook", () => {
  let socketMock: Partial<Socket>;

  beforeEach(() => {
    socketMock = {
      on: jest.fn(),
      emit: jest.fn(),
      disconnect: jest.fn(),
    };

    // Make the mock return our fake socket instance
    (io as jest.Mock).mockReturnValue(socketMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should establish a WebSocket connection on mount", () => {
    renderHook(() => useWebSocket());

    expect(io).toHaveBeenCalledWith("http://localhost:4000"); // Ensure connection happens
  });

  it("should initialize with an empty activities list", () => {
    const { result } = renderHook(() => useWebSocket());
    expect(result.current).toEqual([]);
  });

  it("should add activities when receiving WebSocket events", () => {
    const { result } = renderHook(() => useWebSocket());

    const newActivity: Activity = {
      user: "Alice",
      message: "Joined the chat",
      timestamp: "10:30 AM",
    };

    // Find the WebSocket 'on' listener for "activity" and trigger it
    const onActivityHandler = (socketMock.on as jest.Mock).mock.calls.find(
      (call) => call[0] === "activity"
    )?.[1];

    expect(onActivityHandler).toBeDefined(); // Ensure WebSocket event listener is registered

    act(() => {
      onActivityHandler(newActivity); // Simulate receiving a new activity
    });

    expect(result.current).toHaveLength(1);
    expect(result.current[0]).toEqual(newActivity);
  });

  it("should disconnect WebSocket on unmount", () => {
    const { unmount } = renderHook(() => useWebSocket());

    unmount(); // Simulate component unmounting

    expect(socketMock.disconnect).toHaveBeenCalledTimes(1); // Ensure disconnect is called
  });
});