import React, { useState, useCallback, useContext, useEffect } from "react";
import { animateScroll } from "react-scroll";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../context/auth";
import Button from "../../components/Button";
import { useParams } from "react-router-dom";
import useChat from "../../hooks/useChat";
import Message from "../../components/Message";
import owner from "../../assets/owner.jpeg";
import partner from "../../assets/partner.jpeg";
import bg from "../../assets/bgConversation.jpeg";

const StyledChat = styled.div`
  border: 1px burlywood solid;
  overflow: hidden;
  
  max-width: 100rem;
  min-width: 40rem;
  height: 55rem;
  margin: 20px auto;

  .conversation {
    background-image: url(${bg});
    height: 85%;
    display: flex;
    flex-direction: column;
    
    padding: 2rem;
    box-sizing: border-box;
    overflow-y: scroll;
  }
  
  .field-chat {
    background-color: white;
    height: 15%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid;
    padding: 0 15px;
    
    textarea {
      font-size: 1.8rem;
      font-family: inherit;
      flex: .8;
      height: 70%;
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
  const {auth} = useContext(AuthContext);
  const { push } = useHistory();
  const { roomId="lobby" } = useParams();
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = useState("");

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: 'conversation',
      smooth: 100,
      delay: 100
    });
  }

  useEffect(() => {
    if (!auth.username) {
      push('/');
    }
  }, [auth.username]);

  useEffect(() => {
    scrollToBottom();
  }, [messages])

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
        {messages.map(({ body, ownedByCurrentUser }) => <Message key={uuid()} isOwner={ownedByCurrentUser}>
          <div><img src={ownedByCurrentUser ? owner : partner} alt="avatar" /></div>
          <p>{body}</p>
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
