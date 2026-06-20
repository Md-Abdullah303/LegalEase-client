const baseUrl = process.env.NEXT_SERVER_URL;

export const publicFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  // console.log(res, path, baseUrl);
  // console.log(path);
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
