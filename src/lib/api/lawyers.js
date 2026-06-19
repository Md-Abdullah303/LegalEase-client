const baseUrl = process.env.NEXT_SERVER_URL;

export const getLawyerByLawyerId = async (lawyerId) => {
  const res = await fetch(`${baseUrl}/api/lawyers/${lawyerId}`);
  return res.json() || null;
};
