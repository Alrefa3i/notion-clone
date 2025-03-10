"use client";
import { useAppState } from "@/lib/provider/state-provider";
import { workspace } from "@/lib/supabase/database.types";
import React, { useEffect, useState } from "react";
import SelectedWorkspace from "./SelectedWorkspace";
import CustomDialog from "@/components/CustomsDialog";
import WorkspaceCreator from "@/components/WorkspaceCreator";

interface WorkspaceDropdownProps {
  privateWorkspaces: workspace[];
  sharedWorkspaces: workspace[];
  collaboratingWorkspaces: workspace[];
  defaultWorkspace: workspace | undefined;
}

const WorkspaceDropdown: React.FC<WorkspaceDropdownProps> = ({
  privateWorkspaces,
  sharedWorkspaces,
  collaboratingWorkspaces,
  defaultWorkspace,
}) => {
  const { dispatch, state } = useAppState();
  const [selectedOption, setSelectedOption] = useState<workspace | undefined>(
    defaultWorkspace
  );

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!state.workspaces.length) {
      dispatch({
        type: "SET_WORKSPACES",
        payload: {
          workspaces: [
            ...privateWorkspaces,
            ...sharedWorkspaces,
            ...collaboratingWorkspaces,
          ].map((workspace) => ({ ...workspace, folders: [] })),
        },
      });
    }
  }, [privateWorkspaces, sharedWorkspaces, collaboratingWorkspaces]);

  const handleSelect = (option: workspace) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  //   useEffect(() => {
  //     if (selectedOption) {
  //       dispatch({
  //         type: "UPDATE_WORKSPACE",
  //         payload: {
  //           workspaceId: selectedOption.id,
  //           workspace: selectedOption,
  //         },
  //       });
  //     }
  //   }, [selectedOption]);

  return (
    <div className="relative inline-block text-left w-full">
      <div className="">
        <span onClick={(e) => setIsOpen(!isOpen)}>
          {selectedOption ? (
            <SelectedWorkspace workspace={selectedOption} />
          ) : (
            "Select a Workspace"
          )}
        </span>
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute 
          w-full
          rounded-md
          shadow-md
          z-50
          h-[190px]
          bg-black/10
          backdrop-blur-lg
          group
          overflow-y-visible
          border-[1px]
          border-muted
          "
        >
          <div className="rounded-md flex flex-col ">
            <div className="!p-2">
              {!!privateWorkspaces.length && (
                <>
                  <p className="text-muted-foreground text-sm">Private</p>
                  <hr />
                  {privateWorkspaces.map((option) => (
                    <SelectedWorkspace
                      key={option.id}
                      workspace={option}
                      onClick={() => handleSelect(option)}
                    />
                  ))}
                </>
              )}
              {!!sharedWorkspaces.length && (
                <>
                  <p className="text-muted-foreground text-sm">Shared</p>
                  <hr />
                  {sharedWorkspaces.map((option) => (
                    <SelectedWorkspace
                      key={option.id}
                      workspace={option}
                      onClick={() => handleSelect(option)}
                    />
                  ))}
                </>
              )}
              {!!collaboratingWorkspaces.length && (
                <>
                  <p className="text-muted-foreground text-sm">Collaborating</p>
                  <hr />
                  {collaboratingWorkspaces.map((option) => (
                    <SelectedWorkspace
                      key={option.id}
                      workspace={option}
                      onClick={() => handleSelect(option)}
                    />
                  ))}
                </>
              )}
            </div>
            <CustomDialog
              header="Create a Workspace"
              content={<WorkspaceCreator />}
              description="Create a new workspace to start collaborating with your team."
            >
              <div className="flex transition-all hover:bg-muted justify-center items-center gap-2 p-2 w-full">
                <article className="text-slate-500 rounded-full bg-slate-800 w-4 h-4 flex items-center justify-center">
                  +
                </article>
                Create Workspace
              </div>
            </CustomDialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceDropdown;
