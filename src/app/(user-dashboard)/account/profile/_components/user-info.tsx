import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const UserInfo = () => {
    return (
        <Box
            display="flex"
            flexWrap="wrap"
            flexDirection={{ md: "row", xs: "column" }}
            alignItems={{ md: "center", xs: "flex-start" }}
            justifyContent={{ md: "space-between", xs: "flex-start" }}
        >
            <TableRowItem title="Orders" value="12" />
            <TableRowItem title="Wishlist" value="02" />
            <TableRowItem title="Addresses" value="01" />
            <TableRowItem title="Payment Awaiting" value="05" />
            <TableRowItem title="Payment Completed" value="10" />
            <TableRowItem title="Delivery Completed" value="02" />
        </Box>
    );
}

const TableRowItem = ({ title, value }: { title: string; value: string }) => {
    return (
        <Box p={1}>
            <Typography variant="h2" fontWeight={600} mb={1}>
                {value}
            </Typography>

            <Typography variant="body2" fontSize={12} color="text.secondary">
                {title}
            </Typography>
        </Box>
    );
}