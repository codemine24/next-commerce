import { Box } from "@mui/material";
import React from "react";

import { getAllQnas } from "@/actions/qna";

import QnaTable from "../qna-table";



const QnaContent = async () => {
  const response = await getAllQnas();

  console.log("All questions", response);


  return (
    <>
      <Box>
        {response.success && <QnaTable questions={response.data} />}
      </Box>
    </>
  );
};

export default QnaContent;