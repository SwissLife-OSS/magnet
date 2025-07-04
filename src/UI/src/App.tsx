import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import React, { Suspense, useEffect } from "react";
import { Routing } from "./Routes";
import { theme } from "./theme";
import { useTransitionErrorHandler, initializeGlobalErrorHandling } from "./utils/errorHandling";

// Simple loading fallback without Material-UI
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '18px'
  }}>
    Loading...
  </div>
);

export const App: React.FC = () => {
  useTransitionErrorHandler();
  
  useEffect(() => {
    initializeGlobalErrorHandling();
    
    // Add global CSS to disable all transitions
    const style = document.createElement('style');
    style.textContent = `
      * {
        transition: none !important;
        animation-duration: 0s !important;
        animation-delay: 0s !important;
      }
      .MuiTouchRipple-root {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme={true} />
      <Suspense fallback={<LoadingFallback />}>
        <Routing />
      </Suspense>
    </ThemeProvider>
  );
};
