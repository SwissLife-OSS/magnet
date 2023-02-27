import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Authorized, NavigationBar } from "./components";
import { ErrorBoundary } from "./shared/components/errorBoundary";
import {
  Home as HomeView,
  MessageDetail as MessageDetailView,
  NotFound as NotFoundView,
} from "./views";

export const Routing: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Authorized>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/message/:id" element={<MessageDetailView />} />
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </Authorized>
      </ErrorBoundary>
    </Router>
  );
};
