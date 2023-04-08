/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Header } from '.';
import { ReactComponent as SendMessage } from '../assets/SendMessage.svg';
import { useUser } from '../contexts/UserContext';
import socket from '../socket.js';

const StyledMessage = styled.div`
  padding: 10px;
  display: flex;

  img {
    width: 45px;
    height: 45px;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }

  .message-content {
    display: flex;
    align-items: center;
    min-height: 40px;
    width: fit-content;
    max-width: 20ch;
    margin-inline: 5px;
    padding: 0.5rem 1rem;
    background-color: var(--color-gray-200);
    border-radius: 30px 30px 30px 0px;
    word-break: break-word;
  }

  .message-meta {
    justify-content: flex-end;
    margin-top: 2px;
    margin-left: 5px;
    color: var(--color-gray-700);
    font-weight: 400;
    font-size: 0.8rem;
  }

  &.self {
    justify-content: end;

    img {
      display: none;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: end;
    }
    .message-content {
      border-radius: 30px 30px 0 30px;
      background-color: var(--color-theme);
      color: white;
    }

    .message-meta {
      margin-right: 5px;
    }
  }
`;

function ChatMessage({ message }) {
  const { currentUser } = useUser();

  return (
    <StyledMessage className={message.author.id === currentUser.id && 'self'}>
      <img src={message.author.avatar} alt="avatar" />
      <div>
        <div className="message-content">
          <p>{message.message}</p>
        </div>
        <div className="message-meta">
          <p id="time">{message.time}</p>
        </div>
      </div>
    </StyledMessage>
  );
}

const StyledDiv = styled.div`
  height: calc(100vh - 68px);
  width: 100%;

  .chat-body {
    height: calc(100vh - (68px + 64px));
    border: 1px solid var(--color-gray-200);

    .message-container {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }

  .chat-footer {
    height: 64px;
    border: 1px solid var(--color-gray-200);
    border-top: none;
    padding: 1rem;
    display: flex;
    align-items: center;

    input {
      width: 100%;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      border: 0;
      background-color: var(--color-gray-300);
      border-radius: 30px;
      :focus {
        outline: none;
      }
    }

    .icon {
      margin-left: 0.5rem;
      cursor: pointer;
    }
  }
`;

// const socket = io.connect('http://localhost:3001');
// const socket = io.connect('https://murmuring-plains-40389.herokuapp.com/');

export default function PrivateChatRoom() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const handleSendMessage = async () => {};

  return (
    <>
      {/* 取決從訊息拿出來的name和account */}
      <Header headerText="name" />
      <StyledDiv>
        <div className="chat-window">
          <div className="chat-body">
            <ScrollToBottom className="message-container">
              {messageList.map((message, index) => {
                if (message.type === 'message') {
                  return <ChatMessage message={message} key={index} />;
                }
              })}
            </ScrollToBottom>
          </div>
          <div className="chat-footer">
            <input
              type="text"
              placeholder="輸入訊息..."
              value={currentMessage}
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
            />
            <div className="icon">
              <SendMessage onClick={handleSendMessage} />
            </div>
          </div>
        </div>
      </StyledDiv>
    </>
  );
}
