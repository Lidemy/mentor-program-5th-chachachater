import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../redux/reducers/userReducer";
import { addPostAsync } from "../../../redux/reducers/postReducer";
import {
  Root,
  Container,
  InputTitle,
  InputContent,
  InputBlock,
} from "../../BlogStyle";

function Article() {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const history = useHistory();
  const userState = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = (e) => {
    if (!userState.data) return;
    const postData = {
      title,
      content,
    };
    dispatch(addPostAsync(postData))
      .then((result) => {
        history.push(`/posts/${result.payload.id}`);
      })
      .catch((err) => console.log("err: ", err));
  };
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InputTitle>
          <label>
            <div>Title</div>
            <input type="text" value={title} onChange={handleTitleChange} />
          </label>
        </InputTitle>
        <InputContent>
          <label>
            <div>Content</div>
            <textarea
              cols="30"
              rows="30"
              value={content}
              onChange={handleContentChange}
            ></textarea>
          </label>
        </InputContent>
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
