import React from "react";
import Navbar from "./Navbar";
import { getUserSession } from "@/lib/core/session";

const Navbar2 = async () => {
  const userData = await getUserSession();

  //   console.log(userData);
  return (
    <div>
      <Navbar userData={userData} />
    </div>
  );
};

export default Navbar2;
