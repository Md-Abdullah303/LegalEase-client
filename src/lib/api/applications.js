import { publicFetch } from "../core/server";

export const isUserApplied = async (userId, lawyerId) => {
  return await publicFetch(
    `/api/applications?userId=${userId}&lawyerId=${lawyerId}`,
  );
};

export const getLawyerHiringByLawerId = async (lawyerId) => {
  return await publicFetch(`/api/applications?lawyerId=${lawyerId}`);
};
