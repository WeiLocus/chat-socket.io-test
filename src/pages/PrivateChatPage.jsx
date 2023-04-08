import styled from 'styled-components';
import { Header } from '../components';
import PrivateChatRoom from '../components/PrivateChatRoom';
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
  grid-template-columns: calc(50px + 0.5rem) 1fr 80px;
  height: 100px;
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
  .user {
    display: flex;
    width: 14rem;

    b {
      width: 60%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    span {
      color: var(--color-secondary);
      width: 40%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  .message {
    font-size: var(--fs-basic);
    color: var(--color-gray-700);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .time {
    align-self: flex-start;
    padding-top: 0.5rem;
    text-align: end;
    color: var(--color-gray-700);
  }
`;

function UserItem({ name, account, messages }) {
  return (
    <StyledListItem>
      <img
        src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/268.jpg"
        alt="avatar"
      />
      <div>
        <div className="user">
          <b>{name}</b>
          <span>@{account}</span>
        </div>
        <p className="message">{messages}</p>
      </div>
      <div className="time">6月30日</div>
    </StyledListItem>
  );
}

export default function PrivateChatPage() {
  const { currentUser } = useUser();

  return (
    <StyledDiv>
      <div>
        <Header headerText="訊息" />
        <StyledList>
          <UserItem name="John" account="1234567899" messages="Hello" />
          <UserItem
            name="Amyyyyyjjjjjjjjjjjjjjjjj"
            account="12345678"
            messages="Uncaught TypeError: user is undefined"
          />
        </StyledList>
      </div>
      <div>
        <PrivateChatRoom />
      </div>
    </StyledDiv>
  );
}
