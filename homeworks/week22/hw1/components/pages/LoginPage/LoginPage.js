import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { login, getMe } from "../../../WebAPI";
import { AuthContext } from "../../../AuthContext";
import { Root, Title, Container, InputBlock, ErrMessage } from "../../Common";

export default function LoginPage() {
  const { user, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errMessage, setErrMessage] = useState();
  const history = useHistory();
  function handleSubmit(e) {
    setErrMessage(null);
    login(username, password).then((data) => {
      if (!data.ok) {
        localStorage.setItem("token", null);
        return setErrMessage(data.message);
      }
      const { token } = data;
      localStorage.setItem("token", token);
      getMe().then((data) => {
        if (!data.ok) {
          localStorage.setItem("token", null);
          return setErrMessage(data.message);
        }
        setUser(data.data);
        history.push("/index/1");
      });
    });
  }
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  return (
    <Root>
      <Container>
        <form onSubmit={handleSubmit}>
          <Title>LoginPage</Title>
          <InputBlock>
            <label>
              <div>Username:</div>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />
            </label>
          </InputBlock>
          <InputBlock>
            <label>
              <div>Password:</div>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </label>
          </InputBlock>
          <InputBlock>
            <button type="submit" value="submit">
              submit
            </button>
          </InputBlock>
          {errMessage && <ErrMessage>{errMessage}</ErrMessage>}
        </form>
      </Container>
    </Root>
  );
}
