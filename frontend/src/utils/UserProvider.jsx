import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { updateUserStreak } from "../lib/streak"; // ⬅️ import your helper if needed

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const { data, error: authError } = await supabase.auth.getUser();
        if (authError) {
          console.error("Error fetching authenticated user:", authError);
          setIsLoading(false);
          return;
        }

        const user = data?.user;
        if (!user) {
          console.warn("No authenticated user found.");
          setIsLoading(false);
          return;
        }

        setLoggedUser(user);

        const { data: profileData, error: profileError } = await supabase
          .from("profile")
          .select("*")
          .eq("user_id", user.id)
          .single();

        try {
          await updateUserStreak(user.id);
        } catch (streakErr) {
          console.warn("Failed to update streak:", streakErr.message);
        }

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          setIsLoading(false);
          return;
        }

        setUserProfile(profileData);
      } catch (err) {
        console.error("Unexpected error in handleAuth:", err);
      } finally {
        setIsLoading(false);
      }
    };

    handleAuth();

    // ✅ Listen for auth changes (login/logout)
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!session?.user) {
          setLoggedUser(null);
          setUserProfile(null);
          return;
        }
        // re-run handleAuth when auth state changes
        handleAuth();
      }
    );

    // ✅ Cleanup subscription when component unmounts
    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ loggedUser, userProfile, isLoading, setUserProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

// ✅ Custom hook for easy use in components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
