import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export const TableToolbarSkeleton = () => {
    return (
        <Box
            p={2}
            gap={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
        >
            <Skeleton variant="rectangular" width={240} height={40} />
            <Box display="flex" gap={2} alignItems="center">
                <Skeleton variant="rectangular" width={130} height={40} />
                <Skeleton variant="rectangular" width={130} height={40} />
                <Skeleton variant="rectangular" width={200} height={40} />
            </Box>
        </Box>
    );
};