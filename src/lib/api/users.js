import { privateFetch, publicFetch } from "../core/server";

export const getUserHiringHistory = async (userId) => {
  return await privateFetch(`/api/applications?userId=${userId}`);
};

export const getUserProfile = async (userId) => {
  return await privateFetch(`/api/users?userId=${userId}`);
};
