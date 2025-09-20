import { config } from "@/config";
import { getToken } from "@/utils/authUtils";
const commonUrl = `${config.baseUrl}/event-reports`;

// function to get report reasons
export async function getReportReasons() {
  try {
    const res = await fetch(`${commonUrl}/get-reasons`, {
      method: "GET",
      headers: {
        authorization: `${getToken()}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching report reasons:", error);
    throw error;
  }
}

// function to create event report
export async function createEventReport(reportData: {
  event_id: string;
  reason: string;
  comments?: string;
}) {
  try {
    const res = await fetch(`${commonUrl}/create-report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`,
      },
      body: JSON.stringify(reportData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating event report:", error);
    throw error;
  }
}
