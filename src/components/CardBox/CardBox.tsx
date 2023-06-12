import React from "react";
import * as S from "./styles";
import { Link } from "react-router-dom";

interface CardBoxProps {
  action: string;
  // illustartion: React.ReactNode;
  route: string;
}

export const CardBox: React.FC<CardBoxProps> = ({ action, route }) => {
  return (
    <S.StyledLink to={route} >
      <S.CardBox>
        {action}
        {/* {illustartion} */}
      </S.CardBox>
    </S.StyledLink>
  );
};
