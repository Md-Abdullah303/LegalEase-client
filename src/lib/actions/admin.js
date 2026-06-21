"use server";

import { ServerMutation } from "../core/server";

export const editAdminData = async (id, data) => {
  return await ServerMutation(`/api/admin/${id}`, data);
};
