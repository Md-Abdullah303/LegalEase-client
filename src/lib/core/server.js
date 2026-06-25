import { headers } from "next/headers";
import { auth } from "../auth";

const baseUrl = process.env.NEXT_SERVER_URL;

export const publicFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  return res.json() || null;
};

export const privateFetch = async (path) => {
  const token = await getToken();
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  // console.log(token);
  return res.json() || null;
};

export const ServerMutation = async (path, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(res);

  //TODO

  return res.json();
};

export const postServerMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json() || null;
};

export const deleteServerMutation = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

const getToken = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  return token;
};
