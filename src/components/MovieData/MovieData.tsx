import React from "react";

import axios from "axios";

import { authorization } from "../../api/api";

import Header from "../Header/Header";

import { MovieProps } from "../../interface/interface";

import { Link } from "react-router-dom";

// icones
import { GiPopcorn } from "react-icons/gi";
import { BsFillStarFill } from "react-icons/bs";

// Tela de Carregamento
import Login from "../LoginPage/Login";

const MovieData = () => {
  const [data, setData] = React.useState<MovieProps[]>([]);
  const [login, setLogin] = React.useState(true);

  async function get() {
    const idMovie = window.localStorage.getItem("Movie");
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${idMovie}?language=pt-BR`,
        authorization
      );
      const data = response.data;
      setData([data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLogin(false);
    }
  }

  React.useEffect(() => {
    get();
  }, []);

  if (login) return <Login />;
  return (
    <>
      <Header />
      {data.map((filme) => (
        <main
          className="min-h-screen grid grid-cols-[20rem_minmax(20rem,_1fr)_100px] px-4 bg-mediumGray text-white mt-16 big-tablet:grid-cols-1 pt-7"
          key={filme.id}
        >
          <section className="flex flex-col items-center w-80 big-tablet:mt-12 big-tablet:w-full big-tablet:order-2">
            <img
              src={`https://image.tmdb.org/t/p/w500${filme.backdrop_path}`}
              alt={`Imagem do filme ${filme.title}`}
              className="w-full rounded-md"
            />
            <div className="big-tablet:flex big-tablet:flex-col big-tablet:justify-center w-full">
              <h3 className="p-4">Estúdios da criação do filme</h3>
              {filme.production_companies.length === 0 ? (
                <p className="text-center">Não encontrado.</p>
              ) : null}
              {filme.production_companies.map((company) => (
                <div
                  key={company.id}
                  className="flex flex-col justify-center items-center"
                >
                  {company.logo_path === null ? (
                    <p className="text-sm text-lightGray font-semibold p-1">
                      Logo não encontrada.
                    </p>
                  ) : (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                      alt={`Logo da ${company.name}`}
                      className="w-3/4 h-36 big-tablet:max-w-sm big-tablet:max-h-60"
                    />
                  )}
                  <p className="mb-8 font-semibold p-1">{company.name}</p>
                </div>
              ))}
            </div>

            <div className="w-full big-tablet:order-3">
              <h3 className="mt-4">Gêneros</h3>
              {filme.genres.map((gen) => (
                <div key={gen.id}>
                  <Link
                    to={`/catalogo-filmes/categorias/${gen.name}`}
                    className="font-medium mb-2 pl-3 hover:underline"
                    onClick={() =>
                      window.localStorage.setItem("Genre", String(gen.id))
                    }
                  >
                    {gen.name}
                  </Link>
                </div>
              ))}
            </div>
          </section>
          <section className="pl-8 big-tablet:order-1 tablet:pl-0">
            <h1 className="tablet:text-2xl">{filme.title}</h1>
            <p className="mt-3 tablet:text-sm">
              Descrição do filme: {filme.overview}
            </p>

            <p className="pt-8 font-bold mt-3 tablet:text-sm">
              Receita Divulgada: ${filme.revenue.toLocaleString("en-US")}{" "}
            </p>

            <p className="font-bold mt-3 tablet:text-sm">
              Duração do filme: {filme.runtime} minutos
            </p>

            <div className="w-full grid grid-cols-2 px-20 mt-12 big-screen:p-0 tablet:grid-cols-1 tablet:gap-3 tablet:mt-8">
              <div className="flex flex-col justify-center items-center  text-center">
                <p className="text-3xl mt-3 big-screen:text-2xl tablet:text-xl">
                  Números de votos:{" "}
                  <span className="text-3xl big-screen:text-2xl tablet:text-xl">
                    {filme.vote_count}
                  </span>
                </p>
                <GiPopcorn size={50} color="red" />
              </div>
              <div className="flex flex-col justify-center items-center text-center">
                <p className="text-3xl mt-3 big-screen:text-2xl tablet:text-xl">
                  Média dos votos:{" "}
                  <span className="text-3xl big-screen:text-2xl tablet:text-xl">
                    {filme.vote_average}
                  </span>
                </p>
                <BsFillStarFill size={50} color="yellow" />
              </div>
            </div>
          </section>
        </main>
      ))}
    </>
  );
};

export default MovieData;
