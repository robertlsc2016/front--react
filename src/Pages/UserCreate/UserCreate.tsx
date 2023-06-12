import React from "react";
import * as S from "./styles";
import { Button, Form, Input, Typography } from "antd";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

interface NewUserProps {
  name: string;
  email: string;
}

export const UserCreate: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (data: NewUserProps) => {

    await api
      .post("/new-user", {
        name: data.name,
        email: data.email,
      })
      .then((response) => {
        navigate("/usuarios");
      });
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "100%",
      }}
    >
      <Typography.Title>Criar Usuário</Typography.Title>
      <Form onFinish={onFinish}>
        <Form.Item
          label="Nome"
          name="name"
          rules={[{ required: true, message: "Por favor, insira seu nome" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Por favor, insira seu email",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
