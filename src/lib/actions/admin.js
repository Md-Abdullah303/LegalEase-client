"use server";

import { redirect } from "next/navigation";
import { deleteServerMutation, ServerMutation } from "../core/server";

export const editAdminData = async (id, data) => {
  return await ServerMutation(`/api/admin/${id}`, data);
};
export const editUsersRole = async (id, data) => {
  return await ServerMutation(`/api/changUserRole/${id}`, data);
};
export const memberDltByMemberId = async (id) => {
  return await deleteServerMutation(`/api/changUserRole/${id}`);
};
