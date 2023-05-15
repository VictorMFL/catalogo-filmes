import React from "react";

import axios from "axios";

import { authorization } from "../../api/api";

import Header from "../Header/Header";

import { MovieProps } from "../../interface/interface";

import styles from "./MovieData.module.css";

import { Link } from "react-router-dom";

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
      console.log(data);
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
        <main className={styles.container} key={filme.id}>
          <section className={styles.initialInfo}>
            <img
              src={`https://image.tmdb.org/t/p/w500${filme.backdrop_path}`}
              alt={`Imagem do filme ${filme.title}`}
            />
            <h3>Estúdios da criação do filme</h3>
            {filme.production_companies.length === 0 ? (
              <p className={styles.notFound}>Não encontrado.</p>
            ) : null}
            {filme.production_companies.map((company) => (
              <div key={company.id} className={styles.creatorsStudio}>
                {company.logo_path === null ? (
                  <p className={styles.logoNotFound}>Logo não encontrada.</p>
                ) : (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                    alt={`Logo da ${company.name}`}
                  />
                )}
                <p className={styles.companyName}>{company.name}</p>
              </div>
            ))}

            <h3 className={styles.titleGenres}>Gêneros</h3>
            {filme.genres.map((gen) => (
              <Link
                to={`/catalogo-filmes/categorias/${gen.name}`}
                key={gen.id}
                className={styles.genre}
                onClick={() =>
                  window.localStorage.setItem("Genre", String(gen.id))
                }
              >
                {gen.name}
              </Link>
            ))}
          </section>
          <section className={styles.about}>
            <h1>{filme.title}</h1>
            <p>Descrição do filme: {filme.overview}</p>

            <p className={styles.revenue}>
              Receita Divulgada: ${filme.revenue.toLocaleString("en-US")}{" "}
            </p>

            <p className={styles.runtime}>Duração do filme: {filme.runtime} minutos</p>

            <div className={styles.containerVotes}>
              <div className={styles.votes}>
                <p>
                  Números de votos: <span>{filme.vote_count}</span>
                </p>
                <GiPopcorn size={50} color="red" />
              </div>
              <div className={styles.votes}>
                <p>
                  Média dos votos: <span>{filme.vote_average}</span>
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
