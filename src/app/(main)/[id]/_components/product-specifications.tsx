import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { ProductSectionHeader } from "./product-section-header"

const data = [
    {
        heading: "General",
        fields: [
            { title: "Brand", value: "Redragon" },
            { title: "Model", value: "59S5" },
            { title: "Type", value: "RGB Speaker" },
            { title: "Color", value: "Black" },
            { title: "Warranty", value: "1 Year" },
        ]
    },
]

type SpecItem = { title: string; value: string }
type SpecSection = { fields: SpecItem[]; heading: string }

export const ProductSpecification = () => {
    return (
        <Box id="#product-specifications">
            <ProductSectionHeader title="Specifications" />
            <TableContainer component={Box} sx={{ overflowX: "auto" }}>
                <Table aria-label="product specifications" sx={{ minWidth: 360 }}>
                    <TableBody>
                        {data.map((section, sIdx) => (
                            <Section key={section.heading + sIdx} section={section} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

const Section = ({ section }: { section: SpecSection }) => {
    return (
        <>
            <TableRow>
                <TableCell
                    colSpan={2}
                    sx={{
                        bgcolor: 'primary.50',
                        py: 1.25,
                    }}
                >
                    <Typography
                        component="h3"
                        variant="subtitle2"
                        sx={{
                            fontWeight: 700,
                            color: "primary.main"
                        }}
                    >
                        {section.heading}
                    </Typography>
                </TableCell>
            </TableRow>

            {section.fields.map((item, idx) => (
                <TableRow key={item.title + idx}>
                    <TableCell
                        component="th"
                        scope="row"
                        sx={{
                            width: { xs: "45%", sm: "40%" },
                            fontWeight: 600,
                            bgcolor: "background.paper",
                            color: "text.secondary",
                            py: 1.25,
                            fontSize: 15,
                            whiteSpace: "nowrap",
                        }}
                    >
                        {item.title}
                    </TableCell>
                    <TableCell
                        sx={{
                            bgcolor: "background.paper",
                            py: 1.25,
                            fontSize: 15,
                            fontWeight: 500,
                        }}
                    >
                        {item.value}
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}