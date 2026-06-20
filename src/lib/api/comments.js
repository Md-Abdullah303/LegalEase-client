import { publicFetch } from "../core/server";

export const getCommentsByLawyerId = async (lawyer) => {
  return await publicFetch(`/api/comments?lawyerId=${lawyer}`);
};

export const getUserCommentByUserid = async (userId) => {
  return await publicFetch(`/api/comments?userId=${userId}`);
};
