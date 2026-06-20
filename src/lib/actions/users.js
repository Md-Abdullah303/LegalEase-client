"use server";

import { ServerMutation } from "../core/server";

export const updatedUserData = async (id, userData) => {
  console.log("from updated func: ", id);
  return await ServerMutation(`/api/users/${id}`, userData);
};
