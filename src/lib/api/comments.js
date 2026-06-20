import { publicFetch } from "../core/server";

export const getCommentsByLawyerId = async (lawyer) => {
  return await publicFetch(`/api/comments?lawyerId=${lawyer}`);
};
