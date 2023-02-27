import React from "react";
import { useHasAccess } from "../../shared/components/useHasAccess";
import { NotAuthorized as NotAuthorizedView } from "../../views";

export type AuthorizedProps = React.PropsWithChildren;

export const Authorized: React.FC<AuthorizedProps> = ({ children }) => {
  return useHasAccess() ? <>{children}</> : <NotAuthorizedView />;
};
