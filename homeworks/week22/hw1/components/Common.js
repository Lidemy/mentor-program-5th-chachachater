import styled from "styled-components";

export const Root = styled.div`
  max-width: 450px;
  margin: auto;
`;
export const Container = styled.div`
  border: #82ada9 1px solid;
  height: 100%;
`;
export const Title = styled.div`
  background-color: #b2dfdb;
  color: #000000;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  padding: 20px 0px;
`;
export const Content = styled.div`
  background-color: #ffffff;
  color: #424242;
  font-size: 24px;
  padding: 25px 50px;
  text-align: center;
  word-break: break-word;
  white-space: pre-line;
`;
export const InputBlock = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  font-size: 24px;
  width: 100%;
  & label {
    width: 80%;
    height: fit-content;
  }
  & div {
    margin: 10px 0;
  }
  & input {
    width: 100%;
    height: 40%;
    font-size: 24px;
  }
  & button {
    color: #fafafa;
    background-color: #b2dfdb;
    font-size: 24px;
    border: none;
    width: fit-content;
    padding: 10px;
    border-radius: 50px;
  }
  & button:hover {
    color: #424242;
    background-color: #82ada9;
  }
`;
export const ErrMessage = styled.div`
  color: #bf360c;
  background-color: #ffccbc;
  text-align: center;
  padding: 10px;
`;
