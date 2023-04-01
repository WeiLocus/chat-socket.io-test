/* eslint-disable operator-assignment */
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as CommentIcon } from '../assets/Comment.svg';
import { ReactComponent as LikeIcon } from '../assets/Like.svg';
import { ReactComponent as LikeBlackIcon } from '../assets/Like-black.svg';
import { countTimeDiff } from '../utilities';

const StyledList = styled.ul`
  background-color: white;
`;

const StyledDiv = styled.div`
  position: relative;

  .link-to-user {
    position: absolute;
    top: 1rem;
    left: 1rem;

    img {
      width: 50px;
      aspect-ratio: 1/1;
      margin-right: 0.5rem;
      border-radius: 50%;
      overflow: hidden;
    }
  }
`;

const StyledListItem = styled.li`
  cursor: pointer;
  display: grid;
  grid-template-columns: calc(50px + 0.5rem) 1fr;
  padding: 1rem;
  border: 1px solid var(--color-gray-200);
  background-color: white;

  :hover {
    background-color: var(--color-gray-100);
  }

  img {
    width: 50px;
    aspect-ratio: 1/1;
    margin-right: 0.5rem;
    border-radius: 50%;
    overflow: hidden;
  }

  .user {
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;
  }

  .user b {
    margin-right: 0.25rem;
  }

  .user span {
    color: var(--color-secondary);
    font-size: var(--fs-secondary);
  }

  .reply {
    margin-block: 0.25rem;
    color: var(--color-secondary);
    font-size: var(--fs-secondary);

    span {
      margin-left: 0.25rem;
      color: var(--color-theme);
    }
  }

  .content {
    color: var(--color-gray-900);
  }

  .stats {
    display: flex;
    align-items: center;
    gap: 2.5rem;
    margin-top: 0.5rem;
    color: var(--color-secondary);
    font-size: var(--fs-small);

    .stat {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .icon {
      cursor: pointer;
      width: 15px;
      height: 15px;
    }
  }
`;

function TweetItem({ tweet, shownUser }) {
  const { id, description, createdAt, replyCounts, likeCounts, isLiked, User } =
    tweet;
  const [currentIsLiked, setCurrentIsLiked] = useState(isLiked);
  const timeAgo = countTimeDiff(createdAt);

  const handleLike = () => {
    const nextCurrentIsLiked = !currentIsLiked;
    setCurrentIsLiked(nextCurrentIsLiked);
  };

  return (
    <StyledDiv>
      <NavLink to={`/tweets/${id}`}>
        <StyledListItem>
          <img src={shownUser ? shownUser.avatar : User.avatar} alt="avatar" />
          <div>
            <div className="user">
              <b>{shownUser ? shownUser.name : User.name}</b>
              <span>@{shownUser ? shownUser.account : User.account}</span>
              <span>．</span>
              <span>{timeAgo}</span>
            </div>
            <p className="content">{description}</p>
            <div className="stats">
              <div className="stat">
                <span>
                  <CommentIcon className="icon" />
                </span>
                <span>{replyCounts}</span>
              </div>
              <div className="stat">
                {likeCounts > 0 ? (
                  <LikeBlackIcon className="icon" onClick={handleLike} />
                ) : (
                  <LikeIcon className="icon" onClick={handleLike} />
                )}
                <span>{likeCounts}</span>
              </div>
            </div>
          </div>
        </StyledListItem>
      </NavLink>
      <NavLink
        to={`/users/${shownUser ? shownUser.id : User.id}/tweets`}
        className="link-to-user"
      >
        <img src={shownUser ? shownUser.avatar : User.avatar} alt="avatar" />
      </NavLink>
    </StyledDiv>
  );
}

function ReplyItem({ reply, replyTo, shownUser }) {
  const { comment, createdAt, User } = reply;
  const timeAgo = countTimeDiff(createdAt);

  return (
    <StyledListItem>
      <NavLink to={`/users/${shownUser ? shownUser.id : User.id}/tweets`}>
        <img src={shownUser ? shownUser.avatar : User.avatar} alt="avatar" />
      </NavLink>
      <div>
        <div className="user">
          <b>{shownUser ? shownUser.name : User.name}</b>
          <span>@{shownUser ? shownUser.account : User.account}</span>
          <span>．</span>
          <span>{timeAgo}</span>
        </div>
        <p className="reply">
          回覆
          <span>@{replyTo}</span>
        </p>
        <p className="content">{comment}</p>
      </div>
    </StyledListItem>
  );
}

function TweetList({ user, tweets }) {
  const renderedItems = tweets.map((tweet) => {
    return <TweetItem key={tweet.id} currentUser={user} tweet={tweet} />;
  });

  return <StyledList>{renderedItems}</StyledList>;
}

function ReplyList({ replies, replyTo }) {
  const renderedItems = replies.map((reply) => {
    return (
      <ReplyItem key={reply.id} reply={reply} replyTo={replyTo.User.account} />
    );
  });
  return <StyledList>{renderedItems}</StyledList>;
}

export {
  StyledListItem,
  StyledList,
  TweetList,
  ReplyList,
  TweetItem,
  ReplyItem,
};
