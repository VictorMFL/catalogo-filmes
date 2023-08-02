import React from "react";

import { PaginationControl } from "react-bootstrap-pagination-control";

import { DataProps } from "../../interface/interface";

import axios from "axios";

import { authorization } from "../../api/api";

// hook que verifica o tamanho da tela
import useMedia from "../../hooks/useMedia";

type PageNumProps = {
  setData: React.Dispatch<React.SetStateAction<DataProps[]>>;
};

const Footer = ({ setData }: PageNumProps) => {
  const [pageNum, setPageNum] = React.useState(1);

  // vendo se a tela é de 700px ou menos
  const mobile = useMedia('(max-width: 700px)')

  async function get() {
    const page = String(pageNum);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=pt-BR&page=${page}&sort_by=popularity.desc`,
        authorization
      );
      const data = response.data;
      setData([data]);
      window.scrollTo(0, 0); // rolamento da página para o topo
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    get();
  }, [pageNum]);

  return (
    <footer>
      <PaginationControl
        page={pageNum}
        between={mobile ? 2 : 4}
        total={500}
        limit={1}
        changePage={(page) => {
          setPageNum(page);
        }}
        ellipsis={1}
      />
    </footer>
  );
};

export default Footer;
