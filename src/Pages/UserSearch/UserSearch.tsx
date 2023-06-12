import React, { useState } from "react";
import api from "../../services/api";
import { GenericStructure } from "../../components/GenericStructure/GenericStructure";
import { Button, Card, Divider, Input, Spin, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface UserDeleteProp {
  _id: string;
  name: string;
  email: string;
}

export const UserSearch: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [dataSearch, setDataSearch] = useState("");
  const [user, setUser] = useState<UserDeleteProp>();

  const getUser = async () => {
    setIsLoading(true);
    setUser(undefined);
    const user = await api
      .get(`/user/${dataSearch}`)
      .then((response) => {
        setUser(response.data);
        setIsLoading(false);

        console.log(response.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleEditUser = (id: string) => {
    navigate(`/editar-usuario/${id}`);
    // console.log(dataSearch);
  };

  const hadleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().charAt(0) === "") {
      setDataSearch(dataSearch.substring(1));
    }

    setDataSearch(e.target.value);
  };

  return (
    <GenericStructure
      header={<Typography.Title>Buscar Usuário</Typography.Title>}
      body={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <p>Buscar Usuário</p>
          <Input
            placeholder="id, email, nome"
            value={dataSearch}
            onChange={(e) => {
              hadleInputSearch(e);
            }}
          />
          <Button onClick={() => getUser()} type="primary">
            Buscar
          </Button>
          <Divider />
          {user === undefined ? (
            isLoading === true && <Spin />
          ) : (
            <Card style={{ width: 300 }}>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Button
                  type="text"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0",
                    padding: "0",
                    width: "32px",
                    height: "32px",
                  }}
                  onClick={() => {
                    handleEditUser(user._id);
                  }}
                >
                  <EditOutlined />
                </Button>
                <Button
                  type="text"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0",
                    padding: "0",
                    width: "32px",
                    height: "32px",
                  }}
                >
                  <DeleteOutlined />
                </Button>
              </div>
            </Card>
          )}
        </div>
      }
    />
  );
};
