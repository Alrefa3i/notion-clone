import React from "react";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
const page = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
  return <div>page</div>;
};

export default page;
