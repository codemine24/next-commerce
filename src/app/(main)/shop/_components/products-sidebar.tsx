import Box from "@mui/material/Box";

import { Attribute } from "@/interfaces/attribute";

import { ProductFilter } from "./product-filter";

const attributes: Attribute[] = [
  {
    id: "3355abcd-0175-4d71-a6b7-4366e18f5e73",
    category_id: "a65b1c3a-8a5b-4cff-88fb-35951943a177",
    name: "Remote control",
    type: "SINGLE",
    value: ["Yes", "No"],
    created_at: "2025-08-11T11:03:29.254Z",
    updated_at: "2025-08-11T11:03:29.254Z",
    category: {
      id: "a65b1c3a-8a5b-4cff-88fb-35951943a177",
      title: "Speaker",
    },
  },
  {
    id: "db94fbe9-e964-4139-ba59-e44738ee851f",
    category_id: "c4480d81-c941-4db3-80b3-4d48b873d758",
    name: "CPU Sockets",
    type: "MULTIPLE",
    value: [
      "LGA 755",
      "LGA 775",
      "LGA 1150",
      "LGA 1151",
      "LGA 1155",
      "LGA 1200",
      "LGA 1700",
      "LGA 1851",
      "LGA 2011-3",
      "LGA 2066",
    ],
    created_at: "2025-08-11T07:44:35.379Z",
    updated_at: "2025-08-11T07:44:35.379Z",
    category: {
      id: "c4480d81-c941-4db3-80b3-4d48b873d758",
      title: "Processor",
    },
  },
  {
    id: "07e4f1ac-9ddb-462a-9be5-ad385b0cfeae",
    category_id: "a65b1c3a-8a5b-4cff-88fb-35951943a177",
    name: "Subwoofer",
    type: "SINGLE",
    value: ["yes", "no"],
    created_at: "2025-08-09T04:35:19.886Z",
    updated_at: "2025-08-11T06:59:24.912Z",
    category: {
      id: "a65b1c3a-8a5b-4cff-88fb-35951943a177",
      title: "Speaker",
    },
  },
  {
    id: "c8675e8a-51dd-4fbf-ab94-fad7be569bbc",
    category_id: "a65b1c3a-8a5b-4cff-88fb-35951943a177",
    name: "Interface",
    type: "MULTIPLE",
    value: ["wired", "wireless", "bluetooth wireless", "usb", "type - c"],
    created_at: "2025-08-09T04:34:45.363Z",
    updated_at: "2025-08-09T04:34:45.363Z",
    category: {
      id: "a65b1c3a-8a5b-4cff-88fb-35951943a177",
      title: "Speaker",
    },
  },
  {
    id: "826e4649-0e63-4d96-aee3-8c119053ca65",
    category_id: "a65b1c3a-8a5b-4cff-88fb-35951943a177",
    name: "Watt/RMS",
    type: "MULTIPLE",
    value: [
      "1-10",
      "11-20",
      "21-30",
      "31-50",
      "51-100",
      "101-150",
      "151-200",
      "201-300",
      "301-400",
      "401-500",
    ],
    created_at: "2025-08-05T05:59:48.069Z",
    updated_at: "2025-08-05T05:59:56.655Z",
    category: {
      id: "a65b1c3a-8a5b-4cff-88fb-35951943a177",
      title: "Speaker",
    },
  },
  {
    id: "8e5e20a6-8acb-4513-9e13-4d92320d6487",
    category_id: null,
    name: "Availability",
    type: "MULTIPLE",
    value: ["in stock", "out of stock", "upcoming"],
    created_at: "2025-08-05T05:37:53.063Z",
    updated_at: "2025-08-05T05:37:53.063Z",
    category: null,
  },
];

export const ProductSidebar = async () => {
  return (
    <Box
      width="100%"
      maxWidth={250}
      display={{ xs: "none", lg: "block" }}
      sx={{ border: "1px solid", borderColor: "divider", p: 2, height: "100%" }}
    >
      <ProductFilter attributes={attributes} />
    </Box>
  );
};
