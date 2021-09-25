import { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { post } from "../../../WebAPI";
import { AuthContext } from "../../../AuthContext";

const Root = styled.div`
  width: 80%;
  margin: auto;
`;
const Container = styled.div`
  margin: 20px auto;
`;
const ArticleTitle = styled.div`
  margin: auto;
  text-decoration: none;
  color: #546e7a;
  font-weight: bold;
  font-size: 32px;
  background-color: #b2dfdb;
  padding: 15px 10px;
  & input {
    width: 100%;
    font-size: 24px;
    line-height: 35px;
  }
`;
const ArticleContent = styled.div`
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
const InputBlock = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  font-size: 24px;
  width: 100%;
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

function Article() {
  const { user, setUser } = useContext(AuthContext);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const history = useHistory();
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = (e) => {
    if (!user) return;
    post(title, content).then(history.push("/index/1"));
  };
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <ArticleTitle>
          <label>
            <div>Title</div>
            <input type="text" value={title} onChange={handleTitleChange} />
          </label>
        </ArticleTitle>
        <ArticleContent>
          <label>
            <div>Content</div>
            <textarea
              cols="30"
              rows="30"
              value={content}
              onChange={handleContentChange}
            >
              Write some words...
            </textarea>
          </label>
        </ArticleContent>
        <InputBlock>
          <button type="submit" value="submit">
            submit
          </button>
        </InputBlock>
      </form>
    </Container>
  );
}

export default function ArticlePage() {
  return (
    <Root>
      <Article />
    </Root>
  );
}
