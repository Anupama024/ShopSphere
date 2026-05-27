import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const GlobalFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, rgba(45, 24, 16, 0.85) 0%, rgba(60, 35, 25, 0.85) 100%)',
        backdropFilter: 'blur(10px)',
        color: '#fff',
        py: 6,
        mt: 8,
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <Container maxWidth="lg">
        {/* Features Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LocalShippingIcon sx={{ fontSize: 40, color: '#ffc107' }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Free Shipping
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Free shipping for order above ₹180
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CreditCardIcon sx={{ fontSize: 40, color: '#ffc107' }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Flexible Payment
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Multiple secure payment options
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <SupportAgentIcon sx={{ fontSize: 40, color: '#ffc107' }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  24/7 Support
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  We support online all day, every day
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Main Footer Content */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Brand Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: '1.5rem',
                letterSpacing: '0.5px',
              }}
            >
              👔 Clothing.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                mb: 2,
                lineHeight: 1.6,
              }}
            >
              Your destination for premium fashion trends. From casual wear to formal attire, discover the perfect style for every occasion.
            </Typography>
            {/* Social Media Links */}
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <IconButton
                href="#"
                size="small"
                sx={{
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  '&:hover': { background: 'rgba(255, 193, 7, 0.1)', borderColor: '#ffc107' },
                }}
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton
                href="#"
                size="small"
                sx={{
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  '&:hover': { background: 'rgba(255, 193, 7, 0.1)', borderColor: '#ffc107' },
                }}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton
                href="#"
                size="small"
                sx={{
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  '&:hover': { background: 'rgba(255, 193, 7, 0.1)', borderColor: '#ffc107' },
                }}
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton
                href="#"
                size="small"
                sx={{
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  '&:hover': { background: 'rgba(255, 193, 7, 0.1)', borderColor: '#ffc107' },
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Company Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: '#ffc107',
              }}
            >
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" underline="none" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', '&:hover': { color: '#ffc107' } }}>
                About Us
              </Link>
              <Link href="#" underline="none" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', '&:hover': { color: '#ffc107' } }}>
                Blog
              </Link>
              <Link href="#" underline="none" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', '&:hover': { color: '#ffc107' } }}>
                Contact Us
              </Link>
              <Link href="#" underline="none" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', '&:hover': { color: '#ffc107' } }}>
                Career
              </Link>
            </Box>
          </Grid>

          {/* Customer Services */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: '#ffc107',
              }}
            >
              Customer Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" underline="none" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', '&:hover': { color: '#ffc107' } }}>
                My Account
              </Link>
              <Link href="#" underline="none" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', '&:hover': { color: '#ffc107' } }}>
                Track Your Order
              </Link>
              <Link href="#" underline="none" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', '&:hover': { color: '#ffc107' } }}>
                FAQ
              </Link>
            </Box>
          </Grid>

          {/* Our Information */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: '#ffc107',
              }}
            >
              Our Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" underline="none" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', '&:hover': { color: '#ffc107' } }}>
                Privacy Policy
              </Link>
              <Link href="#" underline="none" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', '&:hover': { color: '#ffc107' } }}>
                User Terms & Condition
              </Link>
              <Link href="#" underline="none" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', '&:hover': { color: '#ffc107' } }}>
                Return Policy
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: '#ffc107',
              }}
            >
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                <strong>Phone:</strong> +91 93-448-799
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                <strong>Email:</strong> example@gmail.com
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                <strong>Address:</strong> 123 Fashion Street, Highwood, Illinois 60040
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Footer */}
        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            pt: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            © 2026 Clothing. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="#" underline="none" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem', '&:hover': { color: '#ffc107' } }}>
              Terms & Conditions
            </Link>
            <Link href="#" underline="none" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem', '&:hover': { color: '#ffc107' } }}>
              Privacy Policy
            </Link>
            <Link href="#" underline="none" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem', '&:hover': { color: '#ffc107' } }}>
              Accessibility
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default GlobalFooter;
