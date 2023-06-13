import React from "react";
import * as S from "./styles";
import { CardBox } from "../../components/CardBox";
import { BsPersonPlusFill } from "react-icons/bs";
import { MdPersonSearch, MdGroups } from "react-icons/md";
import { LuImport } from "react-icons/lu";

import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <S.HomeContainer>
      <CardBox
        illustartion={<MdGroups size="64px" />}
        action={"Ver todos os Usuários"}
        route="usuarios"
      />

      <CardBox
        illustartion={<BsPersonPlusFill size="64px" />}
        action={"Criar Usuário"}
        route="/cadastrar-usuario"
      />
      <CardBox
        illustartion={<MdPersonSearch size="64px" />}
        action={"Buscar Usuário"}
        route="/buscar-usuario"
      />

      <CardBox
        illustartion={<LuImport size="64px" />}
        action={"Importar Usuários"}
        route="/importar-usuarios"
      />
    </S.HomeContainer>
  );
};
