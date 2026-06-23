import { publicFetch } from "../core/server";

export const getIsPaid = async (userId, lawyerId) => {
  return await publicFetch(
    `/api/singleData/payment?userId=${userId}&lawyerId=${lawyerId}`,
  );
};

export const getTotalPay = async (userId) => {
  return await publicFetch(`/api/multiple/payment?userId=${userId}`);
};
