import { useOutletContext } from 'react-router-dom';
import { StyledList, TweetItem, ReplyItem } from './TweetList';

function UserTweetList() {
  const { shownUser, shownUserTweets } = useOutletContext();
  const renderedItems = shownUserTweets.map((tweet) => {
    return <TweetItem key={tweet.id} tweet={tweet} shownUser={shownUser} />;
  });
  return <StyledList>{renderedItems}</StyledList>;
}

function UserReplyList() {
  const { shownUser, shownUserReplies } = useOutletContext();
  const renderedItems = shownUserReplies.map((reply) => {
    return (
      <ReplyItem
        reply={reply}
        shownUser={shownUser}
        key={reply.id}
        replyTo={reply.replyTo}
      />
    );
  });

  return <StyledList>{renderedItems}</StyledList>;
}

function UserLikeList() {
  const { shownUserLikes } = useOutletContext();
  const renderedItems = shownUserLikes.map((tweet) => {
    return <TweetItem key={tweet.id} tweet={tweet} />;
  });
  return <StyledList>{renderedItems}</StyledList>;
}

export { UserTweetList, UserReplyList, UserLikeList };
