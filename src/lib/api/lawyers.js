import { publicFetch } from "../core/server";

export const getLawyerByLawyerId = async (lawyerId) => {
  // console.log(lawyerId);
  return await publicFetch(`/api/lawyers/${lawyerId}`);
};

export const getAllLawyers = async (query) => {
  return await publicFetch(`/api/lawyers${query}`);
};
