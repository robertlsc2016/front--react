import { Card } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const CardBox = styled.div`
  width: 150px;
  height: 150px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  /* gap: 16px; */
  border-radius: 16px;
  cursor: pointer;
  background-color: #0971b5;
  font-weight: 800;

  color: white;
  &:hover {
    background-color: #035e99;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;
