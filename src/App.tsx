import React from "react";

// Interface
import { DataProps } from "./interface/interface";

// Components
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = () => {
  const [data, setData] = React.useState<DataProps[]>([]);

  return (
    <div>
      <Header />
      <Home data={data} setData={setData} />
      <Footer setData={setData} />
    </div>
  );
};

export default App;
