const baseUrl = process.env.NEXT_SERVER_URL;

export const publicFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  return res.json() || null;
};
