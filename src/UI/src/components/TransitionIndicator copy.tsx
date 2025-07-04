import React from 'react';
import { Box } from '@mui/material';

interface TransitionIndicatorProps {
  in: boolean;
  children: React.ReactNode;
}

// Custom spinner to avoid Material-UI CircularProgress transitions
const CustomSpinner = () => (
  <div
    style={{
      width: '40px',
      height: '40px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #1976d2',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }}
  />
);

// Add CSS animation keyframes to document if not already present
if (typeof document !== 'undefined' && !document.querySelector('#spinner-styles')) {
  const style = document.createElement('style');
  style.id = 'spinner-styles';
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

export const TransitionIndicator: React.FC<TransitionIndicatorProps> = ({ in: isLoading, children }) => (
  <Box sx={{ position: 'relative' }}>
    {isLoading && (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 1000,
          pointerEvents: 'auto',
        }}
      >
        <CustomSpinner />
      </Box>
    )}
    <Box 
      sx={{ 
        opacity: isLoading ? 0.3 : 1, 
        transition: 'opacity 0.2s ease',
        pointerEvents: isLoading ? 'none' : 'auto'
      }}
    >
      {children}
    </Box>
  </Box>
);
