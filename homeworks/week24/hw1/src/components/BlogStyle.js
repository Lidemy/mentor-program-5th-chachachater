import styled from "styled-components";
import { Link } from "react-router-dom";

export const Root = styled.div`
  width: 80%;
  margin: auto;
`;
export const Container = styled.div`
  margin: 20px auto;
`;
export const Title = styled.div`
  text-decoration: none;
  color: #546e7a;
  font-weight: bold;
  font-size: 24px;
  background-color: #b2dfdb;
  display: block;
  padding: 5px 10px;
`;
export const LinkTitle = styled(Link)`
  text-decoration: none;
  color: #546e7a;
  font-weight: bold;
  font-size: 24px;
  background-color: #b2dfdb;
  display: block;
  padding: 5px 10px;
`;
export const Content = styled.div`
  color: #546e7a;
  padding: 10px 10px 0 10px;
  white-space: pre-line;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 1px;
  line-height: 26px;
  font-size: 20px;
`;
export const PostDate = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px 10px;
  color: #546e7a;
`;
export const LoadingContainer = styled.div``;
export const InputTitle = styled.div`
  text-decoration: none;
  color: #546e7a;
  font-weight: bold;
  font-size: 24px;
  background-color: #b2dfdb;
  display: block;
  padding: 5px 10px;
  & input {
    width: 100%;
    font-size: 24px;
    line-height: 35px;
  }
`;
export const InputContent = styled.div`
  color: #546e7a;
  word-break: break-word;
  font-size: 32px;
  font-weight: bold;
  padding: 15px 10px;
  & textarea {
    width: 100%;
    resize: vertical;
    font-size: 24px;
    line-height: 35px;
  }
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
