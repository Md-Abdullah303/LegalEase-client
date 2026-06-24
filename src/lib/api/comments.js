import { privateFetch, publicFetch } from "../core/server";

export const getCommentsByLawyerId = async (lawyer) => {
  return await privateFetch(`/api/comments?lawyerId=${lawyer}`);
};

export const getUserCommentByUserid = async (userId) => {
  return await privateFetch(`/api/comments?userId=${userId}`);
};
