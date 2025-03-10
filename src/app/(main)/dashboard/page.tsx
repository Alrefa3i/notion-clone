import React from "react";
import { createClient } from "@/utils/supabase/server";
import db from "@/lib/supabase/db";
import { redirect } from "next/navigation";
import DashboardSetup from "@/components/DashboardSetup";
import { getUserSubscriptionStatus } from "@/lib/supabase/queries";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return;
  }
  const workspaces = await db.query.workspace.findFirst({
    where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
  });
  console.log(user.id);
  const { data: subscription, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);
  if (subscriptionError) {
    console.log(subscriptionError);
    return;
  }
  if (!workspaces) {
    return (
      <div className="bg-background h-screen w-screen flex justify-center items-center">
        <DashboardSetup user={user} subscription={subscription} />
      </div>
    );
  }

  redirect(`/dashboard/${workspaces.id}`);
}
