import React, {useState, useContext, useEffect} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/auth";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import colors from "../../styles/colors";
import {fadeInAnimationFromTop} from "../../styles/animations";

const StyledHome = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  & > div:first-child {
    opacity: 0;
    position: relative;
    background-color: ${colors.blue2};
    width: 40rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    border-radius: 9px;
    animation: ${fadeInAnimationFromTop} .4s .2s forwards ease-in-out;
  }
  
  ${Button} {
    background-color: transparent;
    border: 1px solid blanchedalmond;
    align-self: center;
    margin-top: 2rem;
  }
  
  ${ErrorMessage} {
    top: -2rem;
    left: 50%;
    transform: translateX(-50%);
  }
`

export default function Login() {
  const {auth, login} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState(auth.roomId);
  const [isFormValid, setIsFormValid] = useState(true);
  const { push } = useHistory();

  useEffect(() => {
    if (auth.username) {
      push(`/chat/${roomId}`)
    }
  }, [auth.username]);

  const handleSubmit = () => {
    if (!username.trim() || !roomId.trim()) {
      setIsFormValid(false);

      return;
    }

    login({username, roomId});
  }

  return (
    <StyledHome>
      <div>
        <div className="row">
          <label htmlFor="username">Username</label>
          <Input
            value={username}
            autoComplete="off"
            onChange={({target: {value}}) => setUsername(value)}
            id="username"
            name="username"
            type="text"
          />
        </div>
        <br/>
        <div className="row">
          <label htmlFor="RoomId">Room</label>
          <Input
            value={roomId}
            autoComplete="off"
            onChange={({target: {value}}) => setRoomId(value)}
            id="RoomId"
            name="RoomId"
            type="text"/>
        </div>
        {!isFormValid && <ErrorMessage>All Fields Mandatory</ErrorMessage>}
        <Button onClick={handleSubmit}>Login</Button>

      </div>
    </StyledHome>
  )
}
