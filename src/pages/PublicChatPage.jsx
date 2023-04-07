import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Header } from '../components';
import ChatRoom from '../components/ChatRoom';
import { device } from '../globalStyles.js';
import socket from '../socket';
import { useUser } from '../contexts/UserContext';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 3fr 4fr;

  @media screen and (${device.lg}) {
    grid-template-columns: 2.5fr 4.5fr;
  }
`;

const StyledList = styled.div`
  height: calc(100vh - 68px);
  border: 1px solid var(--color-gray-200);
`;

const StyledListItem = styled.li`
  display: grid;
  grid-template-columns: calc(50px + 0.5rem) 1fr;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid var(--color-gray-200);

  img {
    width: 45px;
    height: 45px;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }

  span {
    color: var(--color-secondary);
    margin-left: 0.5rem;
  }
`;

function OnlineUserItem({ user }) {
  return (
    <StyledListItem>
      <img src={user.avatar} alt="avatar" />
      <div>
        <b>{user.name}</b>
        <span>@{user.account}</span>
      </div>
    </StyledListItem>
  );
}

export default function PublicChatPage() {
  const { currentUser } = useUser();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.emit('join_chat', currentUser);
    console.log(`${currentUser.name} joined the chat`);

    return () => {
      socket.emit('leave_chat', currentUser);
      socket.off('join_chat');
      socket.off('user_leave');
      socket.disconnect();
    };
  }, [currentUser]);

  useEffect(() => {
    socket.on('user_join', (data) => {
      if (!onlineUsers.some((user) => user.id === data.id)) {
        const nextOnlineUsers = [...onlineUsers, data];
        setOnlineUsers(nextOnlineUsers);
        console.log('nextOnlineUsers', nextOnlineUsers);
        // console.log(`${data.name} joined`);
        console.log(
          `有使用者加入聊天室。目前共有 ${nextOnlineUsers.length} 位使用者。`
        );
      }
    });

    socket.on('user_leave', (data) => {
      const nextOnlineUsers = onlineUsers.filter((user) => user.id !== data.id);
      setOnlineUsers(nextOnlineUsers);
      console.log(`${data.name} left`);
      console.log(
        `有使用者離開聊天室。目前共有 ${nextOnlineUsers.length} 位使用者。`
      );
    });
    // return () => {
    //   socket.off('user_leave');
    // };
  }, [onlineUsers]);

  return (
    <StyledDiv>
      <div>
        <Header headerText={`上線使用者(${onlineUsers.length})`} />
        <StyledList>
          {onlineUsers.map((user) => {
            return <OnlineUserItem user={user} key={user.id} />;
          })}
        </StyledList>
      </div>
      <div>
        <ChatRoom />
      </div>
    </StyledDiv>
  );
}
