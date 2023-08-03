import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import MovieData from "./components/MovieData/MovieData";
import Genre from "./components/Genre/Genre";
import GenreFilter from "./components/GenreFilter/GenreFilter";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/catalogo-filmes/",
    element: <App />,
  },
  {
    path: "/catalogo-filmes/filme/:id",
    element: <MovieData />,
  },
  {
    path: "/catalogo-filmes/categorias",
    element: <Genre />,
  },
  {
    path: "/catalogo-filmes/categorias/:id",
    element: <GenreFilter />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
