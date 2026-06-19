import { publicFetch } from "../core/server";

export const getLawyerByLawyerId = async (lawyerId) => {
  return await publicFetch(`/api/lawyers/${lawyerId}`);
};

export const getAllLawyers = async () => {
  return await publicFetch(`/api/lawyers`);
};
