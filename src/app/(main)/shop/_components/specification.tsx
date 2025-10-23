"use client";

import { Box } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";

import { ProductSectionHeader } from "../../[slug]/_components/product-section-header";

import { specificationData } from "./specification-data";

const Specification = () => {
  const sanitizedDescription = DOMPurify.sanitize(
    specificationData.description || ""
  );

  return (
    <>
      <ProductSectionHeader title="Specification" />
      <Box dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
    </>
  );
};

export default Specification;
