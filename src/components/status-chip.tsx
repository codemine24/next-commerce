import { alpha, Chip } from "@mui/material";

import { AccessTimeIcon } from "@/icons/access-time";
import { CheckCircle } from "@/icons/check-circle";
import { DeleteCircle } from "@/icons/delete-circle";
import { BORDER_RADIUS } from "@/theme";

export interface WishlistProduct {
  id: string | number;
  name: string;
  image: string;
  price: number;
  status: "in-stock" | "out-of-stock" | "upcoming";
}

export const StatusChip: React.FC<{ status: WishlistProduct["status"] }> = ({
  status,
}) => {
  const map = {
    "in-stock": {
      label: "In Stock",
      color: "#007B54",
      border: "#99FFDF",
      icon: <CheckCircle />,
    },
    "out-of-stock": {
      label: "Out of Stock",
      color: "#FF3030",
      border: "#FF3030",
      icon: <DeleteCircle />,
    },
    upcoming: {
      label: "Upcoming",
      color: "#00ADCC",
      border: "#00ADCC",
      icon: <AccessTimeIcon />,
    },
  } as const;

  const { label, color, border, icon } = map[status];

  return (
    <Chip
      icon={icon}
      label={label}
      variant="outlined"
      size="small"
      sx={{
        color,
        bgcolor: alpha(color, 0.1),
        border: `1px solid ${border}`,
        borderRadius: BORDER_RADIUS.default,
        "& .MuiChip-icon": { color },
      }}
    />
  );
};
