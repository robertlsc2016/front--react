import { HomeFilled, HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export const HomeButton: React.FC = () => {
  return (
    <Button
      href="/"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "8px",
        left: "8px",
        padding: "0",
        margin: "0",
        height: "40px",
        width: "40px",
      }}
    >
      <HomeFilled />
    </Button>
  );
};
