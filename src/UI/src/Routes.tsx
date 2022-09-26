import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Home as HomeView,
  NotFound as NotFoundView,
  MessageDetail as MessageDetailView,
  MessageDetailError as MessageDetailErrorView,
} from "./views";
import PaginationTest from "./views/PaginationTest";

const Routing: React.FC = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Router>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/message/:id" element={<MessageDetailView />} />
          <Route path="/message" element={<MessageDetailErrorView />} />
          <Route path="/pagination" element={<PaginationTest />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default Routing;
