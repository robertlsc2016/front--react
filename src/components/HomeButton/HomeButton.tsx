import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export const HomeButton: React.FC = () => {
  return (
    <Button
      href="/"
      style={{
        position: "absolute",
        top: "8px",
        left: "8px",
      }}
    >
      Voltar
    </Button>
  );
};
