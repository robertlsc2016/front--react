import React, { useEffect, useState } from "react";
import * as S from "./styles";
import api from "../../services/api";
import { Typography } from "antd";

interface UsersProps {
  name: string;
  email: string;
}

export const Users: React.FC = () => {
  const [users, setUsers] = useState<UsersProps[]>();

  useEffect(() => {
    getAllUsers();
    console.log(users);
  }, []);

  const getAllUsers = async () => {
    const response = await api.get("/users").then((response) => {
      if (response.data !== undefined) {
        setUsers(response.data);
      }
    });
  };

  return (
    <S.UsersContainer>
      <Typography.Title level={1}>Usuários</Typography.Title>
      <div>
        <ul>
          {users &&
            users.map((user) => (
              <li>
                {user.name} - {user.email}
              </li>
            ))}
        </ul>
      </div>
    </S.UsersContainer>
  );
};
