"use server";

import { postServerMutation } from "../core/server";

export const postHiringApplication = async (data) => {
  return postServerMutation(`/api/applications`, data);
};
