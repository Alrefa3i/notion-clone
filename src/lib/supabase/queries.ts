"use server";
import { Folder, Subscription, workspace } from "./database.types";
import {
  workspace as workspaces,
  files,
  folders,
  users,
} from "../../../migrations/schema";
import db from "./db";
import { validate } from "uuid";
import { and, eq, notExists } from "drizzle-orm";
import { collaborators } from "./schema";
export const getUserSubscriptionStatus = async (userId: string) => {
  try {
    const data = await db.query.subscriptions.findFirst({
      where: (subscriptions, { eq }) => eq(subscriptions.userId, userId),
    });
    if (data) {
      console.log(data);
      return { data: data as Subscription, error: null };
    } else {
      return { data: null, error: null };
    }
  } catch (error) {
    return { data: null, error: `Error: ${error}` };
  }
};

export const createWorkspace = async (workspace: workspace) => {
  try {
    const response = await db.insert(workspaces).values(workspace);
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};

export const getFolders = async (workspaceId: string) => {
  const isValid = validate(workspaceId);
  if (!isValid) return { data: null, error: "Error" };
  try {
    const results = (await db
      .select()
      .from(folders)
      .orderBy(folders.createdAt)
      .where(eq(folders.workspaceId, workspaceId))) as Folder[] | [];
    return { data: results, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};

export const getFiles = async (folderId: string) => {
  const isValid = validate(folderId);
  if (!isValid) return { data: null, error: "Error" };
  try {
    const results = (await db
      .select()
      .from(files)
      .orderBy(files.createdAt)
      .where(eq(files.folderId, folderId))) as File[] | [];
    return { data: results, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};

export const getPrivateWorkspaces = async (userId: string) => {
  if (!userId) return [];

  const priveteWorkspaces = (await db
    .select({
      id: workspaces.id,
      title: workspaces.title,
      workspaceOwner: workspaces.workspaceOwner,
      data: workspaces.data,
      inTrash: workspaces.inTrash,
      logo: workspaces.logo,
      iconId: workspaces.iconId,
      createdAt: workspaces.createdAt,
    })
    .from(workspaces)
    .where(
      and(
        notExists(
          db
            .select()
            .from(collaborators)
            .where(eq(collaborators.workspaceId, workspaces.id))
        ),
        eq(workspaces.workspaceOwner, userId)
      )
    )) as workspace[];
  return priveteWorkspaces;
};

export const getCollaboratingWorkspaces = async (userId: string) => {
  if (!userId) return [];

  const collaboratedWorkspaces = (await db
    .select({
      id: workspaces.id,
      title: workspaces.title,
      workspaceOwner: workspaces.workspaceOwner,
      data: workspaces.data,
      inTrash: workspaces.inTrash,
      logo: workspaces.logo,
      iconId: workspaces.iconId,
      createdAt: workspaces.createdAt,
    })
    .from(users)
    .innerJoin(collaborators, eq(users.id, collaborators.userId))
    .innerJoin(workspaces, eq(workspaces.id, collaborators.workspaceId))
    .where(eq(users.id, userId))) as workspace[];
  return collaboratedWorkspaces;
};

export const getSharedWorkspaces = async (userId: string) => {
  if (!userId) return [];

  const sharedWorkspaces = (await db
    .selectDistinct({
      id: workspaces.id,
      title: workspaces.title,
      workspaceOwner: workspaces.workspaceOwner,
      data: workspaces.data,
      inTrash: workspaces.inTrash,
      logo: workspaces.logo,
      iconId: workspaces.iconId,
      createdAt: workspaces.createdAt,
    })
    .from(workspaces)
    .orderBy(workspaces.createdAt)
    .innerJoin(collaborators, eq(workspaces.id, collaborators.workspaceId))
    .where(eq(collaborators.userId, userId))) as workspace[];
  return sharedWorkspaces;
};
