import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

import { FacebookIcon } from '@/icons/facebook';
import { InstagramIcon } from '@/icons/instagram';
import { YoutubeIcon } from '@/icons/youtube';

import { BoxContainer } from './box-container';

const aboutLinks = [
    { label: 'Careers', href: '#' },
    { label: 'Our Stores', href: '#' },
    { label: 'Our Cares', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Privacy Policy', href: '#' },
];

const customerCareLinks = [
    { label: 'Help Center', href: '#' },
    { label: 'How to Buy', href: '#' },
    { label: 'Track Your Order', href: '#' },
    { label: 'Corporate & Bulk Purchasing', href: '#' },
    { label: 'Returns & Refunds', href: '#' },
];

export default function Footer() {
    return (
        <Box sx={{ bgcolor: '#1e1e1e', color: 'white', py: 6 }}>
            <BoxContainer>
                <Grid container spacing={4}>
                    {/* Logo & Description */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            LOGO
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida.
                        </Typography>
                        {/* <Stack direction="row" spacing={1}>
                        <Box component="img" src="/visa.png" alt="Visa" sx={{ width: 40 }} />
                        <Box component="img" src="/bkash.png" alt="Bkash" sx={{ width: 40 }} />
                        <Box component="img" src="/nagad.png" alt="Nagad" sx={{ width: 40 }} />
                        <Box component="img" src="/rocket.png" alt="Rocket" sx={{ width: 40 }} />
                    </Stack> */}
                    </Grid>

                    {/* About Us */}
                    <Grid size={{ xs: 12, sm: 4, md: 2 }}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>About Us</Typography>
                        <Stack spacing={1}>
                            {aboutLinks.map((link) => (
                                <Link key={link.label} href={link.href} underline="none" color="inherit">
                                    {link.label}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Customer Care */}
                    <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>Customer Care</Typography>
                        <Stack spacing={1}>
                            {customerCareLinks.map((link) => (
                                <Link key={link.label} href={link.href} underline="none" color="inherit">
                                    {link.label}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Contact Us */}
                    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>Contact Us</Typography>
                        <Typography variant="body2">Bashundhara R/A</Typography>
                        <Typography variant="body2">Dhaka, Bangladesh.</Typography>
                        <Typography variant="body2">Email: info@logo.com</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>Phone: +880 1123 456 780</Typography>
                        <Stack direction="row" spacing={1}>
                            <FacebookIcon sx={{ color: '#1877f2' }} />
                            <InstagramIcon sx={{ color: '#e1306c' }} />
                            <YoutubeIcon sx={{ color: '#cd201f' }} />
                        </Stack>
                    </Grid>
                </Grid>
            </BoxContainer>
        </Box>
    );
}
