import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Authorized, NavigationBar } from "./components";
import { ErrorBoundary } from "./shared/components/errorBoundary";
import {
  Home as HomeView,
  MessageDetail as MessageDetailView,
  NotFound as NotFoundView,
} from "./views";

export const Routing: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <Router>
      <ErrorBoundary>
        <Authorized>
          <NavigationBar search={search} onSearchChange={setSearch} />
          <Routes>
            <Route path="/" element={<HomeView search={search} />} />
            <Route path="/message/:id" element={<MessageDetailView />} />
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </Authorized>
      </ErrorBoundary>
    </Router>
  );
};
