import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Home as HomeView,
  NotFound as NotFoundView,
  MessageDetail as MessageDetailView,
} from "./views";

const Routing: React.FC = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Router>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/message/:id" element={<MessageDetailView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default Routing;
