import React from "react";
import * as S from "./styles";
import { Typography } from "antd";

interface GenericStructureProps {
  header: React.ReactNode | string;
  body: React.ReactNode;
}

export const GenericStructure: React.FC<GenericStructureProps> = ({
  header,
  body,
}) => {
  return (
    <S.Container>
      <S.Header>
        <Typography.Title
          level={1}
          style={{
            paddingLeft: "8px",
            margin: "0",
            borderLeft: "5px solid #808080",
          }}
        >
          {header}
        </Typography.Title>
      </S.Header>
      <S.Body>{body}</S.Body>
    </S.Container>
  );
};
