import { publicFetch } from "../core/server";

export const getAdminData = async (id) => {
  return await publicFetch(`/api/admin/${id}`);
};

export const getAllAdminData = async () => {
  return await publicFetch(`/api/allUsers?role=admin`);
};

export const getAllUsersData = async () => {
  return await publicFetch(`/api/allUsers?role=user`);
};

export const getAllLawyersData = async () => {
  return await publicFetch(`/api/allUsers?role=lawyer`);
};

export const getApprovedData = async () => {
  return await publicFetch(`/api/allUsers?role=lawyer&status=true`);
};

export const getHiresData = async () => {
  return await publicFetch(`/api/hires?status=true`);
};

export const getAllMembers = async () => {
  return await publicFetch(`/api/allUsers`);
};

export const getTopCategories = async () => {
  return await publicFetch(`/api/topcategories`);
};
