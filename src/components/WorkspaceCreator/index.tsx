"use client";
import { useSupabaseUser } from "@/lib/provider/supabase-user-provider";
import { User } from "@/lib/supabase/database.types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../ui/select";
import { Lock, Share2 } from "lucide-react";
import { Button } from "../ui/button";

const WorkspaceCreator = () => {
  const { user } = useSupabaseUser();
  const router = useRouter();
  const [permission, setPermission] = useState<string>("private");
  const [title, setTitle] = useState<string>("");
  const [Collaborators, setCollaborators] = useState<User[]>([]);

  const [logo, setLogo] = useState<File | null>(null);
  const addCollaborator = (user: User) => {
    setCollaborators([...Collaborators, user]);
  };
  const removeCollaborator = (user: User) => {
    setCollaborators(Collaborators.filter((u) => u.id !== user.id));
  };

  return (
    <div className="flex gap-4 flex-col w-full">
      <div className="w-full">
        <Label className="text-sm text-muted-foreground" htmlFor="title">
          Workspace Name
        </Label>
        <div className="flex gap-2 items-center justify-center">
          <Input
            type="text"
            placeholder="Workspace Name"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full">
        <Label htmlFor="permission" className="text-sm text-muted-foreground">
          Permission
        </Label>
        <Select
          onValueChange={(value) => setPermission(value)}
          defaultValue={permission}
        >
          <SelectTrigger className="w-full  -mt-2">
            <SelectValue placeholder="Select a permission" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="private">
                <div className="p-2 flex gap-4 justify-center items-center">
                  <Lock /> Private
                </div>
              </SelectItem>
              <SelectItem value="shared">
                <div className="p-2 flex gap-4 justify-center items-center">
                  <Share2 /> Shared
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {permission === "shared" && (
        <div className="w-full">
          <Label
            htmlFor="collaborators"
            className="text-sm text-muted-foreground"
          >
            Collaborators
          </Label>
        </div>
      )}
      <Button variant={"default"} type="button">
        Create Workspace
      </Button>
    </div>
  );
};

export default WorkspaceCreator;
