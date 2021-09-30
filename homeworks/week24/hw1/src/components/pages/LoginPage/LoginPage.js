import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Root,
  Title,
  Container,
  InputBlock,
  ErrMessage,
} from "../../UserStyle";
import { loginAsync, selectUser } from "../../../redux/reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";

export default function LoginPage() {
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
    const userData = {
      username,
      password,
    };
    dispatch(loginAsync(userData));
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
