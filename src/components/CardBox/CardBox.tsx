import React from "react";
import * as S from "./styles";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import { EditFilled } from "@ant-design/icons";

interface CardBoxProps {
  action: string;
  illustartion: React.ReactNode;
  route: string;
}

export const CardBox: React.FC<CardBoxProps> = ({
  action,
  route,
  illustartion,
}) => {
  return (
    <S.StyledLink to={route}>
      <S.CardBox>
        <div>{illustartion}</div>
        <Typography.Text
          style={{
            color: "white",
          }}
        >
          {action}
        </Typography.Text>
      </S.CardBox>
    </S.StyledLink>
  );
};
