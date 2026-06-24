import { privateFetch, publicFetch } from "../core/server";

export const getAdminData = async (id) => {
  return await privateFetch(`/api/admin/${id}`);
};

export const getAllAdminData = async () => {
  return await privateFetch(`/api/allUsers?role=admin`);
};

export const getAllUsersData = async () => {
  return await privateFetch(`/api/allUsers?role=user`);
};

export const getAllLawyersData = async () => {
  return await privateFetch(`/api/allUsers?role=lawyer`);
};

export const getApprovedData = async () => {
  return await privateFetch(`/api/allUsers?role=lawyer&status=true`);
};

export const getHiresData = async () => {
  return await privateFetch(`/api/hires?status=true`);
};

export const getAllMembers = async () => {
  return await privateFetch(`/api/allUsers`);
};

export const getTopCategories = async () => {
  return await privateFetch(`/api/topcategories`);
};
