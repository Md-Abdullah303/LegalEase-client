import { privateFetch, publicFetch } from "../core/server";

export const getLawyerByLawyerId = async (lawyerId) => {
  // console.log(lawyerId);
  return await privateFetch(`/api/lawyers/${lawyerId}`);
};

export const getAllLawyers = async (query) => {
  return await publicFetch(`/api/lawyers${query}`);
};
