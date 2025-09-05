import { BoxContainer } from "@/components/layout/box-container";
import React from "react";
import Signup from "./_components/Signup";

const SignupPage = () => {
  return (
    <BoxContainer sx={{ mt: 10 }}>
      <Signup />
    </BoxContainer>
  );
};

export default SignupPage;
