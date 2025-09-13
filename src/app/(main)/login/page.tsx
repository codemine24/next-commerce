import React from "react";

import { BoxContainer } from "@/components/box-container";

import { LoginFormContainer } from "./_components/login-form-container";

const LoginPage = () => {
  return (
    <div>
      <BoxContainer sx={{ mt: 10 }}>
        <LoginFormContainer />
      </BoxContainer>
    </div>
  );
};

export default LoginPage;
