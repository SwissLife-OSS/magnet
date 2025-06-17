import React, { useDeferredValue, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Authorized, NavigationBar } from "./components";
import { ErrorBoundary } from "./shared/components/errorBoundary";
import { MessageDetail as MessageDetailView, NotFound as NotFoundView } from "./views";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { HomeRefetchQuery } from "./views/Home/__generated__/HomeRefetchQuery.graphql";
import { Home } from "./views/Home/Home";

export const Routing: React.FC = () => {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  return (
    <Router>
      <ErrorBoundary>
        <Authorized>
          <NavigationBar search={deferredSearch} onSearchChange={setSearch} />
          <Routes>
            <Route path="/" element={<Home search={deferredSearch} />} />
            <Route path="/message/:id" element={<MessageDetailView />} />
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </Authorized>
      </ErrorBoundary>
    </Router>
  );
};
