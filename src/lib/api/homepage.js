import { publicFetch } from "../core/server";

export const getLatestLawyers = async () => {
  // it's a fully public func
  return await publicFetch(`/api/feature?role=lawyer`);
};
export const getTopLawyers = async () => {
  // it's a fully public func
  return await publicFetch(`/api/feature?topHire=yes`);
};
