"use server";

import {
  deleteServerMutation,
  postServerMutation,
  ServerMutation,
} from "../core/server";

export const createComment = async (data) => {
  return await postServerMutation(`/api/comments`, data);
};

export const updateCommentByUserAndByLawyerId = async (
  userId,
  lawyerId,
  data,
) => {
  return await ServerMutation(
    `/api/comment?userId=${userId}&lawyerId=${lawyerId}`,
    data,
  );
};

export const deleteCommentByUserAndByLawyerId = async (userId, lawyerId) => {
  return await deleteServerMutation(
    `/api/comment?userId=${userId}&lawyerId=${lawyerId}`,
  );
};
