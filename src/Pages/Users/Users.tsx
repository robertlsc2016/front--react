import React, { useEffect, useState } from "react";
import * as S from "./styles";
import api from "../../services/api";
import {
  Button,
  Divider,
  Spin,
  Table,
  TableColumnsType,
  Tag,
  Typography,
  notification,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { GenericStructure } from "../../components/GenericStructure";

interface UsersProps {
  _id: string;
  name: string;
  email: string;
  IconActions: React.ReactNode;
}

interface TableProps {
  name: string;
  email: string;
  IconActions: React.ReactNode;
}

const columns: TableColumnsType<TableProps> = [
  {
    title: "Nome",
    dataIndex: "name",
    width: "30%",
  },
  {
    title: "Email",
    dataIndex: "email",
    width: "auto",
  },
  {
    title: (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Ações
      </div>
    ),
    dataIndex: "IconActions",
    width: "10%",
  },
];

interface ActionsButtons {
  id: string;
  label: string;
}

type NotificationType = "success" | "info" | "warning" | "error";

export const Users: React.FC = () => {
  const [users, setUsers] = useState<UsersProps[]>();
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);

  const [handleNotification, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotificationWithIcon = (type: NotificationType) => {
    handleNotification[type]({
      message: "Usuário Deletado!",
      duration: 1.5,
    });
  };

  useEffect(() => {
    getPaginationUsers();
  }, []);

  const getPaginationUsers = async () => {
    const response = await api
      .get(`/pagination/page=${page}`)
      .then((response) => {
        if (response.data !== undefined) {
          const Users = response.data.map((user: UsersProps) => {
            return {
              key: user._id,
              name: user.name,
              email: user.email,
              IconActions: <ActionsButtons id={user._id} label={user.name} />,
            };
          });

          setUsers(Users);
        }
      });

    await api.get(`/pagination/page=${page + 1}`).then((response) => {
      if (response.data.length === 0) {
        setLastPage(true);
      } else {
        setLastPage(false);
      }
    });
  };

  const handleGetMore = () => {
    if (lastPage === false) {
      setPage(page + 1);
      getPaginationUsers();
    }
  };

  const handleReturn = () => {
    if (page > 1) {
      setPage(page - 1);
      getPaginationUsers();
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/editar-usuario/${id}`);
  };

  const handleDelete = (id: string) => {
    api
      .delete(`/delete-user/${id}`)
      .then(() => {
        openNotificationWithIcon("success");
        getPaginationUsers();
      })
      .catch(() => {
        openNotificationWithIcon("error");
      });
  };

  const ActionsButtons: React.FC<ActionsButtons> = ({ id, label }) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <EditOutlined
          onClick={() => {
            handleEdit(id);
          }}
        />
        <DeleteOutlined
          onClick={() => {
            handleDelete(id);
          }}
        />
      </div>
    );
  };

  return (
    <GenericStructure
      header={"Usuários"}
      body={
        <>
          {contextHolder}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
              height: "100%",
              // border: "1px solid red",
            }}
          >
            {users === undefined ? (
              <Spin
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  // borderBottom: "1px solid black",
                  flexDirection: "column",
                  alignContent: "center",
                  gap: "8px",
                  // backgroundColor: 'red',
                  height: "100%",
                  width: "100%",
                }}
              >
                <Table
                  columns={columns}
                  dataSource={users}
                  pagination={false}
                  scroll={{ y: 350 }}
                  style={{
                    // height: "100%",
                    width: '100%',
                    overflow: "auto",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    // border: "1px solid black",
                  }}
                >
                  <Button type="primary" onClick={() => handleReturn()}>
                    Voltar
                  </Button>
                  <Button type="primary" onClick={() => handleGetMore()}>
                    Avançar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      }
    />
  );
};
