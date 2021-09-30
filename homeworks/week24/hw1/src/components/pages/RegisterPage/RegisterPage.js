import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { registerAsync, selectUser } from "../../../redux/reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  Root,
  Title,
  Container,
  InputBlock,
  ErrMessage,
} from "../../UserStyle";

export default function RegisterPage() {
  const [nickname, setNickname] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errMessage, setErrMessage] = useState();
  const history = useHistory();
  const userState = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userState.data) return;
    if (userState.data.ok) {
      history.push("/index/1");
    } else {
      setErrMessage(userState.data.message);
    }
  }, useState.data);
  function handleSubmit(e) {
    e.preventDefault();
    setErrMessage(null);
    const userData = {
      nickname,
      username,
      password,
    };
    dispatch(registerAsync(userData));
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
