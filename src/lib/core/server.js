const baseUrl = process.env.NEXT_SERVER_URL;

export const publicFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
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

export const postServerMutation = async (path, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json() || null;
};
