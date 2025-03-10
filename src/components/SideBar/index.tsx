import React from "react";
import { createClient } from "@/utils/supabase/server";
import {
  getCollaboratingWorkspaces,
  getFolders,
  getPrivateWorkspaces,
  getSharedWorkspaces,
  getUserSubscriptionStatus,
} from "@/lib/supabase/queries";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import WorkspaceDropdown from "./WorkspaceDropdown";
interface SideBarProps {
  params: { workspaceId: string };
  className?: string;
}

const SideBar: React.FC<SideBarProps> = async ({
  params,
  className,
}: SideBarProps) => {
  const supabase = await createClient();

  // user
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) {
    return;
  }

  // subscr
  const { data: subscription, error: subscriptionError } =
    await getUserSubscriptionStatus(user.user.id);
  // folders
  const { data: folders, error: foldersError } = await getFolders(
    params.workspaceId
  );

  // error
  // if (foldersError || subscriptionError) {
  //   console.log(foldersError);
  //   return redirect("/dashboard");
  // }

  const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
    await Promise.all([
      getPrivateWorkspaces(user.user.id),
      getCollaboratingWorkspaces(user.user.id),
      getSharedWorkspaces(user.user.id),
    ]);

  //get all the different workspaces private collaborating shared
  return (
    <aside
      className={twMerge(
        "hidden sm:flex sm:flex-col w-[280px] shrink-0 p-4 md:gap-4 !justify-between",
        className
      )}
    >
      <div>
        <WorkspaceDropdown
          sharedWorkspaces={sharedWorkspaces}
          collaboratingWorkspaces={collaboratingWorkspaces}
          privateWorkspaces={privateWorkspaces}
          defaultWorkspace={[
            ...privateWorkspaces,
            ...sharedWorkspaces,
            ...collaboratingWorkspaces,
          ].find((workspace) => workspace.id === params.workspaceId)}
        />
      </div>
    </aside>
  );
};

export default SideBar;
