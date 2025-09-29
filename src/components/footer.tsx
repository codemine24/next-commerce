import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import { FacebookIcon } from "@/icons/facebook";
import { Google } from "@/icons/google";
import { InstagramIcon } from "@/icons/instagram";
import { Twitter } from "@/icons/twitter";
import { YoutubeIcon } from "@/icons/youtube";

import { BoxContainer } from "./box-container";
import { LogoWhite } from "./logo-white";

const aboutLinks = [
  { label: "Careers", href: "#" },
  { label: "Our Stores", href: "#" },
  { label: "Our Cares", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const customerCareLinks = [
  { label: "Help Center", href: "#" },
  { label: "How to Buy", href: "#" },
  { label: "Track Your Order", href: "#" },
  { label: "Corporate & Bulk Purchasing", href: "#" },
  { label: "Returns & Refunds", href: "#" },
];

const paymentLinks = [
  { label: "Visa", href: "/images/visa.svg" },
  { label: "Amex", href: "/images/Amex.svg" },
  { label: "Mastercard", href: "/images/mastercard.svg" },
  { label: "PayPal", href: "/images/PayPal.svg" },
  { label: "GooglePay", href: "/images/GooglePay.svg" },
];

const contactInfo = [
  { label: "Bashundhara R/A", href: "#" },
  { label: "Dhaka, Bangladesh.", href: "#" },
  { label: "Email: info@logo.com", href: "mailto:info@logo.com" },
  { label: "Phone: +880 1123 456 780", href: "tel:+8801123456780" },
];

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "primary.dark", color: "white", py: 6 }}>
      <BoxContainer>
        <Grid container spacing={4}>
          {/* Logo & Description */}
          <Grid size={{ xs: 12, md: 3 }}>
            <LogoWhite />
            <Typography variant="body2" sx={{ my: 2, lineHeight: "30px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
              libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat
              et lectus vel ut sollicitudin elit at amet.
            </Typography>
            {/* payment methods */}
            <Stack direction="row" spacing={1}>
              {paymentLinks.map((link) => (
                <Image
                  title={link.label}
                  key={link.label}
                  src={link.href}
                  alt={link.label}
                  width={40}
                  height={40}
                />
              ))}
            </Stack>
          </Grid>

          {/* About Us */}
          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              About Us
            </Typography>
            <Stack spacing={1}>
              {aboutLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  underline="none"
                  color="grey.500"
                  sx={{
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "common.white",
                    },
                  }}
                >
                  <Typography variant="body2">{link.label}</Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Customer Care */}
          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Customer Care
            </Typography>
            <Stack spacing={1}>
              {customerCareLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  underline="none"
                  color="grey.500"
                  sx={{
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "common.white",
                    },
                  }}
                >
                  <Typography variant="body2">{link.label}</Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact Us */}
          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Contact Us
            </Typography>
            {/* contact info */}
            <Stack spacing={1}>
              {contactInfo.map((info) => (
                <Link
                  key={info.label}
                  href={info.href}
                  underline="none"
                  color="grey.500"
                >
                  <Typography variant="body2">{info.label}</Typography>
                </Link>
              ))}
            </Stack>
            <Stack direction="row" spacing={1} mt={1}>
              <FacebookIcon
                sx={{
                  color: "common.white",
                  bgcolor: "#08996B",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  p: "7px",
                }}
              />
              <Twitter
                sx={{
                  color: "common.white",
                  bgcolor: "#08996B",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  padding: "7px",
                }}
              />
              <InstagramIcon
                sx={{
                  color: "common.white",
                  bgcolor: "#08996B",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  padding: "7px",
                }}
              />
              <YoutubeIcon
                sx={{
                  color: "common.white",
                  bgcolor: "#08996B",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  padding: "7px",
                }}
              />
              <Google
                sx={{
                  color: "common.white",
                  bgcolor: "#08996B",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  padding: "7px",
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </BoxContainer>
    </Box>
  );
}
