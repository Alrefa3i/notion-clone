import React from "react";
import { createClient } from "@/utils/supabase/server";
import Nav from "./Header";

const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return <Nav user={user} />;
};

export default Header;
