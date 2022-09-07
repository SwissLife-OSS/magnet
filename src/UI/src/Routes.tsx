import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound/NotFound";

const Routing: React.FC = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default Routing;
