import React from "react";

import axios from "axios";

import { autorizacao } from "../../api/api";

const DadosFilmes = () => {
  const [data, setData] = React.useState<any>();

  async function get() {
    const idFilme = window.localStorage.getItem("Filme");
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${idFilme}?language=pt-BR`,
        autorizacao
      );
      const data = response.data;
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    get();
  }, []);

  return <div>tuts</div>;
};

export default DadosFilmes;
