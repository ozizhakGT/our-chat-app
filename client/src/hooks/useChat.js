import { useEffect, useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = process.env.REACT_APP_NEW_MESSAGE_EVENT; // Name of the event
const SOCKET_SERVER_URL = process.env.REACT_APP_SERVER_BASE_URL;

const useChat = ({roomId, username}) => {
  const { push } = useHistory();
  const [messages, setMessages] = useState([]); // Sent and received messages
  const [isLogout, setIsLogout] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId, username },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };

      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.on('my-error', text => alert(text));

    socketRef.current.on('connect_error', err => {
      setIsLogout(true);
      alert("Cannot Connect, please try again later..");
    })

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage, isLogout};
};

export default useChat;
