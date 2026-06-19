"use server";

import { ServerMutation } from "../core/server";

export const updateLawyerByLawyerId = async (lawyerId, updatedData) => {
  return await ServerMutation(`/api/lawyers/${lawyerId}`, updatedData);
};
