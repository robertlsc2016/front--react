import React, { useEffect, useState } from "react";
import { GenericStructure } from "../../components/GenericStructure";
import { Button, Form, FormInstance, Input, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

interface UserProps {
  _id: string;
  name: string;
  email: string;
}

export const UserEdit: React.FC = () => {
  const formRef = React.useRef<FormInstance>(null);

  let { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProps>();
  const [userNotFound, setUserNotFound] = useState("");
  useEffect(() => {
    validadeUser();
  }, []);

  const validadeUser = async () => {
    await api
      .get(`/user/${id}`)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setUser(undefined);
        setUserNotFound("Usuário não encontrado ou inexistente");
      });
  };

  const updateUser = async (name: string, email: string) => {
    await api.patch(`/update-user/${id}`, {
      name: name,
      email: email,
    }).then(() => {
      navigate('/usuarios')
    })
  };

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    updateUser(values.name, values.email);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <GenericStructure
      header={<Typography.Title>Editar Usuário</Typography.Title>}
      body={
        user !== undefined ? (
          <Form
            ref={formRef}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="name"
              label="Nome"
              initialValue={user.name}
              required
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              initialValue={user.email}
              label="Email"
              required
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Editar
              </Button>
            </Form.Item>
          </Form>
        ) : (
          userNotFound
        )
      }
    />
  );
};
