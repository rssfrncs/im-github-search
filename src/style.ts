import styled from "styled-components";

export const Prediction = styled.button`
  background-color: rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
  width: 100%;
  color: rgb(255, 255, 255);
  font-size: 1rem;
  border: none;
  padding: 1rem;
  transition: border 0.3s ease 0s;
  &:hover {
    background: rgb(96, 24, 65);
  }
`;

export const Input = styled.input`
  background-color: rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
  width: 100%;
  color: rgb(255, 255, 255);
  font-size: 1rem;
  border-width: 2px;
  border-style: solid;
  border-image: initial;
  border-radius: 4px;
  padding: 1rem;
  transition: border 0.3s ease 0s;
  outline: 0px;
  border-color: rgba(255, 255, 255, 0.5);
  &::placeholder {
    color: rgba(255, 255, 255, 0.58);
  }
`;

export const Space = styled.div`
  flex: 0 0 10px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: auto;
  white-space: nowrap;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;

export const UserWrapper = styled(Column)`
  padding: 20px;
  border-radius: 5;
  padding-top: 50px;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
`;

export const Avatar = styled.img`
  border-radius: 100%;
  border: 2px solid white;
  box-shadow: 0 0 0 2px black;
`;
