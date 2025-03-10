"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthUser } from "@supabase/supabase-js";
import { Subscription } from "../supabase/database.types";
import { createClient } from "@/utils/supabase/client";
import { getUserSubscriptionStatus } from "../supabase/queries";
import { toast } from "sonner";

type supabaseUserContextType = {
  user: AuthUser | null;
  subscription: Subscription | null;
};

const SupabaseUserContext = createContext<supabaseUserContextType>({
  user: null,
  subscription: null,
});

interface SupabaseUserProviderProps {
  children: React.ReactNode;
}

export const SupabaseUserProvider: React.FC<SupabaseUserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        console.log("user_ai");
        const { data, error: err } = await getUserSubscriptionStatus(user.id);
        if (data) {
          setSubscription(data);
        }
        if (err) {
          toast("Error! Could not get your subscription status", {
            className: "bg-red-500",
          });
          console.log(err);
        }
      }
    };
    getUser();
  }, [supabase]);

  return (
    <SupabaseUserContext.Provider value={{ user, subscription }}>
      {children}
    </SupabaseUserContext.Provider>
  );
};

export const useSupabaseUser = () => {
  const context = useContext(SupabaseUserContext);
  if (!context) {
    throw new Error(
      "useSupabaseUser must be used within a SupabaseUserProvider"
    );
  }
  return context;
};
