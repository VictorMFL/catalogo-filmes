import React from "react";

// Interface
import { DataProps } from "./interface/interface";

// Components
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// contexto que fica com os dados da API
import { DataApiProvider, useDataApiContext } from "./context/DataApi";

const App = () => {
  // acessando o data do contexto
  const { data } = useDataApiContext();

  return (
    <>
      <DataApiProvider>
        <Header />
        <Home />
        {data && <Footer />}
      </DataApiProvider>
    </>
  );
};

export default App;
