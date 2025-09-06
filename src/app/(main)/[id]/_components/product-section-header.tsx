import Typography from "@mui/material/Typography"

export const ProductSectionHeader = ({ title }: { title: string }) => {
    return (
        <Typography variant="h5" fontWeight={600} gutterBottom>
            {title}
        </Typography>
    )
}