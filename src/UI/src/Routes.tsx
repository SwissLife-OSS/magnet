import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Home as HomeView,
  MessageDetail as MessageDetailView,
  MessageDetailError as MessageDetailErrorView,
  NotFound as NotFoundView,
} from "./views";
import { ThemeProvider } from "@mui/styles";
import theme from "./theme";

const Routing: React.FC = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/message/:id" element={<MessageDetailView />} />
            <Route path="/message" element={<MessageDetailErrorView />} />
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Suspense>
  );
};

export default Routing;
