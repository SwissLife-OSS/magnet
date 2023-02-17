import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavigationBar } from "./components";
import { ErrorBoundary } from "./shared/components/errorBoundary";
import { useRoles } from "./shared/components/useRoles";
import {
  Home as HomeView,
  MessageDetail as MessageDetailView,
  NotFound as NotFoundView,
  NotAuthorized as NotAuthorizedView,
} from "./views";

export const Routing: React.FC = () => {
  const hasRequiredRole = useRoles();

  return (
    <Suspense>
      <Router>
        <ErrorBoundary>
          {hasRequiredRole ? (
            <>
              <NavigationBar />
              <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/message/:id" element={<MessageDetailView />} />
                <Route path="*" element={<NotFoundView />} />
              </Routes>
            </>
          ) : (
            <NotAuthorizedView />
          )}
        </ErrorBoundary>
      </Router>
    </Suspense>
  );
};
