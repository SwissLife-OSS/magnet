import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavigationBar } from "./components";
import { ErrorBoundary } from "./shared/components/errorBoundary";
import {
  Home as HomeView,
  MessageDetail as MessageDetailView,
  NotFound as NotFoundView,
} from "./views";

const Routing: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/message/:id" element={<MessageDetailView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default Routing;
