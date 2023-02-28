import React from "react";
import { CircularProgress } from "@mui/material";
import { useHasAccess } from "../../shared/components/useHasAccess";
import { NotAuthorized as NotAuthorizedView } from "../../views";

export type AuthorizedProps = React.PropsWithChildren;

export const Authorized: React.FC<AuthorizedProps> = ({ children }) => {
  const { hasRole, isLoading } = useHasAccess();

  return isLoading ? (
    <CircularProgress />
  ) : hasRole ? (
    <>{children}</>
  ) : (
    <NotAuthorizedView />
  );
};
