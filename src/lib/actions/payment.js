"use server";

import { postServerMutation } from "../core/server";

export const createPayment = async (data) => {
  return await postServerMutation(`/api/payment`, data);
};
