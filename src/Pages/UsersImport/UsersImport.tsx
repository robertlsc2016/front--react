import React, { ChangeEvent, useState, useCallback } from "react";
import { GenericStructure } from "../../components/GenericStructure";
import { Button, Form, Space, Typography, Upload } from "antd";
import {
  FileDoneOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  ImportOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import api from "../../services/api";
import { Link } from "react-router-dom";

interface FileProps {
  file: Blob;
}

// interface ImportedFileProps{

// }

export const UsersImport: React.FC<any> = () => {
  const [file, setFile] = useState<File | null | any>(null);
  const [stageImportedFile, setStageImportedFile] = useState("NOT_IMPORTED");

  function MyDropzone() {
    const onDrop = useCallback((acceptedFile: File[]) => {
      console.log(acceptedFile.length);
      setFile(acceptedFile);

      if (acceptedFile.length === 0) {
        setStageImportedFile("INVALID_EXTENSION");
      }

      if (acceptedFile.length > 0) {
        setStageImportedFile("IMPORTED");
      }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      multiple: false,
      accept: {
        "file/csv": [".csv"],
      },
    });

    return (
      <div
        {...getRootProps()}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#FAFAFA",
          border: "5px solid #878787",
          borderRadius: "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#bdbdbd",
          borderStyle: "dashed",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <ImportOutlined
              style={{
                fontSize: "64px",
              }}
            />
            <p>Solte o arquivo aqui ou clique aqui</p>
          </div>
        )}
      </div>
    );
  }
  const uploadFile = async () => {
    const formData = new FormData();

    file.forEach((file: Blob) => {
      formData.append("file", file);
    });

    await api
      .post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        if (response.status === 201) {
          setStageImportedFile("FINISH");
        }
      })
      .catch(() => {
        setStageImportedFile("ERROR");
      });
  };
  return (
    <GenericStructure
      header={"Importar Usuários"}
      body={
        <div
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {stageImportedFile === "NOT_IMPORTED" && <MyDropzone />}
          {stageImportedFile === "IMPORTED" && (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#feffa7",
                borderRadius: "16px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                color: "#bdbdbd",
                gap: "16px",
              }}
            >
              <FileTextOutlined style={{ fontSize: "64px", color: "black" }} />

              <Typography.Title level={2}>
                Arquivo Importado com Sucesso
              </Typography.Title>
              <Button onClick={() => uploadFile()} type="primary">
                Enviar Arquivo
              </Button>
            </div>
          )}
          {stageImportedFile === "INVALID_EXTENSION" && (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#ff9f9f",
                borderRadius: "16px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                color: "#bdbdbd",
                textAlign: "center",
                gap: "16px",
              }}
            >
              <FileExcelOutlined style={{ fontSize: "64px", color: "black" }} />

              <Typography.Title level={2}>
                A extensão do Arquivo é inválida. importe apenas arquivos CSV
              </Typography.Title>
              <Link to="/importar-usuarios" reloadDocument>
                <Button type="primary">Reiniciar</Button>
              </Link>
            </div>
          )}

          {stageImportedFile === "ERROR" && (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#ff9f9f",
                borderRadius: "16px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                color: "#bdbdbd",
                gap: "16px",
              }}
            >
              <FileExcelOutlined style={{ fontSize: "64px", color: "black" }} />

              <Typography.Title level={2}>
                Erro ao enviar Arquivo. Revise os dados e tente novamente
              </Typography.Title>
              <Link to="/importar-usuarios" reloadDocument>
                <Button type="primary">Reiniciar</Button>
              </Link>
            </div>
          )}
          {stageImportedFile === "FINISH" && (
            <>Arquivos Adicionados com Sucesso</>
          )}
        </div>
      }
    />
  );
};
