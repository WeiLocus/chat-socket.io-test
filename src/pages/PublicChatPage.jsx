import styled from 'styled-components';
import { Header } from '../components';
import ChatRecord from '../components/ChatRecord';
import { device } from '../globalStyles.js';

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
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid var(--color-gray-200);
`;

export default function PublicChatPage() {
  return (
    <StyledDiv>
      <div>
        <Header headerText="上線使用者(5)" />
        <StyledList>
          <StyledListItem>
            <img src="http://placekitten.com/g/200/300" alt="avatar" />
            <div>
              <b>name</b>
              <span>@account</span>
            </div>
          </StyledListItem>
        </StyledList>
      </div>
      <div>
        <ChatRecord />
      </div>
    </StyledDiv>
  );
}
