import { Table } from "antd";
import styled from "styled-components";

export const UsersContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 100%;
  /* background-color: red; */

  /* border: 1px; */
`;

export const styledTable = styled(Table)`
  .ant-table-container {
    height: 100%;
  }
`;
