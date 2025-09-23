import Typography from "@mui/material/Typography";

export const ProductSectionHeader = ({ title }: { title: string }) => {
  return (
    <Typography
      variant="h2"
      component="h2"
      color="#222625"
      fontWeight={400}
      gutterBottom
    >
      {title}
    </Typography>
  );
};
