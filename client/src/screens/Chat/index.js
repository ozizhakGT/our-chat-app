import React, { useState, useCallback, useContext, useEffect } from "react";
import { animateScroll } from "react-scroll";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../context/auth";
import Button from "../../components/Button";
import useChat from "../../hooks/useChat";
import Message from "../../components/Message";
import owner from "../../assets/owner.jpeg";
import partner from "../../assets/partner.jpeg";
import bg from "../../assets/bgConversation.jpeg";
import { fadeInAnimationFromTop } from "../../styles/animations";

const StyledChat = styled.div`
  opacity: 0;
  border-radius: 5px;
  overflow: hidden;
  
  max-width: 100rem;
  min-width: 40rem;
  height: 55rem;
  margin: 7rem auto;
  box-shadow: 0 0 20px 5px rgba(0,0,0, 10%);
  animation: ${fadeInAnimationFromTop} .6s .3s forwards ease-in-out;
  

  .conversation {
    background: linear-gradient(rgba(0 0 0 / 10%), rgba(255 255 255 / 60%), rgba(255 255 255 / 85%)), url(${bg});
    height: 85%;
    min-height: 50%;
    display: flex;
    flex-direction: column;
    
    padding: 2rem;
    box-sizing: border-box;
    overflow-y: scroll;
  }
  
  .field-chat {
    background-color: white;
    height: 15%;
    max-height: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid lightgray;
    padding: 0 15px;
    
    textarea {
      font-size: 1.8rem;
      font-family: inherit;
      flex: .8;
      height: 80%;
      resize: none;
      border: none;
      background-color: transparent;
      
      &:focus {
        outline: none;
      }
    }
  }
  
  @media only screen and (max-width: 1100px) {
    margin: 3rem 2rem;
  }
`

export default function Chat() {
  const {auth: {username, roomId}, logout} = useContext(AuthContext);
  const { push } = useHistory();
  const { messages, sendMessage, isLogout } = useChat({roomId, username});
  const [newMessage, setNewMessage] = useState("");

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: 'conversation',
      smooth: 100,
      delay: 100
    });
  }

  useEffect(() => {
    if (!username) {
      push('/');
    }
  }, [username]);

  useEffect(() => {
    scrollToBottom();
  }, [messages])

  useEffect(() => {
    isLogout && logout();
  }, [isLogout])

  const handleNewMessageChange = ({ target: { value } }) => {
    setNewMessage(value);
  };

  const handleEnterPress = useCallback(({ keyCode }) => {
    if (keyCode === 13) {
      handleSendMessage();
    }
  }, [newMessage])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <StyledChat>
      <div id='conversation' className='conversation'>
        <Message welcomeMessage>Welcome to Room {roomId}</Message>
        {messages.map(({ body, ownedByCurrentUser, ...rest }, index) => <Message key={index} isOwner={ownedByCurrentUser}>
          <div><img src={ownedByCurrentUser ? owner : partner} alt="avatar" /></div>
          <p>
            {body}
            <br/>
            {rest.username && <span>{rest.username} {rest.formatHour}</span>}
          </p>
        </Message>)}
      </div>
      <div className='field-chat'>
        <textarea
          onChange={handleNewMessageChange}
          onKeyUp={handleEnterPress}
          value={newMessage}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </StyledChat>
  )
}
