import styled from 'styled-components';
import { Header } from '.';

const StyledDiv = styled.div`
  height: calc(100vh - 68px);
  /* background-color: #e9f5f7; */
`;

export default function ChatRecord() {
  return (
    <>
      <Header headerText="公開聊天室" />
      <StyledDiv>ChatRecord</StyledDiv>
    </>
  );
}
