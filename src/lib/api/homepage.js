import { publicFetch } from "../core/server";

export const getLatestLawyers = async () => {
  return await publicFetch(`/api/feature?role=lawyer`);
};
export const getTopLawyers = async () => {
  return await publicFetch(`/api/feature?topHire=yes`);
};
