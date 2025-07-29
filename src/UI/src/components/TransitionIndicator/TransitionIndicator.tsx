import React from "react";
import { Fade } from "@mui/material";

interface TransitionIndicatorProps {
  in: boolean;
  children: React.ReactNode;
}

export const TransitionIndicator: React.FC<TransitionIndicatorProps> = ({ in: isIn, children }) => {
  return (
    <Fade in={isIn} timeout={300}>
      <div>
        {children}
      </div>
    </Fade>
  );
};
