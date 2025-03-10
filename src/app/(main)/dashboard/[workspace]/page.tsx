import React from "react";
import { createClient } from "@/utils/supabase/server";
import db from "@/lib/supabase/db";
import { redirect } from "next/navigation";

export default async function WorkspacePage({
  params,
}: {
  params: { workspaceId: string };
}) {
  return <h1>WorkSpace</h1>;
}
