import { useEffect } from 'react';

// Patterns to identify Material-UI transition errors
const TRANSITION_ERROR_PATTERNS = [
  'scrollTop',
  'Cannot read properties of null (reading \'scrollTop\')',
  'Vo (utils.js',
  'Fade.js',
  'Transition.js',
  'utils.js:1:36'
];

const isTransitionError = (message: string): boolean => {
  return TRANSITION_ERROR_PATTERNS.some(pattern => 
    message.toLowerCase().includes(pattern.toLowerCase())
  );
};

// Global error handler for Material-UI transition issues
export const useTransitionErrorHandler = () => {
  useEffect(() => {
    const originalConsoleError = console.error;
    
    console.error = (...args) => {
      const message = args.join(' ');
      
      // Check if this is a Material-UI transition error
      if (isTransitionError(message)) {
        // Log as warning instead of error to avoid error boundary triggering
        console.warn('Material-UI transition error handled:', ...args);
        return;
      }
      
      // Call original console.error for other errors
      originalConsoleError(...args);
    };
    
    return () => {
      console.error = originalConsoleError;
    };
  }, []);
};

// Global error event handler
export const initializeGlobalErrorHandling = () => {
  if (typeof window !== 'undefined') {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      if (event.reason && event.reason.message && isTransitionError(event.reason.message)) {
        event.preventDefault();
        console.warn('Global Material-UI transition error prevented (unhandledrejection):', event.reason.message);
      }
    });

    // Handle global errors
    window.addEventListener('error', (event) => {
      if (event.error && event.error.message && isTransitionError(event.error.message)) {
        event.preventDefault();
        console.warn('Global Material-UI transition error prevented (error):', event.error.message);
      }
    });

    // Monkey patch React error boundary handler
    const originalReactError = window.onerror;
    window.onerror = (message, source, lineno, colno, error) => {
      if (typeof message === 'string' && isTransitionError(message)) {
        console.warn('Global Material-UI transition error prevented (onerror):', message);
        return true; // Prevent default error handling
      }
      
      if (originalReactError) {
        return originalReactError(message, source, lineno, colno, error);
      }
      return false;
    };
  }
};
