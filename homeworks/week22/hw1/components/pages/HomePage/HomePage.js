import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { getPosts, getAllPosts } from "../../../WebAPI";
import PropTypes from "prop-types";

const Root = styled.div`
  width: 80%;
  margin: auto;
`;
const PostContainer = styled.div`
  margin: 20px auto;
`;
const PostTitle = styled(Link)`
  text-decoration: none;
  color: #546e7a;
  font-weight: bold;
  font-size: 24px;
  background-color: #b2dfdb;
  display: block;
  padding: 5px 10px;
`;
const PostContent = styled.div`
  color: #546e7a;
  padding: 10px 10px 0 10px;
  word-break: break-word;
  overflow: hidden;
  text-overflow: elipsis;
  letter-spacing: 1px;
  line-height: 25px;
  font-size: 20px;
  max-height: 75px;
`;
const PostDate = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px 10px;
  color: #546e7a;
`;
const PaginationConatiner = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 20px 0;
`;
const PrevPage = styled(Link)`
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
const NextPage = styled(Link)`
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
const LoadingContainer = styled.div``;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostContent>{post.body}</PostContent>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const pageArr = [];
  const { page } = useParams();
  pageArr.push(page);
  useEffect(() => {
    setIsLoading(true);
    getPosts(page)
      .then((posts) => {
        setPosts(posts);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, pageArr);
  useEffect(() => {
    getAllPosts().then((posts) => {
      setTotalPage(Math.ceil(posts.length / 5));
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
        {havePrevPage && <PrevPage to={prevPageUrl}>Previous Page</PrevPage>}
        {haveNextPage && <NextPage to={nextPageUrl}>Next Page</NextPage>}
      </PaginationConatiner>
    </Root>
  );
}
