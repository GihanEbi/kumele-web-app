// hooks/useChat.ts
import { useState, useEffect, useCallback, useRef } from "react";
import {
  initializeSocket,
  getSocket,
  disconnectSocket,
  ClientMessage,
} from "../utils/socket";
import axios from "axios"; // For HTTP requests to your Express API

// Define the base URL for your backend API
const API_BASE_URL = process.env.BASE_URL || "http://localhost:5001/api";

interface UseChatOptions {
  eventId: string;
  //   userId: string; // The ID of the currently logged-in user
  //   username: string; // The username of the currently logged-in user
  token: string; // Authentication token for API and Socket.io
}

/**
 * Custom React Hook for handling chat logic, including fetching messages,
 * sending new messages, and real-time updates via Socket.io.
 */
export const useChat = ({ eventId, token }: UseChatOptions) => {
  const [messages, setMessages] = useState<ClientMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<any>(null); // Using useRef to hold the socket instance

  // Function to fetch historical messages from your backend API
  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/chat/messages/${eventId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`, // Ensure getToken() returns a valid token
        },
      });

      const data = await res.json();
      setMessages(data.data);
      setLoading(false);
      console.log(data);

      return data;
    } catch (error) {
      return error;
    }
  }, [eventId, token]);

  // Effect to initialize socket and fetch messages when the component mounts or eventId/token changes
  useEffect(() => {
    if (!token) {
      setError("Authentication token is missing.");
      setLoading(false);
      return;
    }

    // Initialize Socket.io connection
    const currentSocket = initializeSocket(token);
    socketRef.current = currentSocket;

    // Join the specific event room
    currentSocket.emit("joinRoom", eventId);
    console.log(`Attempting to join room: ${eventId}`);

    // Listen for incoming messages
    currentSocket.on("receiveMessage", (newMessage: ClientMessage) => {
      console.log("Received new message:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Fetch historical messages
    fetchMessages();

    // Cleanup function: disconnect socket and leave room when component unmounts
    return () => {
      if (socketRef.current) {
        console.log(`Leaving room: ${eventId}`);
        socketRef.current.emit("leaveRoom", eventId);
        socketRef.current.off("receiveMessage"); // Remove the listener
        disconnectSocket(); // Disconnect the global socket instance
      }
    };
  }, [eventId, token, fetchMessages]);

  // Function to send a new message via your backend API
  const sendMessage = async (message_text: string) => {
    if (!message_text.trim()) return; // Don't send empty messages

    try {
      const newMessage: Omit<ClientMessage, "id" | "created_at"> = {
        event_id: eventId,
        user_id: "userId",
        username: "username",
        message_text: message_text,
      };

      // Send message to your Express API. The API will then save it and broadcast via Socket.io.
      //   const response = await axios.post(
      //     `${API_BASE_URL}/chat/messages`,
      //     newMessage,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );
      const response = await fetch(`${API_BASE_URL}/chat/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`, // Ensure getToken() returns a valid token
        },
        body: JSON.stringify(newMessage),
      });

      const data = await response.json();

      // The backend broadcasts the message, so we don't update state here directly from the POST response.
      // The 'receiveMessage' socket listener will handle adding it to the state.
      console.log("Message sent to API, awaiting broadcast:", data.data);
      return data.data; // Optionally return the saved message from the API
    } catch (err: any) {
      console.error("Error sending message:", err);
      setError("Failed to send message.");
      throw err; // Re-throw to allow component to handle specific errors
    }
  };

  return { messages, loading, error, sendMessage };
};
