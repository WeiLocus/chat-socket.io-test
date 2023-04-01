import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';
import { device } from '../globalStyles';
import { Header, TweetContent, ReplyList } from '../components';
import { useUser } from '../contexts/UserContext';
import { getSingleTweet, getReplies, addReply } from '../api/tweet';

const StyledDiv = styled.div`
  height: calc(100vh - 60px);
  overflow-y: scroll;
  padding-top: 62px;
  padding-bottom: 60px;
  border-inline: 1px solid var(--color-gray-200);

  @media screen and (${device.md}) {
    height: calc(100vh - 68px);
    padding-top: unset;
    padding-bottom: unset;
  }
`;

const StyledLoadingDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  text-align: center;
  color: var(--color-secondary);
`;

const StyledNoReplyDiv = styled.div`
  width: 100%;
  padding-top: 2rem;
  text-align: center;
  color: var(--color-secondary);
`;

export default function ReplyPage() {
  // 注意 id 是字串
  const { id } = useParams();
  const { currentUser } = useUser();
  const [selectedTweet, setSelectedTweet] = useState({});
  const [tweetReplies, setTweetReplies] = useState([]);
  const [replyInput, setReplyInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSingleTweetAsync = async () => {
      try {
        const tweet = await getSingleTweet(id);
        const replies = await getReplies(id);
        if (replies !== undefined) {
          setTweetReplies(replies);
        }
        setSelectedTweet(tweet);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getSingleTweetAsync();
  }, []);

  const handleInputChange = (value) => {
    setReplyInput(value);
  };

  const handleAddReply = async () => {
    try {
      const data = await addReply({
        id: selectedTweet.id,
        comment: replyInput,
      });
      if (data === 'error') return;
      // 重新setTweets
      const nextTweetReplies = [
        {
          id: data.id,
          comment: data.comment,
          createdAt: data.createdAt,
          User: {
            id: currentUser.id,
            account: currentUser.account,
            name: currentUser.name,
            avatar: currentUser.avatar,
          },
        },
        ...tweetReplies,
      ];

      const nextSelectedTweet = {
        ...selectedTweet,
        User: { ...selectedTweet.User },
        replyCounts: selectedTweet.replyCounts + 1,
      };
      setTimeout(() => {
        setTweetReplies(nextTweetReplies);
        setSelectedTweet(nextSelectedTweet);
        setReplyInput('');
      }, 2000);
      return { status: 'ok' };
    } catch (error) {
      console.log(error);
      return { status: 'error' };
    }
  };

  return (
    <>
      <Header headerText="推文" goBack />
      <StyledDiv>
        {isLoading && (
          <StyledLoadingDiv>
            <div>
              <BeatLoader color="var(--color-theme)" />
            </div>
          </StyledLoadingDiv>
        )}
        {!isLoading && (
          <TweetContent
            tweet={selectedTweet}
            currentUser={currentUser}
            replyInput={replyInput}
            onChange={handleInputChange}
            onAddReply={handleAddReply}
          />
        )}
        {!isLoading && tweetReplies !== null && (
          <ReplyList replies={tweetReplies} replyTo={selectedTweet} />
        )}
        {!isLoading && tweetReplies.length === 0 && (
          <StyledNoReplyDiv>該貼文目前沒有回覆</StyledNoReplyDiv>
        )}
      </StyledDiv>
    </>
  );
}
