import React from "react";
import { Box } from "@mui/material";
import { useHasAccess } from "../../shared/components/useHasAccess";
import { NotAuthorized as NotAuthorizedView } from "../../views";

// Custom loading spinner that doesn't use Material-UI transitions
const LoadingSpinner = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}
  >
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
  </Box>
);

export type AuthorizedProps = React.PropsWithChildren;

export const Authorized: React.FC<AuthorizedProps> = ({ children }) => {
  const { hasRole, isLoading } = useHasAccess();

  return isLoading ? (
    <LoadingSpinner />
  ) : hasRole ? (
    <Box component="div">{children}</Box>
  ) : (
    <NotAuthorizedView />
  );
};
