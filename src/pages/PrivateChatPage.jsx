import styled from 'styled-components';
import { Header } from '../components';
import ChatRoom from '../components/ChatRoom';
import { device } from '../globalStyles';
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

export default function PrivateChatPage() {
  const { currentUser } = useUser();

  return (
    <StyledDiv>
      <div>
        <Header headerText="上線使用者(3)" />
        <StyledList>
          <div>users</div>
          {/* {onlineUsers.map((user) => {
            return <OnlineUserItem user={user} key={user.id} />;
          })} */}
        </StyledList>
      </div>
      {/* <div>
        <ChatRoom />
      </div> */}
    </StyledDiv>
  );
}
