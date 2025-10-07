import Box from "@mui/material/Box";

import { Attribute } from "@/interfaces/attribute";

import { ProductFilter } from "./product-filter";

const attributes: Attribute[] = [
  {
    id: "3355abcd-0175-4d71-a6b7-4366e18f5e73",
    category_id: "a65b1c3a-8a5b-4cff-88fb-35951943a177",
    name: "Remote control",
    type: "SINGLE",
    attribute_values: [
      {
        id: "",
        title: "Yes",
        position: 0,
      },
      {
        id: "",
        title: "No",
        position: 0,
      },
    ],
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
    attribute_values: [
      {
        id: "",
        title: "LGA 755",
        position: 0,
      },
      {
        id: "",
        title: "LGA 775",
        position: 0,
      },
      {
        id: "",
        title: "LGA 1150",
        position: 0,
      },
      {
        id: "",
        title: "LGA 1151",
        position: 0,
      },
      {
        id: "",
        title: "LGA 1155",
        position: 0,
      },
      {
        id: "",
        title: "LGA 1200",
        position: 0,
      },
      {
        id: "",
        title: "LGA 1700",
        position: 0,
      },
      {
        id: "",
        title: "LGA 1851",
        position: 0,
      },
      {
        id: "",
        title: "LGA 2011-3",
        position: 0,
      },
      {
        id: "",
        title: "LGA 2066",
        position: 0,
      },
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
    attribute_values: [
      {
        id: "",
        title: "Yes",
        position: 0,
      },
      {
        id: "",
        title: "No",
        position: 0,
      },
    ],
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
    attribute_values: [
      {
        id: "",
        title: "wired",
        position: 0,
      },
      {
        id: "",
        title: "wireless",
        position: 0,
      },
      {
        id: "",
        title: "bluetooth wireless",
        position: 0,
      },
      {
        id: "",
        title: "usb",
        position: 0,
      },
      {
        id: "",
        title: "type - c",
        position: 0,
      },
    ],
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
    attribute_values: [
      {
        id: "",
        title: "1-10",
        position: 0,
      },
      {
        id: "",
        title: "11-20",
        position: 0,
      },
      {
        id: "",
        title: "21-30",
        position: 0,
      },
      {
        id: "",
        title: "31-50",
        position: 0,
      },
      {
        id: "",
        title: "51-100",
        position: 0,
      },
      {
        id: "",
        title: "101-150",
        position: 0,
      },
      {
        id: "",
        title: "151-200",
        position: 0,
      },
      {
        id: "",
        title: "201-300",
        position: 0,
      },
      {
        id: "",
        title: "301-400",
        position: 0,
      },
      {
        id: "",
        title: "401-500",
        position: 0,
      },
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
    attribute_values: [
      {
        id: "",
        title: "",
        position: 0,
      },
    ],
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
