import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  padding: 0px 14px;
  button {
    border: none;
    display: block;
    background-color: transparent;
    width: 100%;
    cursor: pointer;
    color: rgb(45, 150, 214);
    font-size: 15px;
    text-transform: capitalize;
  }
`;

const NeutralButton = ({ children, ...others }) => (
  <ButtonContainer>
    <button {...others}>{children}</button>
  </ButtonContainer>
);

export default NeutralButton;
