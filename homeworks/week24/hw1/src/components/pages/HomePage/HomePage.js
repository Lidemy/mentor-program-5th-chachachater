import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { getPosts, getPageCount } from "../../../WebAPI";
import PropTypes from "prop-types";
import {
  Root,
  Container,
  LinkTitle,
  Content,
  PostDate,
  LoadingContainer,
} from "../../BlogStyle";

const LimitContentLine = styled(Content)`
  max-height: 75px;
`;
const PaginationConatiner = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 20px 0;
`;
const Page = styled(Link)`
  text-decoration: none;
  margin: 0 10px 0 0;
  padding: 10px;
  color: #ffffff;
  background-color: #82ada9;
  border-radius: 25px;
  &:hover {
    background-color: #80cbc4;
    color: #ffffff;
  }
`;

function Post({ post }) {
  return (
    <Container>
      <LinkTitle to={`/posts/${post.id}`}>{post.title}</LinkTitle>
      <LimitContentLine>{post.body}</LimitContentLine>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </Container>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { page } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPosts(page)
      .then((posts) => {
        setPosts(posts);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [page]);
  useEffect(() => {
    getPageCount().then((pageCount) => {
      setTotalPage(pageCount);
    });
  }, []);

  let havePrevPage = true;
  let haveNextPage = true;
  const prevPageUrl = `/index/${parseInt(page, 10) - 1}`;
  const nextPageUrl = `/index/${parseInt(page, 10) + 1}`;
  if (parseInt(page, 10) - 1 <= 0) {
    havePrevPage = false;
  }
  if (parseInt(page, 10) + 1 > totalPage) {
    haveNextPage = false;
  }
  if (isLoading) return <LoadingContainer />;
  return (
    <Root>
      {posts.map((each) => (
        <Post key={each.id} post={each} />
      ))}
      <PaginationConatiner>
        {havePrevPage && <Page to={prevPageUrl}>Previous Page</Page>}
        {haveNextPage && <Page to={nextPageUrl}>Next Page</Page>}
      </PaginationConatiner>
    </Root>
  );
}
