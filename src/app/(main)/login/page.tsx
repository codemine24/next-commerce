import { BoxContainer } from "@/components/layout/box-container";
import React from "react";
import Login from "./_components/Login";

const LoginPage = () => {
  return (
    <div>
      <BoxContainer sx={{ mt: 10 }}>
        <Login />
      </BoxContainer>
    </div>
  );
};

export default LoginPage;
