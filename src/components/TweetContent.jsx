import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../globalStyles.js';
import { ReactComponent as CommentIcon } from '../assets/Comment.svg';
import { ReactComponent as LikeIcon } from '../assets/Like.svg';
import { ReactComponent as LikeBlackIcon } from '../assets/Like-black.svg';
import { ReplyModal } from './index';
import { useUser } from '../contexts/UserContext';
import { getConvertedTime } from '../utilities';

const StyledDiv = styled.div`
  padding: 1rem;
  border: 1px solid var(--color-gray-200);
  background-color: white;

  .user {
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;

    img {
      width: 50px;
      aspect-ratio: 1/1;
      margin-right: 0.5rem;
      border-radius: 50%;
      overflow: hidden;
    }

    div {
      display: flex;
      flex-direction: column;
    }

    b {
      margin-right: 0.25rem;
    }

    span {
      color: var(--color-secondary);
      font-size: var(--fs-secondary);
    }
  }

  .content {
    color: var(--color-gray-900);
    font-size: var(--fs-h4);
  }

  .time-stamp {
    padding-block: 0.5rem;
    border-bottom: 1px solid var(--color-gray-200);
    color: var(--color-secondary);
    font-size: var(--fs-secondary);
  }

  .stats {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding-block: 1rem;
    border-bottom: 1px solid var(--color-gray-200);
    color: var(--color-secondary);
    font-size: var(--fs-h5);

    span {
      margin-right: 0.25rem;
      color: var(--color-gray-900);
      font-weight: 700;
    }
  }

  .reaction {
    display: flex;
    gap: 3rem;
    padding-top: 1rem;
    color: var(--color-secondary);

    button {
      all: unset;
      cursor: pointer;

      :hover {
        color: var(--color-theme);
      }

      &.disabled {
        pointer-events: none;
      }
    }
  }

  @media screen and (${device.md}) {
    .reaction {
      gap: 9rem;
    }
  }
`;

const StyledMobileReplyDiv = styled.div`
  display: grid;
  grid-template-columns: calc(50px + 0.5rem) 1fr auto;
  align-items: center;
  padding: 1rem;

  img {
    width: 50px;
    aspect-ratio: 1/1;
    margin-right: 0.5rem;
    border-radius: 50%;
    overflow: hidden;
  }

  p {
    color: var(--color-secondary);
  }

  button {
    all: unset;
    cursor: pointer;
    padding: 0.5rem 1rem;
    margin-left: 1rem;
    border: 1px solid var(--color-theme);
    border-radius: 3.125rem;
    color: white;
    background-color: var(--color-theme);
    font-size: var(--fs-basic);

    :hover {
      border: 1px solid var(--color-light-orange);
      background-color: var(--color-light-orange);
    }
  }

  @media screen and (${device.md}) {
    display: none;
  }
`;

export default function TweetContent({
  tweet,
  currentUser,
  replyInput,
  onChange,
  onAddReply,
}) {
  const { id, description, createdAt, replyCounts, likeCounts, User } = tweet;
  const { convertedDate, convertedTime } = getConvertedTime(createdAt);
  const { userLikes, handleLike } = useUser();
  const [currentLikeCounts, setCurrentLikeCounts] = useState(likeCounts);
  const [showModal, setShowModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const isLiked = userLikes.includes(id);

  const handleShowModal = () => {
    const nextShowModal = !showModal;
    setShowModal(nextShowModal);
  };

  const handleLikeClick = async () => {
    setDisabled(true);
    await handleLike(id);
    if (isLiked) {
      setCurrentLikeCounts((prev) => prev - 1);
    } else {
      setCurrentLikeCounts((prev) => prev + 1);
    }
    setDisabled(false);
  };

  return (
    <>
      <StyledDiv>
        <div className="user">
          <NavLink to={`/users/${User.id}/tweets`}>
            <img src={User.avatar} alt="avatar" />
          </NavLink>
          <div>
            <b>{User.name}</b>
            <span>@{User.account}</span>
          </div>
        </div>
        <p className="content">{description}</p>
        <div className="time-stamp">
          <span>{convertedTime}</span>
          <span>．</span>
          <span>{convertedDate}</span>
        </div>
        <div className="stats">
          <p>
            <span>{replyCounts}</span>回覆
          </p>
          <p>
            <span>{currentLikeCounts}</span>喜歡次數
          </p>
        </div>
        <div className="reaction">
          <button type="button" onClick={handleShowModal}>
            <CommentIcon className="icon" />
          </button>
          <button type="button" className={disabled ? 'disabled' : undefined}>
            {isLiked ? (
              <LikeBlackIcon className="icon" onClick={handleLikeClick} />
            ) : (
              <LikeIcon className="icon" onClick={handleLikeClick} />
            )}
          </button>
        </div>
      </StyledDiv>
      <StyledMobileReplyDiv className="mobile-reply" onClick={handleShowModal}>
        <img src={currentUser.avatar} alt="" />
        <p>推你的回覆</p>
        <button type="button">回覆</button>
      </StyledMobileReplyDiv>
      {showModal && (
        <ReplyModal
          tweet={tweet}
          currentUser={currentUser}
          replyInput={replyInput}
          onChange={onChange}
          onAddReply={onAddReply}
          onClose={handleShowModal}
        />
      )}
    </>
  );
}
