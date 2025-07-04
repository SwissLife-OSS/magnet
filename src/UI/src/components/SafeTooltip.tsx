import React, { useState, useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface SafeTooltipProps {
  title: string;
  arrow?: boolean;
  children: React.ReactElement;
  disableInteractive?: boolean;
  disableFocusListener?: boolean;
  disableTouchListener?: boolean;
}

export const SafeTooltip: React.FC<SafeTooltipProps> = ({ 
  title, 
  arrow = false, 
  children, 
  disableInteractive = true,
  disableFocusListener = true,
  disableTouchListener = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const childRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (disableInteractive) {
      const rect = event.currentTarget.getBoundingClientRect();
      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 8
      });
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (disableInteractive) {
      setIsVisible(false);
    }
  };

  const handleFocus = () => {
    if (!disableFocusListener) {
      setIsVisible(true);
    }
  };

  const handleBlur = () => {
    if (!disableFocusListener) {
      setIsVisible(false);
    }
  };

  return (
    <>
      <Box
        ref={childRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        sx={{ display: 'inline-block' }}
      >
        {children}
      </Box>
      {isVisible && (
        <Paper
          sx={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            transform: 'translate(-50%, -100%)',
            zIndex: 1500,
            padding: '4px 8px',
            fontSize: '0.75rem',
            backgroundColor: 'rgba(97, 97, 97, 0.92)',
            color: 'white',
            borderRadius: '4px',
            pointerEvents: 'none',
            maxWidth: '300px',
            wordWrap: 'break-word',
          }}
        >
          <Typography variant="body2" sx={{ fontSize: '0.75rem', color: 'white' }}>
            {title}
          </Typography>
        </Paper>
      )}
    </>
  );
};
