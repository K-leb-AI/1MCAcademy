import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { updateUserStreak } from "../lib/streak";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false); // Add this

  useEffect(() => {
    const handleAuth = async (user) => {
      try {
        if (!user) {
          setLoggedUser(null);
          setUserProfile(null);
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
          return;
        }

        setUserProfile(profileData);
      } catch (err) {
        console.error("Unexpected error in handleAuth:", err);
      }
    };

    // Initial auth check
    const checkInitialAuth = async () => {
      try {
        const { data, error: authError } = await supabase.auth.getUser();
        if (authError) {
          console.error("Error fetching authenticated user:", authError);
        }

        const user = data?.user;
        await handleAuth(user);
      } catch (err) {
        console.error("Unexpected error in checkInitialAuth:", err);
      } finally {
        setIsInitialized(true); // Mark as initialized ONLY after first check
        setIsLoading(false);
      }
    };

    checkInitialAuth();

    // Listen for auth changes (login/logout)
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Only update if already initialized (skip the initial event)
        if (isInitialized) {
          await handleAuth(session?.user);
        }
      }
    );

    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, [isInitialized]);

  return (
    <UserContext.Provider
      value={{ loggedUser, userProfile, isLoading, setUserProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
