import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import DadosFilmes from "./components/MovieData/MovieData";
import Categorias from "./components/Genre/Genre";
import FiltroCategoria from "./components/GenreFilter/GenreFilter";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/catalogo-filmes/",
    element: <App />,
  },
  {
    path: "/catalogo-filmes/filme/:id",
    element: <DadosFilmes />,
  },
  {
    path: "/catalogo-filmes/categorias",
    element: <Categorias />,
  },
  {
    path: "/catalogo-filmes/categorias/:id",
    element: <FiltroCategoria />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
