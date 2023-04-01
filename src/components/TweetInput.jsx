import { useState } from 'react';
import styled from 'styled-components';

const StyledTextarea = styled.div`
  flex: 1;
  padding: 1rem;
  display: grid;
  grid-template-columns: calc(50px + 0.75rem) 1fr;
  border: 1px solid var(--color-gray-200);
  border-bottom: 10px solid var(--color-gray-200);

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
      align-items: end;
    }

    span {
      color: var(--color-secondary);
      &.error {
        color: var(--color-error);
      }
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
`;

export default function TweetInput({
  tweetInput,
  currentUser,
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
      }, 2000);
    }
  };

  return (
    <StyledTextarea>
      <img src={avatar} alt="avatar" />
      <form>
        <textarea
          name="tweet"
          id="tweet-input"
          type="text"
          placeholder="有什麼新鮮事？"
          rows="3"
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
  );
}
