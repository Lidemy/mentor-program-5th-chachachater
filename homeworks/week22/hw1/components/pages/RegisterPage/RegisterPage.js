import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { register, getMe } from "../../../WebAPI";
import { AuthContext } from "../../../AuthContext";
import { Root, Title, Container, InputBlock, ErrMessage } from "../../Common";

export default function RegisterPage() {
  const { user, setUser } = useContext(AuthContext);
  const [nickname, setNickname] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errMessage, setErrMessage] = useState();
  const history = useHistory();
  function handleSubmit(e) {
    setErrMessage(null);
    register(nickname, username, password).then((data) => {
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
  function handleNicknameChange(e) {
    setNickname(e.target.value);
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
          <Title>Register</Title>
          <InputBlock>
            <label>
              <div>Nickname:</div>
              <input
                type="text"
                value={nickname}
                onChange={handleNicknameChange}
              />
            </label>
          </InputBlock>
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
