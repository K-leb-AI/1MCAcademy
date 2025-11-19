import { supabase } from "@/supabaseClient";

export const askMentor = async (
  question,
  skillPath,
  userName,
  chatHistory = []
) => {
  try {
    const { data } = await supabase.auth.getSession();
    const session = data.session;
    const token = session?.access_token;

    const response = await fetch(import.meta.env.VITE_MENTOR_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({
        message: question,
        skillPath,
        userName,
        chatHistory,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Edge function error:", errorText);
      throw new Error(`Edge function returned ${response.status}`);
    }

    const result = await response.json();
    return result.reply || "No response from mentor.";
  } catch (err) {
    console.error("Mentor request failed:", err);
    throw err;
  }
};
