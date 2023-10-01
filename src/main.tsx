import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { PrimaryLocationContextProvider } from "./store/primaryLocationContext.tsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimaryLocationContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PrimaryLocationContextProvider>
  </React.StrictMode>
);
