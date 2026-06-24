import { privateFetch, publicFetch } from "../core/server";

export const getIsPaid = async (userId, lawyerId) => {
  return await privateFetch(
    `/api/singleData/payment?userId=${userId}&lawyerId=${lawyerId}`,
  );
};

export const getTotalPayForUser = async (userId) => {
  return await privateFetch(`/api/multiple/payment?userId=${userId}`);
};
export const getAllPayments = async () => {
  return await privateFetch(`/api/multiple/payment`);
};
