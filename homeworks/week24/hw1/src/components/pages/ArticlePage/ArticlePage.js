import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, Link, useHistory } from "react-router-dom";
import { getOnePost } from "../../../WebAPI";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../redux/reducers/userReducer";
import { deletePostAsync } from "../../../redux/reducers/postReducer";
import { Root, Container, Title, Content, PostDate } from "../../BlogStyle";

const Btn = styled(Link)`
  text-decoration: none;
  border: 1px solid black;
  margin-right: 10px;
  padding: auto;
`;

function Article({ post }) {
  const userState = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleDelete = () => {
    dispatch(deletePostAsync(post[0].id))
      .then(() => {
        history.push(`/index/1`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <Title>{post[0].title}</Title>
      <PostDate>
        {userState.data
          ? userState.data.data.id === post[0].userId && (
              <Btn to={`/edit/${post[0].id}`}>edit</Btn>
            )
          : ""}
        {userState.data
          ? userState.data.data.id === post[0].userId && (
              <Btn onClick={handleDelete}>delete</Btn>
            )
          : ""}
        {new Date(post[0].createdAt).toLocaleString()}
      </PostDate>
      <Content>{post[0].body}</Content>
    </Container>
  );
}

Article.propTypes = {
  post: PropTypes.object,
};

export default function ArticlePage() {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState([]);
  useEffect(() => {
    if (!isLoading) return;
    getOnePost(id).then((data) => {
      setPost(data);
      setIsLoading(false);
    });
  }, []);
  return <Root>{!isLoading && <Article post={post} />}</Root>;
}
