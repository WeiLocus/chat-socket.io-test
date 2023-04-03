/* eslint-disable react/button-has-type */
import styled from 'styled-components';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Header } from '.';
import { ReactComponent as SendMessage } from '../assets/SendMessage.svg';

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

    .message {
      background-color: pink;
      padding: 10px;

      .message-content {
        display: flex;
        align-items: center;
        min-height: 40px;
        max-width: 120px;
        margin-right: 5px;
        margin-left: 5px;
        padding-right: 1rem;
        padding-left: 1rem;
        background-color: var(--color-gray-200);
        border-radius: 30px 30px 30px 0px;
      }

      .message-meta {
        justify-content: flex-end;
        margin-top: 2px;
        margin-left: 5px;
        color: var(--color-gray-700);
        font-weight: 400;
        font-size: 0.8rem;
      }
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

const socket = io.connect('http://localhost:3001');

export default function ChatRecord() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const handleSendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        message: currentMessage,
        time: `${new Date(Date.now()).getHours()}:${new Date(
          Date.now()
        ).getMinutes()}`,
      };
      // send messsageDate to back-end
      await socket.emit('send_message', messageData);
      // setMessageList((list) => [...list, messageData]);
      // setCurrentMessage('')
    }
  };
  useEffect(() => {
    socket.on('receive_message', (data) => {
      // console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, []);
  return (
    <>
      <Header headerText="公開聊天室" />
      <StyledDiv>
        <div className="chat-window">
          <div className="chat-body">
            <ScrollToBottom className="message-container">
              {messageList.map((messageContent, index) => {
                return (
                  <div
                    className="message"
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                  >
                    <div>
                      <div className="message-content">
                        <p>{messageContent.message}</p>
                      </div>
                      <div className="message-meta">
                        <p id="time">{messageContent.time}</p>
                      </div>
                    </div>
                  </div>
                );
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
