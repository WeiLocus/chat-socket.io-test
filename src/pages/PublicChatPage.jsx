import { useEffect } from 'react';
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

const dummyUser = {
  avatar: 'http://placekitten.com/g/200/300',
  name: 'user1',
  account: 'user1',
};

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
  useEffect(() => {
    socket.connect();
    return () => {
      socket.emit('leave_chat', currentUser);
      socket.disconnect();
    };
  });

  return (
    <StyledDiv>
      <div>
        <Header headerText="上線使用者(5)" />
        <StyledList>
          <OnlineUserItem user={dummyUser} />
        </StyledList>
      </div>
      <div>
        <ChatRoom />
      </div>
    </StyledDiv>
  );
}
