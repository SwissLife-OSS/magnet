import React, { useDeferredValue, useState, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Authorized, NavigationBar } from "./components";
import { ErrorBoundary } from "./shared/components/errorBoundary";
import { MessageDetail as MessageDetailView, NotFound as NotFoundView } from "./views";
import { Home } from "./views/Home/Home";

export const Routing: React.FC = () => {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  return (
    <Router>
      <ErrorBoundary key="main-error-boundary">
        <Authorized>
          <NavigationBar search={deferredSearch} onSearchChange={setSearch} />
          <Routes>
            <Route 
              path="/" 
              element={
                <Suspense fallback={"loading..."}>
              <Home key={`home-${deferredSearch}`} search={deferredSearch} /></Suspense>} 
            />
            <Route path="/message/:id" element={<MessageDetailView />} />
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </Authorized>
      </ErrorBoundary>
    </Router>
  );
};
