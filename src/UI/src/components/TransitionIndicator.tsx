import {Fade, FadeProps} from '@mui/material';

export const TransitionIndicator = (props: FadeProps) => (
  <Fade
    style={{
      opacity: '',
      visibility: undefined,
    }}
    onEnter={(node) => {
      node.style.transitionProperty = 'filter';
      node.style.transitionDelay = '300ms';
      node.style.filter = 'blur(2px)';
    }}
    onExit={(node) => {
      node.style.transition = '';
      node.style.filter = '';
    }}
    {...props}
  />
);
