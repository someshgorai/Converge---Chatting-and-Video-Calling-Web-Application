import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream API key or Secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]); // Refer: https://getstream.io/chat/docs/javascript/update_users/
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

// TODO: do it later
export const generateStreamToken = (userId) => {};
