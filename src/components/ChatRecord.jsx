/* eslint-disable react/button-has-type */
import styled from 'styled-components';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Header } from '.';
import { ReactComponent as SendMessage } from '../assets/SendMessage.svg';
import { useUser } from '../contexts/UserContext';

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
    overflow-warp: break-word;
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

function UserNotification({ user, action }) {
  return <div>User A joined the chat</div>;
}

const StyledDiv = styled.div`
  height: calc(100vh - 68px);

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

export default function ChatRecord() {
  const { currentUser } = useUser();
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  console.log(currentUser);

  const handleSendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        author: currentUser,
        message: currentMessage,
        time: `${new Date(Date.now()).getHours()}:${new Date(
          Date.now()
        ).getMinutes()}`,
      };
      // send messsageDate to back-end
      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };
  useEffect(() => {
    const socket = io.connect('http://localhost:3001', {
      query: {
        username: currentUser.name,
      },
    });
    console.log(`${currentUser.name} joined the chat`);
    socket.on('receive_message', (data) => {
      // console.log(data);
      setMessageList((list) => [...list, data]);
      console.log('message received!');
    });
  }, []);

  return (
    <>
      <Header headerText="公開聊天室" />
      <StyledDiv>
        <div className="chat-window">
          <div className="chat-body">
            <ScrollToBottom className="message-container">
              {messageList.map((message, index) => {
                return <ChatMessage message={message} key={index} />;
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
