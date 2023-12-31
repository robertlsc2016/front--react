import React, { ReactNode } from "react";
import AppRouter from "./Routes/Routes";
import { GlobalStyle } from "./theme/GlobalStyles";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { HomeButton } from "./components/HomeButton";
function App() {
  return (
    <div
      className="App"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <HomeButton />
      <GlobalStyle />
      <AppRouter />
    </div>
  );
}

export default App;
