"use client";

import { Box } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";

import { ProductSectionHeader } from "../../[slug]/_components/product-section-header";

import { detailsData } from "./details-data";

const Details = () => {
  const sanitizedDescription = DOMPurify.sanitize(
    detailsData.description || ""
  );

  return (
    <>
      <ProductSectionHeader title="Details" />
      <Box dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
    </>
  );
};

export default Details;
