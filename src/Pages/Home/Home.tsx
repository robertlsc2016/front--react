import React from "react";
import * as S from "./styles";
import { CardBox } from "../../components/CardBox";

import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <S.HomeContainer>
      <CardBox
        // illustartion={<PeopleAltOutlinedIcon />}
        action={"Ver todos os Usuários"}
        route="usuarios"
      />

      <CardBox
        // illustartion={<PersonRemoveOutlinedIcon />}
        action={"Deletar Usuário"}
        route="deletar-usuario"
      />

      <CardBox
        // illustartion={<EditOutlinedIcon />}
        action={"Editar Usuário"}
        route="editar-usuario"
      />
      <CardBox
        // illustartion={<PersonAddOutlinedIcon />}
        action={"Criar Usuário"}
        route="/cadastrar-usuario"
      />
      <CardBox
        // illustartion={<PersonSearchOutlinedIcon />}
        action={"Buscar Usuário"}
        route="/buscar-usuario"
      />
    </S.HomeContainer>
  );
};
