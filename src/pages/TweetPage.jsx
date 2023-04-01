import { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';
import { device } from '../globalStyles';
import { Header, TweetInput, TweetList } from '../components';
import { getTweets } from '../api/tweet';

const StyledDiv = styled.div`
  height: calc(100vh - 60px);
  overflow-y: scroll;
  padding-top: 82px;
  padding-bottom: 60px;

  .tweet-input {
    display: none;
  }
  @media screen and (${device.md}) {
    height: calc(100vh - 68px);
    padding-top: unset;
    padding-bottom: unset;

    .tweet-input {
      display: block;
    }
  }
`;

const StyledMessage = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: grid;
  place-items: center;
  border-inline: 2px solid var(--color-gray-200);
  color: var(--color-secondary);
`;

export default function TweetPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const {
    currentUser,
    tweets,
    setTweets,
    tweetInput,
    handleInputChange,
    handleAddTweet,
  } = useOutletContext();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const getTweetsAsync = async () => {
      try {
        const tweets = await getTweets();
        setTweets(tweets);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getTweetsAsync();
  }, []);

  return (
    <>
      <Header headerText="首頁" />
      <StyledDiv>
        <div className="tweet-input">
          <TweetInput
            tweetInput={tweetInput}
            currentUser={currentUser}
            onChange={handleInputChange}
            onAddTweet={handleAddTweet}
          />
        </div>
        {!isLoading && (
          <TweetList user={currentUser} tweets={tweets} type="tweet" />
        )}
        {isLoading && (
          <StyledMessage>
            <div>
              <BeatLoader color="var(--color-theme)" />
            </div>
          </StyledMessage>
        )}
      </StyledDiv>
    </>
  );
}
