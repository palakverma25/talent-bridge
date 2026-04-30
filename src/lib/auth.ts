import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { UserRole } from "@/types";

export const requireRole = async (allowedRoles: UserRole[]) => {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { demoMode: true, role: allowedRoles[0] };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = profile?.role as UserRole | undefined;
  if (!role) {
    redirect("/auth/onboarding");
  }

  if (!allowedRoles.includes(role)) {
    redirect(role === "employer" ? "/dashboard/employer" : "/dashboard/candidate");
  }

  return { demoMode: false, role };
};
