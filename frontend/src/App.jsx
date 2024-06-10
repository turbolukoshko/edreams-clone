import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Itineraries from "./components/Itineraries/Itineraries.jsx";
import Home from "./components/Home/Home.jsx";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
import "../stylesheets/global.scss";
import NotFound from "./components/NotFound/NotFound.jsx";

const App = () => {
  return (
    <ErrorBoundary>
      <HashRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="itineraries" element={<Itineraries />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </HashRouter>
    </ErrorBoundary>
  );
};

export default App;
