// utils/socket.ts
import { io, Socket } from "socket.io-client";

// Define the shape of a message, matching your backend IMessage interface
export interface ClientMessage {
  id?: string;
  event_id: string;
  user_id: string;
  username: string;
  message_text: string;
  created_at?: string; // Use string as Date objects are often serialized to strings
}

// Replace with your backend URL where Socket.io is running
const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

let socket: Socket | null = null;

// Function to initialize the socket connection
export const initializeSocket = (token: string): Socket => {
  if (!socket) {
    socket = io(SOCKET_SERVER_URL, {
      transports: ["websocket"], // Prefer websockets
      auth: {
        token: token, // Pass the authentication token
      },
    });

    socket.on("connect", () => {
      console.log("Connected to Socket.io server!");
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected from Socket.io server:", reason);
      // Handle reconnection logic if necessary
    });

    socket.on("connect_error", (err) => {
      console.error("Socket.io connection error:", err.message);
      // You might want to display an error message to the user
    });
  }
  return socket;
};

// Function to get the existing socket instance
export const getSocket = (): Socket | null => {
  return socket;
};

// Function to disconnect the socket
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("Socket disconnected.");
  }
};