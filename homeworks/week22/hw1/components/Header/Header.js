import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useLocation, useHistory } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { MEDIA_QUERY_MD, MEDIA_QUERY_SM } from "../../constansts/style";

const HeaderContainer = styled.div`
  height: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: #e0f2f1;
  margin: 0 0 30px 0;
  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    align-items: center;
  }
`;

const Brand = styled.div`
  color: #4f9a94;
  font-weight: bold;
  padding: 15px 20px;

  ${MEDIA_QUERY_MD} {
    font-size: 32px;
  }
  ${MEDIA_QUERY_SM} {
    font-size: 24px;
  }
`;

const NavbarList = styled.div`
  display: flex;
  flex-direction: row;
`;

const Nav = styled(Link)`
  color: #4f9a94;
  padding: 0 15px;
  text-decoration: none;
  height: 100% & + & {
    border-left: 1px solid #66fcf1;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #80cbc4;
    color: #ffffff;
  }
  ${(props) => props.$active && `background: #ffffff;`}
`;

export default function Header() {
  const location = useLocation();
  const history = useHistory();
  const { user, setUser } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.setItem("token", null);
    setUser(null);
    if (location.pathname !== "/") {
      history.push("/index/1");
    }
  };
  return (
    <HeaderContainer>
      <Brand>部落格測試之地</Brand>
      <NavbarList>
        <Nav to="/index/1" $active={/\/index/.test(location.pathname)}>
          Index
        </Nav>
        {user && (
          <Nav to="/new-post" $active={location.pathname === "/new-post"}>
            Post Article
          </Nav>
        )}
        <Nav to="/about-me" $active={location.pathname === "/about-me"}>
          About Me
        </Nav>
        {!user && (
          <Nav to="/login" $active={location.pathname === "/login"}>
            Login
          </Nav>
        )}
        {user && <Nav onClick={handleLogout}>Logout</Nav>}
        {!user && (
          <Nav to="/register" $active={location.pathname === "/register"}>
            Register
          </Nav>
        )}
      </NavbarList>
    </HeaderContainer>
  );
}
