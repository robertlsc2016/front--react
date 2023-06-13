import React, { useEffect, useState } from "react";
import * as S from "./styles";
import api from "../../services/api";
import {
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
  },
  {
    title: "Email",
    dataIndex: "email",
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
  const [handleNotification, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotificationWithIcon = (type: NotificationType) => {
    handleNotification[type]({
      message: "Usuário Deletado!",
      duration: 1.5,
    });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const response = await api.get("/users").then((response) => {
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
  };

  const handleEdit = (id: string) => {
    navigate(`/editar-usuario/${id}`);
  };

  const handleDelete = (id: string) => {
    api
      .delete(`/delete-user/${id}`)
      .then(() => {
        openNotificationWithIcon("success");
        getAllUsers();
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
                  justifyContent: "flex-start",
                  borderBottom: "1px solid black",
                }}
              >
                <Table
                  columns={columns}
                  dataSource={users}
                  pagination={false}
                  scroll={{ x: "100%", y: 350 }}
                  style={{
                    height: "100%",
                    overflow: "auto",
                  }}
                />
              </div>
            )}
          </div>
        </>
      }
    />
  );
};
