"use client";
import { workspace } from "@/lib/supabase/database.types";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface SelectedWorkspaceProps {
  workspace: workspace;
  onClick?: (option: workspace) => void;
}

const SelectedWorkspace: React.FC<SelectedWorkspaceProps> = ({
  workspace,
  onClick,
}: SelectedWorkspaceProps) => {
  const supabase = createClient();
  const [workspaceLogo, setWorkspaceLogo] =
    useState<string>("/cypresslogo.svg");

  useEffect(() => {
    if (workspace.logo) {
      const path = supabase.storage
        .from("workspace-logos")
        .getPublicUrl(workspace.logo).data.publicUrl;
      setWorkspaceLogo(path);
    }
  }, [workspace]);

  return (
    <Link
      href={`/dashboard/${workspace.id}`}
      className="flex items-center cursor-pointer rounded-md hover:bg-muted transition-all flex-row p-2 gap-4 justify-center"
      onClick={() => {
        if (onClick) onClick(workspace);
      }}
    >
      <Image
        src={workspaceLogo}
        alt="Workspace Logo"
        width={26}
        height={26}
        objectFit="cover"
      />
      <div className="flex flex-col">
        <p className="text-lg w-[170px] overflow-hidden whitespace-nowrap overflow-ellipsis">
          {workspace.title}
        </p>
      </div>
    </Link>
  );
};

export default SelectedWorkspace;
