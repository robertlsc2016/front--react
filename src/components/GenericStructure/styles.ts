import { styled } from "styled-components";

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 8px;
  gap: 16px;
`;

export const Header = styled.div`
  width: 100%;
  height: auto;
  /* border: 1px solid black; */
`;

export const Body = styled.div`

  width: 100%;
  height: 100%;
  overflow: hidden;
`;
