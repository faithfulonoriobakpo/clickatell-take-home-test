import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const PORT = 4000;
const app = express();

app.use(cors());

// Create HTTP server
const server = createServer(app);

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

console.log(`WebSocket server listening on ws://localhost:${PORT}`);

const activities = [
  "logged in",
  "posted a comment",
  "updated profile",
  "uploaded a file",
  "liked a post",
];

const users = [
  "Bolanle",
  "Damilare",
  "Faithful",
  "Musa",
  "Junaid",
];

const randomActivity = () => {
  const randomActivity = activities[Math.floor(Math.random() * activities.length)];
  const randomUser = users[Math.floor(Math.random() * users.length)];

  return {
    user: randomUser,
    message: randomActivity,
    timestamp: new Date().toLocaleTimeString()
  }
};

let activityCount = 0;

function sendRandomActivity(){
  const randomActivityInterval = setInterval(() => {
    const activity = randomActivity();

    activityCount++;
    // Broadcast to all clients
    io.emit("activity", activity);
    if(activityCount >= 10) clearInterval(randomActivityInterval);
  }, 5000);
}

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.emit("activity", randomActivity());

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

sendRandomActivity();
