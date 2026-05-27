import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { useState, useEffect } from 'react';

/**
 * GlobalProductCard
 * @param {object} props
 * @param {object} props.product - Product object (must have image/src, name, price, company, description)
 * @param {function} [props.onClick] - Card click handler
 * @param {React.ReactNode} [props.children] - Extra actions (e.g. favourite button)
 * @param {object} [props.sx] - Optional style overrides
 */

const GlobalProductCard = ({ product, onClick, children, sx, isFav, onFavouriteToggle }) => {
  // isFav and onFavouriteToggle are now passed from parent (page)
  const handleFavourite = (e) => {
    e.stopPropagation();
    if (onFavouriteToggle) onFavouriteToggle();
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        background: '#fff',
        boxShadow: '0 2px 12px #ccc',
        transition: 'transform 0.25s cubic-bezier(.4,2,.3,.9), box-shadow 0.25s',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': {
          transform: onClick ? 'scale(1.04)' : undefined,
          boxShadow: onClick ? '0 6px 24px #aaa' : undefined,
        },
        position: 'relative',
        height: 340,
        width: 320,
        minWidth: 320,
        maxWidth: 320,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        m: 'auto',
        overflow: 'hidden',
        ...sx,
      }}
      onClick={onClick}
    >
      {/* Favourite Icon */}
      <IconButton
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          zIndex: 3,
          background: '#fff',
          boxShadow: '0 2px 8px #ccc',
          '&:hover': { background: '#ffeaea' }
        }}
        onClick={handleFavourite}
        aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
      >
        <FavoriteIcon color={isFav ? 'error' : 'disabled'} />
      </IconButton>
      {children}
      <Box sx={{ width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', mt: 2, mb: 1 }}>
        <CardMedia
          component="img"
          image={product.src || product.image}
          alt={product.name}
          sx={{
            maxWidth: '96%',
            maxHeight: 190,
            objectFit: 'contain',
            borderRadius: 2,
          }}
        />
      </Box>
      <CardContent sx={{ flex: '1 1 auto', minHeight: 60, maxHeight: 90, textAlign: 'center', color: '#222', fontFamily: 'cursive', background: 'transparent', p: 1.2, overflow: 'hidden' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.98rem', lineHeight: 1.13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</Typography>
        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.89rem', lineHeight: 1.05, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.company}</Typography>
        <Typography variant="body2" sx={{ mt: 0.7, fontSize: '0.86rem', lineHeight: 1.08, height: 32, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{product.description}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', pb: 2, mt: 'auto', position: 'relative', zIndex: 2, background: 'transparent' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1.08rem' }}>{product.price}</Typography>
      </CardActions>
    </Card>
  );
};

export default GlobalProductCard;
