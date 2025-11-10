import { differenceInCalendarDays } from "date-fns";
import { supabase } from "../supabaseClient";

export async function updateUserStreak(userId) {
  const today = new Date();
  const { data: userData, error } = await supabase
    .from("profile")
    .select("last_login, current_streak")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching streak info:", error);
    return;
  }

  const lastLogin = userData?.last_login ? new Date(userData.last_login) : null;
  const prevStreak = userData?.current_streak || 0;
  let newStreak = prevStreak;

  if (!lastLogin) {
    newStreak = 1;
  } else {
    const diff = differenceInCalendarDays(today, lastLogin);
    if (diff === 1) newStreak += 1;
    else if (diff > 1) newStreak = 1;
    // diff === 0 → already logged in today → no change
  }

  console.log(today);

  // Update DB
  const { error: updateError } = await supabase
    .from("profile")
    .update({
      last_login: today.toISOString(),
      current_streak: newStreak,
    })
    .eq("user_id", userId);

  if (updateError) {
    console.error("Error updating streak:", updateError);
  }
}
