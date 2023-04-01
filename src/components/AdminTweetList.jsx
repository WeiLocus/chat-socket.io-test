import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';
import { Header, Alert } from './index';
import { StyledListItem } from './TweetList';
import { ReactComponent as Cross } from '../assets/Cross.svg';
import { adminGetTweets, deleteTweet } from '../api/admin';
import { countTimeDiff } from '../utilities';

// follow StyledListItem style by TweetList.jsx
const StyledTweetContainer = styled(StyledListItem)`
  grid-template-columns: calc(50px + 0.5rem) 1fr calc(10px);
  border: none;
  border-top: 1px solid var(--color-gray-200);
  border-bottom: 1px solid var(--color-gray-200);
  cursor: default;
`;

const StyledAdminTweetContainer = styled.div`
  position: relative;
  height: calc(100vh - 68px);
  overflow-y: scroll;
  overflow-x: hidden;
  border-inline: 1px solid var(--color-gray-200);

  .cross {
    width: 1rem;
    height: 1rem;
    padding-left: 0.25rem;
    color: var(--color-gray-700);
    cursor: pointer;

    :hover {
      color: red;
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
const StyledDiv = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  display: grid;
  place-items: center;
  z-index: 999;
`;

export default function AdminTweetList() {
  const [allTweets, setAllTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMessage, setShowMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin');
    }
    const getAllTweets = async () => {
      try {
        const allTweets = await adminGetTweets();
        setAllTweets(allTweets);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getAllTweets();
  }, []);

  const handleDeleteClick = async (id) => {
    const confirmed = window.confirm('確定要刪除這筆推文嗎？');
    if (confirmed) {
      try {
        const { data, status } = await deleteTweet(id);
        if (data && status === 200) {
          setShowMessage('刪除一筆資料');
          setTimeout(() => {
            setShowMessage(false);
          }, 1000);
        }
        setAllTweets((prevAllTweets) =>
          prevAllTweets.filter((tweet) => {
            return tweet.id !== id;
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderedItems = allTweets.map((tweet) => {
    if (!isLoading) {
      return (
        <TweetList key={tweet.id} tweet={tweet} onDelete={handleDeleteClick} />
      );
    }
  });

  return (
    <>
      <Header headerText="推文清單" />
      <StyledAdminTweetContainer>
        {showMessage && (
          <StyledDiv>
            <Alert type="info" message={showMessage} />
          </StyledDiv>
        )}
        {renderedItems}
        {isLoading && (
          <StyledMessage>
            <div>
              <BeatLoader color="var(--color-theme)" />
            </div>
          </StyledMessage>
        )}
      </StyledAdminTweetContainer>
    </>
  );
}
function TweetList({ tweet, onDelete }) {
  const { id, description, createdAt, User } = tweet;
  const { account, addname, avatar } = User;
  const timeAgo = countTimeDiff(createdAt);
  const tweetDescription =
    description.length > 50 ? `${description.slice(0, 50)}...` : description;

  return (
    <StyledTweetContainer>
      <img src={avatar} alt="avatar" />
      <div>
        <div className="user">
          <b>{name}</b>
          <span>@{account}</span>
          <span>．</span>
          <span>{timeAgo}</span>
        </div>
        <p className="content">{tweetDescription}</p>
      </div>
      <div className="cross">
        <Cross onClick={() => onDelete(id)} />
      </div>
    </StyledTweetContainer>
  );
}
