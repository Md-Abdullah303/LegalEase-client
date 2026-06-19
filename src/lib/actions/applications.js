"use server";

import { postServerMutation } from "../core/server";

export const postHiringApplication = async (data) => {
  return postServerMutation(`/api/applications`, data);
};

export const changeApplicationsStatus = async (id, data) => {
  return postServerMutation(`/api/applications/${id}`, data, "PATCH");
};
