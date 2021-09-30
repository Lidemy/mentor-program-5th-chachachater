import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../redux/reducers/userReducer";
import { editPostAsync } from "../../../redux/reducers/postReducer";
import { getOnePost } from "../../../WebAPI";
import {
  Root,
  Container,
  InputTitle,
  InputContent,
  InputBlock,
} from "../../BlogStyle";

function Article() {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState([]);
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const userState = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) return;
    getOnePost(id)
      .then((data) => {
        setPost(data);
        setTitle(data[0].title);
        setContent(data[0].body);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = (e) => {
    if (!userState.data || !userState.data.ok) return;
    const postData = {
      id: post[0].id,
      title,
      content,
    };
    dispatch(editPostAsync(postData))
      .then(() => {
        history.push(`/posts/${post[0].id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      {!isLoading && (
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
      )}
    </Container>
  );
}

export default function EditArticlePage() {
  return (
    <Root>
      <Article />
    </Root>
  );
}
