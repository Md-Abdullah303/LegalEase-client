import { publicFetch } from "../core/server";

export const getIsPaid = async (userId, lawyerId) => {
  return await publicFetch(
    `/api/singleData/payment?userId=${userId}&lawyerId=${lawyerId}`,
  );
};
