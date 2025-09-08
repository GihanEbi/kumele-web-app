import { config } from "@/config";
import { getToken } from "@/utils/authUtils";
const commonUrl = `${"http://localhost:5001/api"}/chat`;

// Define the message structure, matching the backend model
interface Message {
  id?: string;
  event_id: string;
  user_id: string;
  username: string;
  message_text: string;
  created_at?: Date;
}

interface ChatProps {
  eventId: string;
  currentUser: {
    id: string;
    username: string;
  };
  token: string; // For fetching initial messages
}

export async function getMessages(event_id: string) {
  try {
    const res = await fetch(`${commonUrl}/messages/${event_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`, // Uncomment if you need to send a token
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
