import { useState, useEffect } from 'react';
import { useParams, Outlet, useLocation } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';
import { device } from '../globalStyles';
import { Header, Profile } from '../components';
import { useUser } from '../contexts/UserContext';
import {
  getUserData,
  getUserTweets,
  getUserReplies,
  getUserLikes,
} from '../api/user';

const StyledDiv = styled.div`
  height: calc(100vh - 60px);
  overflow-y: scroll;
  padding-top: 68px;
  padding-bottom: 60px;

  @media screen and (${device.md}) {
    height: calc(100vh - 73px);
    padding-top: unset;
    padding-bottom: unset;
  }
`;

const StyledMessage = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  display: grid;
  place-items: center;
  border-inline: 2px solid var(--color-gray-200);
  color: var(--color-secondary);
`;

export default function UserPage() {
  // 從網址取得要顯示的 user id
  const { id } = useParams();
  const { pathname } = useLocation();
  const { currentUser } = useUser();
  const [shownUser, setShownUser] = useState(currentUser);
  const [shownUserTweets, setShownUserTweets] = useState([]);
  const [shownUserReplies, setShownUserReplies] = useState([]);
  const [shownUserLikes, setShownUserLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserPageDataAsync = async () => {
    setIsLoading(true);
    try {
      const user = await getUserData(id);
      const userTweets = await getUserTweets(id);
      const userReplies = await getUserReplies(id);
      const userLikes = await getUserLikes(id);
      setShownUser(user);
      setShownUserTweets(userTweets);
      setShownUserReplies(userReplies);
      setShownUserLikes(userLikes);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserPageDataAsync();
  }, [id]);

  return (
    <>
      {isLoading && (
        <StyledMessage>
          <div>
            <BeatLoader color="var(--color-theme)" />
          </div>
        </StyledMessage>
      )}
      {!isLoading && (
        <>
          <Header
            headerText={shownUser.name}
            user={shownUser}
            goBack
            shownUserTweets={shownUserTweets}
          />
          <StyledDiv>
            <div className="profile">
              <Profile
                user={shownUser}
                key={shownUser.id}
                onProfileChange={getUserPageDataAsync}
              />
            </div>
            <Outlet
              context={{
                currentUser,
                shownUser,
                shownUserTweets,
                shownUserReplies,
                shownUserLikes,
              }}
            />
          </StyledDiv>
        </>
      )}
    </>
  );
}
