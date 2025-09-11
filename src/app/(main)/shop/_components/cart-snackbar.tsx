"use client";

import { useEffect, useState } from "react";
import Snackbar, { snackbarClasses } from "@mui/material/Snackbar";
import { Typography } from "@mui/material";
// import { useCart } from "@/providers/cart-provider";

export const CartSnackbar = () => {
  // const { openSnackbar, closeSnackbar } = useCart();
  // const [delayedOpen, setDelayedOpen] = useState(false);

  // useEffect(() => {
  //   let timer: NodeJS.Timeout;
  //   if (openSnackbar) {
  //     timer = setTimeout(() => {
  //       setDelayedOpen(true);
  //     }, 600);
  //   } else {
  //     setDelayedOpen(false);
  //   }

  //   return () => clearTimeout(timer);
  // }, [openSnackbar]);

  return (
    // <Snackbar
    //   open={delayedOpen}
    //   autoHideDuration={2000}
    //   onClose={closeSnackbar}
    //   anchorOrigin={{ vertical: "top", horizontal: "center" }}
    //   message="Product added to cart"
    // />

    <Typography>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
      perspiciatis.
    </Typography>
  );
};
