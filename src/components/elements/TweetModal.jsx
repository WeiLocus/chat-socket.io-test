import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { device } from '../../globalStyles.js';
import { ReactComponent as CrossIcon } from '../../assets/Cross.svg';
import { ReactComponent as GoBackIcon } from '../../assets/GoBack.svg';
import { countTimeDiff } from '../../utilities';

const StyledDiv = styled.div`
  position: absolute;
  z-index: 5;
  inset: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: white;

  .close {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--color-gray-200);

    button {
      all: unset;
      cursor: pointer;
    }

    .cross-icon {
      display: none;
    }

    .submit-btn {
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

      &.disabled {
        pointer-events: none;
        opacity: 0.75;
      }
    }
  }

  @media screen and (${device.md}) {
    position: absolute;
    inset: 3.5rem 0;
    width: 650px;
    height: ${(props) => (props.reply ? '450px' : '300px')};
    margin: 0 auto;
    border-radius: 1rem;

    .close {
      display: unset;
      justify-content: unset;
      padding: 1rem;
      color: var(--color-theme);

      .cross-icon {
        display: block;
      }

      .goback-icon {
        display: none;
      }

      .submit-btn {
        display: none;
      }
    }
  }
`;

const StyledTextarea = styled.div`
  flex: 1;
  padding: 1rem;
  padding-right: 1.5rem;
  display: grid;
  grid-template-columns: calc(50px + 0.75rem) 1fr;

  img {
    width: 50px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    overflow: hidden;
  }

  form {
    display: flex;
    flex-direction: column;

    textarea {
      all: unset;
      flex: 1;
      align-self: flex-start;
      width: 100%;
      margin-block: 1rem;
    }

    .submit {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    span {
      color: var(--color-secondary);
      &.error {
        color: var(--color-error);
      }
    }

    button {
      display: none;
    }
  }

  @media screen and (${device.md}) {
    form {
      align-items: flex-end;
      margin-top: 0.75rem;

      textarea {
        width: calc(100% - 1rem);
        margin-block: unset;
      }

      .submit {
        margin-bottom: unset;
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
        &.disabled {
          pointer-events: none;
          opacity: 0.75;
        }
      }
    }
  }
`;

const StyledTweetContent = styled.div`
  display: grid;
  grid-template-columns: calc(50px + 0.75rem) 1fr;
  padding: 1rem;

  img {
    width: 50px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    overflow: hidden;
  }

  .user {
    b {
      margin-right: 0.25rem;
    }
    span {
      color: var(--color-secondary);
      font-size: var(--fs-secondary);
    }
  }

  .content {
    margin-block: 0.5rem;
    color: var(--color-gray-900);
    position: relative;

    &::after {
      content: '';
      width: 2px;
      height: 110%;
      position: absolute;
      top: calc((50px / 2) + 0.5rem);
      left: calc(-0.75rem - 25px);
      background-color: var(--color-gray-500);
    }
  }

  .reply-to {
    color: var(--color-secondary);

    .account {
      margin-left: 0.25rem;
      color: var(--color-theme);
    }
  }

  @media screen and (${device.md}) {
    .content {
      &::after {
        height: 125%;
      }
    }
  }
`;

export function TweetModal({
  tweetInput,
  currentUser,
  onClose,
  onChange,
  onAddTweet,
}) {
  const { avatar } = currentUser;
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      setIsSubmitting(true);
      if (!tweetInput.trim().length) {
        setErrorMessage('內容不可空白');
        setIsSubmitting(false);
        setTimeout(() => {
          setErrorMessage(null);
        }, 1000);
        return;
      }
      if (tweetInput.length > 140) {
        setErrorMessage('字數不可超過 140 字');
        setIsSubmitting(false);
        setTimeout(() => {
          setErrorMessage(null);
        }, 1000);
        return;
      }
      const { status } = await onAddTweet();
      if (status === 'ok') {
        setTimeout(() => {
          setIsSubmitting(false);
          setErrorMessage(null);
          onClose();
        }, 2000);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!tweetInput.trim().length) {
      setErrorMessage('內容不可空白');
      setIsSubmitting(false);
      setTimeout(() => {
        setErrorMessage(null);
      }, 1000);
      return;
    }
    if (tweetInput.length > 140) {
      setErrorMessage('字數不可超過 140 字');
      setIsSubmitting(false);
      setTimeout(() => {
        setErrorMessage(null);
      }, 1000);
      return;
    }
    const { status } = await onAddTweet();
    if (status === 'ok') {
      setTimeout(() => {
        setIsSubmitting(false);
        setErrorMessage(null);
        onClose();
      }, 2000);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <StyledDiv>
      <StyledModal>
        <div className="close">
          <button type="button" onClick={onClose}>
            <CrossIcon className="cross-icon" />
            <GoBackIcon className="goback-icon" />
          </button>
          <button
            className={`submit-btn ${isSubmitting ? 'disabled' : undefined}`}
            type="submit"
            onClick={handleSubmit}
          >
            {isSubmitting ? '送出中...' : '推文'}
          </button>
        </div>
        <StyledTextarea>
          <img src={avatar} alt="avatar" />
          <form>
            <textarea
              name="tweet"
              id="tweet-input"
              type="text"
              placeholder="有什麼新鮮事？"
              value={tweetInput}
              onChange={(event) => {
                onChange?.(event.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <div className="submit">
              <span>{`${tweetInput.length}/140`}</span>
              <div>
                <span className={errorMessage ? 'error' : undefined}>
                  {errorMessage}
                </span>
                <button
                  className={isSubmitting ? 'disabled' : undefined}
                  type="submit"
                  onClick={handleSubmit}
                >
                  {isSubmitting ? '送出中...' : '推文'}
                </button>
              </div>
            </div>
          </form>
        </StyledTextarea>
      </StyledModal>
    </StyledDiv>
  );
}

export function ReplyModal({
  tweet,
  currentUser,
  replyInput,
  onChange,
  onAddReply,
  onClose,
}) {
  const { avatar } = currentUser;
  const { User, createdAt, description } = tweet;
  const timeAgo = countTimeDiff(createdAt);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      setIsSubmitting(true);
      if (!replyInput.trim().length) {
        setErrorMessage('內容不可空白');
        setIsSubmitting(false);
        return;
      }
      if (replyInput.length > 140) {
        setErrorMessage('字數不可超過 140 字');
        setIsSubmitting(false);
        return;
      }
      const { status } = await onAddReply();
      if (status === 'ok') {
        setTimeout(() => {
          setIsSubmitting(false);
          setErrorMessage(null);
          onClose();
        }, 2000);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!replyInput.trim().length) {
      setErrorMessage('內容不可空白');
      setIsSubmitting(false);
      setTimeout(() => {
        setErrorMessage(null);
      }, 1000);
      return;
    }
    if (replyInput.length > 140) {
      setErrorMessage('字數不可超過 140 字');
      setIsSubmitting(false);
      setTimeout(() => {
        setErrorMessage(null);
      }, 1000);
      return;
    }
    const { status } = await onAddReply();
    if (status === 'ok') {
      setTimeout(() => {
        setIsSubmitting(false);
        setErrorMessage(null);
        onClose();
      }, 2000);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <StyledDiv>
      <StyledModal reply>
        <div className="close">
          <button type="button" onClick={onClose}>
            <CrossIcon className="cross-icon" />
            <GoBackIcon className="goback-icon" />
          </button>
          <button
            className={`submit-btn ${isSubmitting ? 'disabled' : undefined}`}
            type="submit"
            onClick={handleSubmit}
          >
            {isSubmitting ? '送出中...' : '回覆'}
          </button>
        </div>
        <StyledTweetContent>
          <img src={User.avatar} alt="avatar" />
          <div>
            <div className="user">
              <b>{User.name}</b>
              <span>@{User.account}</span>
              <span>．</span>
              <span>{timeAgo}</span>
            </div>
            <p className="content">{description}</p>
            <div className="reply-to">
              <span>回覆給</span>
              <span className="account">@{User.account}</span>
            </div>
          </div>
        </StyledTweetContent>
        <StyledTextarea>
          <img src={avatar} alt="avatar" />
          <form>
            <textarea
              className="reply-textarea"
              name="reply"
              id="reply-content"
              value={replyInput}
              placeholder="推你的回覆"
              onChange={(event) => {
                onChange?.(event.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <div className="submit">
              <span>{`${replyInput.length}/140`}</span>
              <div>
                <span className={errorMessage ? 'error' : undefined}>
                  {errorMessage}
                </span>
                <button
                  className={`submit-btn ${
                    isSubmitting ? 'disabled' : undefined
                  }`}
                  type="submit"
                  onClick={handleSubmit}
                >
                  {isSubmitting ? '送出中...' : '回覆'}
                </button>
              </div>
            </div>
          </form>
        </StyledTextarea>
      </StyledModal>
    </StyledDiv>
  );
}
