import { publicFetch } from "../core/server";

export const getComments = async () => {
  return await publicFetch(`/api/comments`);
};
