import { Card } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const CardBox = styled(Card)`
  width: 150px;
  height: 100px;
  cursor: pointer;
  background-color: #006666;
  font-weight: 800;
  /* background: ; */
  color: white;
  &:hover{
    background-color:  #008584 ;
  }
`;


export const StyledLink = styled(Link)`
  text-decoration: none;
`