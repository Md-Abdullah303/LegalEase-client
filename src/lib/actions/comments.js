"use server";

import { postServerMutation } from "../core/server";

export const createComment = async (data) => {
  return await postServerMutation(`/api/comments`, data);
};
