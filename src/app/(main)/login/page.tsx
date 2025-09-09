import { BoxContainer } from "@/components/box-container";
import React from "react";
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
