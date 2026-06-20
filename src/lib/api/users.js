import { publicFetch } from "../core/server";

export const getUserHiringHistory = async (userId) => {
  return await publicFetch(`/api/applications?userId=${userId}`);
};
