import { privateFetch, publicFetch } from "../core/server";

export const isUserApplied = async (userId, lawyerId) => {
  return await privateFetch(
    `/api/applications?userId=${userId}&lawyerId=${lawyerId}`,
  );
};

export const getLawyerHiringByLawerId = async (lawyerId) => {
  return await privateFetch(`/api/applications?lawyerId=${lawyerId}`);
};
