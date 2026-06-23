import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

export type AdminState = {
  loading: boolean;
  session: Session | null;
  isAdmin: boolean;
};

export function useAdmin(): AdminState {
  const [state, setState] = useState<AdminState>({
    loading: true,
    session: null,
    isAdmin: false,
  });

  useEffect(() => {
    let alive = true;

    async function check(session: Session | null) {
      if (!session) {
        if (alive) setState({ loading: false, session: null, isAdmin: false });
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (alive)
        setState({ loading: false, session, isAdmin: Boolean(data) });
    }

    supabase.auth.getSession().then(({ data }) => check(data.session));

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      check(session);
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}
