"use server";

const baseUrl = process.env.NEXT_SERVER_URL;
console.log(baseUrl);

export const updateLawyerByLawyerId = async (lawyerId, updatedData) => {
  //   console.log("chack values : ", lawyerId, updatedData, baseUrl);

  const res = await fetch(`${baseUrl}/api/lawyers/${lawyerId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  console.log(res);
  return res.json();
};
