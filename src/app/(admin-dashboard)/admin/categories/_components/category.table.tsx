"use client";

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { OptimizeImage } from '@/components/optimize-image';
import { Pagination } from '@/components/pagination';
import { Meta } from '@/interfaces/api';
import { Category } from '@/interfaces/category';
import { makeImageUrl } from '@/utils/helper';

interface CategoryTableProps {
    categories: Category[];
    meta: Meta
}

export const CategoryTable = ({ categories, meta }: CategoryTableProps) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                            // onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSelectAllClick(event.target.checked)}
                            // checked={selectedRows?.length > 0 && selectedRows?.length === media?.length}
                            />
                        </TableCell>
                        <TableCell>Icon</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell>Featured</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={7} align="center" sx={{ fontWeight: 500 }}>
                                No categories found
                            </TableCell>
                        </TableRow>
                    )}
                    {categories?.length > 0 && categories?.map((category) => (
                        <TableRow
                            hover
                            key={category?.id}
                        // selected={selectedRows.includes(category.icon)}
                        >
                            <TableCell padding="checkbox">
                                <Checkbox
                                // onChange={() => handleSelectRow(media.path)}
                                // checked={selectedRows.includes(media.path)}
                                />
                            </TableCell>
                            <TableCell>
                                <OptimizeImage src={makeImageUrl(category.icon)} alt={category.title} height={50} />
                            </TableCell>
                            <TableCell>{category.title}</TableCell>
                            <TableCell>{category.code}</TableCell>
                            <TableCell>{category.featured}</TableCell>
                            <TableCell>{category.description}</TableCell>
                            <TableCell>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Box p={2} bgcolor="background.default" border={1} borderTop={0} borderColor="divider">
                <Pagination page={meta.page} total={meta.total} limit={meta.limit} />
            </Box>
        </TableContainer>
    )
}