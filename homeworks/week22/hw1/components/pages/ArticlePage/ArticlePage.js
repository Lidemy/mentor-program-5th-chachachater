import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getOnePost } from "../../../WebAPI";
import PropTypes from "prop-types";

const Root = styled.div`
  width: 80%;
  margin: auto;
`;
const ArticleContainer = styled.div`
  margin: 20px auto;
`;
const ArticleTitle = styled.div`
  text-decoration: none;
  color: #546e7a;
  font-weight: bold;
  font-size: 24px;
  background-color: #b2dfdb;
  display: block;
  padding: 5px 10px;
`;
const ArticleDate = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px 10px;
  color: #546e7a;
`;
const ArticleContent = styled.div`
  color: #546e7a;
  padding: 10px 10px 0 10px;
  white-space: pre-line;
  word-break: break-word;
  overflow: hidden;
  text-overflow: elipsis;
  letter-spacing: 1px;
  line-height: 25px;
  font-size: 20px;
`;

function Article({ post }) {
  return (
    <ArticleContainer>
      <ArticleTitle>{post[0].title}</ArticleTitle>
      <ArticleDate>{new Date(post[0].createdAt).toLocaleString()}</ArticleDate>
      <ArticleContent>{post[0].body}</ArticleContent>
    </ArticleContainer>
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
