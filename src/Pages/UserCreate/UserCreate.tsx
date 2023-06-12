import React, { useState } from "react";
import * as S from "./styles";
import {
  Button,
  Form,
  FormInstance,
  Input,
  Typography,
  notification,
} from "antd";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { GenericStructure } from "../../components/GenericStructure";
import { MdCloudDone } from 'react-icons/md';

interface NewUserProps {
  name: string;
  email: string;
}

type NotificationType = "success" | "info" | "warning" | "error";

export const UserCreate: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [successCreate, setSuccessCreate] = useState(false);

  const [handleNotification, contextHolder] = notification.useNotification();

  const formRef = React.useRef<FormInstance>(null);

  const navigate = useNavigate();
  const openNotificationWithIcon = (type: NotificationType) => {
    handleNotification[type]({
      message: "Usuário Criado!",
      description: "Você será redirecionado para a tela de usuários",
      duration: 3,
    });
  };

  const onFinish = async (data: NewUserProps) => {
    await api
      .post("/new-user", {
        name: data.name.trim(),
        email: data.email.trim(),
      })
      .then((response) => {
        setSuccessCreate(true);
        openNotificationWithIcon("success");

        setTimeout(() => {
          navigate("/usuarios");
        }, 3000);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const hadleInputSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().charAt(0) === "") {
      setName(name.substring(1));
      formRef.current?.setFieldsValue({ name: name.substring(1) });
    }
  };

  const hadleInputSearchEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().charAt(0) === "") {
      setName(email.substring(1));
      formRef.current?.setFieldsValue({ email: email.substring(1) });
    }
  };

  return (
    <>
      {contextHolder}
      <GenericStructure
        header={"Criar Usuário"}
        body={
          successCreate ? (
            <div style={{
              display: "flex",
              justifyContent: 'center',
              alignItems: 'center',
              width: "100%",
              height: "100%",
            }}>
              <MdCloudDone size={64} />
            </div>
          ) : (
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              ref={formRef}
            >
              <Form.Item
                label="Nome"
                name="name"
                rules={[
                  { required: true, message: "Por favor, insira seu nome" },
                ]}
              >
                <Input
                  onChange={(e) => {
                    hadleInputSearchName(e);
                  }}
                  value={name}
                />
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
                <Input
                  onChange={(e) => {
                    hadleInputSearchEmail(e);
                  }}
                  value={email}
                />
              </Form.Item>

              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Enviar
                </Button>
              </Form.Item>
            </Form>
          )
        }
      />
    </>
  );
};
