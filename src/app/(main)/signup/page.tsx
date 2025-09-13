import React from "react";

import { BoxContainer } from "@/components/box-container";

import { SignupFormContainer } from "./_components/signup-form-container";

const SignupPage = () => {
  return (
    <BoxContainer sx={{ mt: 10 }}>
      <SignupFormContainer />
    </BoxContainer>
  );
};

export default SignupPage;
