import React from "react";
import axios from "axios";

import Header from "../Header/Header";

import { authorization } from "../../api/api";

import { GenreProps } from "../../interface/interface";

import { Link } from "react-router-dom";

const Genre = () => {
  const [data, setData] = React.useState<GenreProps[]>([]);

  async function get() {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?language=pt-br",
        authorization
      );
      const data = response.data.genres;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    get();
  }, []);

  return (
    <>
      <Header />
      <main className="calc-padding-top">
      {data &&
        data.map((i) => (
          <div
            key={i.id}
            className="flex flex-col justify-center items-center bg-gray"
          >
            <Link
              to={`/catalogo-filmes/categorias/${i.name}`}
              className="text-black my-3 last:mb-6 text-2xl font-semibold bg-white w-full text-center p-3"
              onClick={() => window.localStorage.setItem("Genre", String(i.id))}
            >
              {i.name}
            </Link>
          </div>
        ))}
      </main>
    </>
  );
};

export default Genre;
