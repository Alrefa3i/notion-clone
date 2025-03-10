"use client";
import React from "react";
import { AuthUser } from "@supabase/supabase-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components//ui/card";
import { toast } from "sonner";
import EmojiPicker from "@/components/EmojiPicker";
import { Label } from "@/components//ui/label";
import { Input } from "@/components//ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateWorkspaceSchema } from "@/lib/types";
import { Subscription, workspace } from "@/lib/supabase/database.types";
import { z } from "zod";
import { v4 } from "uuid";
import { createClient } from "@/utils/supabase/client";
import { createWorkspace } from "@/lib/supabase/queries";
import { useAppState } from "@/lib/provider/state-provider";
import { useRouter } from "next/navigation";

interface DashboardSetupProps {
  user: AuthUser;
  subscription: Subscription | null;
}

const DashboardSetup: React.FC<DashboardSetupProps> = ({
  user,
  subscription,
}) => {
  const [selectedEmoji, setSelectedEmoji] = React.useState<string>("🗈");
  const router = useRouter();
  const { dispatch } = useAppState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isLoading, isSubmitting, errors },
  } = useForm<z.infer<typeof CreateWorkspaceSchema>>({
    mode: "onChange",
    defaultValues: {
      logo: "",
      workspaceName: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof CreateWorkspaceSchema>> = async (
    value
  ) => {
    if (!user) return;
    if (!subscription) return;
    const supabase = await createClient();

    const file = value.logo?.[0];
    let filePath = null;
    const workspaceUUID = v4();
    console.log(file);

    if (file) {
      try {
        const { data, error } = await supabase.storage
          .from("workspace-logos")
          .upload(`workspaceLogo.${workspaceUUID}`, file, {
            cacheControl: "3600",
            upsert: true,
          });
        if (error) throw new Error("");
        filePath = data.path;
      } catch (error) {
        console.log("Error", error);
        toast("Error! Could not upload your workspace logo");
      }
    }
    try {
      const newWorkspace: workspace = {
        data: null,
        createdAt: new Date().toISOString(),
        iconId: selectedEmoji,
        id: workspaceUUID,
        inTrash: "",
        title: value.workspaceName,
        workspaceOwner: user.id,
        logo: filePath || null,
        bannerUrl: "",
      };
      const { data, error: createError } = await createWorkspace(newWorkspace);
      if (createError) {
        throw new Error();
      }
      dispatch({
        type: "ADD_WORKSPACE",
        payload: { ...newWorkspace, folders: [] },
      });

      toast(`${newWorkspace.title} has been created successfully.`);

      router.replace(`/dashboard/${newWorkspace.id}`);
    } catch (error) {
      console.log(error, "Error");
      toast("Error! Could not create your workspace");
    } finally {
      reset();
    }
  };

  return (
    <Card className="w-[800px] rounded-2xl h-screen sm:h-auto shadow-sm relative">
      <CardHeader>
        <CardTitle> Create Your Workspace</CardTitle>
        <CardDescription>
          Lets Create a Private Workspace for your team. You Can add members to
          your workspace and start collaborating.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl">
                <EmojiPicker getValue={(emoji) => setSelectedEmoji(emoji)}>
                  {selectedEmoji}
                </EmojiPicker>
              </div>
              <div className="w-full">
                <Label
                  htmlFor="workspaceName"
                  className="text-sm text-muted-foreground"
                >
                  Workspace Name
                </Label>
                <Input
                  type="text"
                  placeholder="Workspace Name"
                  id="workspaceName"
                  disabled={isLoading || isSubmitting}
                  {...register("workspaceName", {
                    required: "Workspace Name is required",
                  })}
                  className="border border-input bg-transparent rounded-md px-4 py-2"
                />
                <small className="text-red-500">
                  {errors.workspaceName?.message?.toString()}
                </small>
              </div>
            </div>
            <div>
              <Label htmlFor="logo" className="text-sm text-muted-foreground">
                Workspace Logo
              </Label>
              <Input
                type="file"
                placeholder="Workspace Logo"
                accept="image/*"
                id="logo"
                disabled={isLoading || subscription?.status !== "active"}
                {...register("logo", {
                  required: "Workspace Logo is required",
                })}
                className="border border-input bg-transparent rounded-md px-4 py-2"
              />
              <small className="text-red-500">
                {errors.logo?.message?.toString()}
              </small>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DashboardSetup;
