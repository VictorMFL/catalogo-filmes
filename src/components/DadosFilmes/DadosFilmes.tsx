import React from "react";

import axios from "axios";

import { autorizacao } from "../../api/api";

import Header from "../Header/Header";

import { FilmeProps } from "../../interface/interface";

import styles from "./DadosFilmes.module.css";

import { Link } from "react-router-dom";

import { GiPopcorn } from "react-icons/gi";

import { BsFillStarFill } from "react-icons/bs";

const DadosFilmes = () => {
  const [data, setData] = React.useState<FilmeProps[]>([]);

  async function get() {
    const idFilme = window.localStorage.getItem("Filme");
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${idFilme}?language=pt-BR`,
        autorizacao
      );
      const data = response.data;
      console.log(data);
      setData([data]);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    get();
  }, []);

  if (data.length === 0) return null;
  return (
    <>
      <Header />
      {data.map((filme) => (
        <main className={styles.container}>
          <section className={styles.infoIniciais}>
            <img
              src={`https://image.tmdb.org/t/p/w500${filme.backdrop_path}`}
              alt={`Imagem do filme ${filme.title}`}
            />
            <h3>Estúdios da criação do filme</h3>
            {filme.production_companies.length === 0 ? <p className={styles.naoEncontrado}>Não encontrado.</p> : null}
            {filme.production_companies.map((company) => (
              <div key={company.id} className={styles.infoCriadores}>
                {company.logo_path === null ? (
                  <p className={styles.logoNaoEncontrada}>
                    Logo não encontrada.
                  </p>
                ) : (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                    alt={`Logo da ${company.name}`}
                  />
                )}
                <p className={styles.nomeCompany}>{company.name}</p>
              </div>
            ))}

            <h3 className={styles.titleGeneros}>Gêneros</h3>
            {filme.genres.map((gen) => (
              <Link
                to={`/catalogo-filmes/categorias/${gen.name}`}
                key={gen.id}
                className={styles.generos}
                onClick={() =>
                  window.localStorage.setItem("Categoria", String(gen.id))
                }
              >
                {gen.name}
              </Link>
            ))}
          </section>
          <section className={styles.sobre}>
            <h1>{filme.title}</h1>
            <p>Descrição do filme: {filme.overview}</p>

            <p className={styles.receita}>Receita Divulgada: $ {filme.revenue} </p>

            <div className={styles.sobreVotos}>
              <div className={styles.votos}>
                <p>
                  Números de votos: <span>{filme.vote_count}</span>
                </p>
                <GiPopcorn size={50} color="red" />
              </div>
              <div className={styles.votos}>
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

export default DadosFilmes;
