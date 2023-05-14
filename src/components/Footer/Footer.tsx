import React from "react";

import { PaginationControl } from "react-bootstrap-pagination-control";
import { DataProps } from "../../interface/interface";

import axios from "axios";

import { autorizacao } from "../../api/api";

type PageNumProps = {
  setData: React.Dispatch<React.SetStateAction<DataProps[]>>;
};

const Footer = ({ setData }: PageNumProps) => {
  const [pageNum, setPageNum] = React.useState(1);

  async function get() {
    const pageString = String(pageNum);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=pt-BR&page=${pageString}&sort_by=popularity.desc`,
        autorizacao
      );
      const data = response.data;
      setData([data]);
      console.log(data);
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
        between={4}
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
