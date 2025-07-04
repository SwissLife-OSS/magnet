import React from 'react';
import {Fade, FadeProps} from '@mui/material';

export const TransitionIndicator = ({ children, in: inProp, ...props }: FadeProps) => {
  const handleEnter = (node: HTMLElement) => {
    try {
      if (node && node.style) {
        node.style.transitionProperty = 'filter';
        node.style.transitionDuration = '300ms';
        node.style.filter = '';  // No blur when entering (visible state)
      }
    } catch (error) {
      console.warn('TransitionIndicator onEnter error:', error);
    }
  };

  const handleExit = (node: HTMLElement) => {
    try {
      if (node && node.style) {
        node.style.filter = 'blur(2px)';  // Blur when exiting (loading state)
      }
    } catch (error) {
      console.warn('TransitionIndicator onExit error:', error);
    }
  };

  return (
    <Fade
      in={inProp}
      style={{
        opacity: '',
        visibility: undefined,
      }}
      onEnter={handleEnter}
      onExit={handleExit}
      mountOnEnter
      unmountOnExit
      {...props}
    >
      <div>
        {children}
      </div>
    </Fade>
  );
};
