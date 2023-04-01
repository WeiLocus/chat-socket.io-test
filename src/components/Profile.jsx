import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../globalStyles.js';
import { EditModal } from './index';
import { ReactComponent as EmailIcon } from '../assets/Email.svg';
import { ReactComponent as NotificationIcon } from '../assets/Notification.svg';
import { useUser } from '../contexts/UserContext';

const StyledDiv = styled.div`
  position: relative;

  background-color: white;

  .cover {
    height: 150px;
    overflow: hidden;

    img {
      object-fit: cover;
    }
  }

  .avatar {
    position: absolute;
    top: 7rem;
    left: 1rem;
    width: 80px;
    aspect-ratio: 1/1;
    border: 3px solid white;
    border-radius: 50%;
    overflow: hidden;
  }

  @media screen and (${device.md}) {
    border: 1px solid var(--color-gray-200);
    display: ${(props) =>
      props.pathname.includes('follow') ? 'none' : 'block'};

    .cover {
      height: 200px;
    }

    .avatar {
      top: 7.75rem;
      left: 1rem;
      width: 140px;
      border: 4px solid white;
    }
  }
`;

const StyledContentDiv = styled.div`
  padding: 1rem 1.5rem;
  color: var(--color-gray-900);
  font-size: var(--fs-basic);

  .user {
    margin: 0.5rem 0 0.25rem;
    font-size: var(--fs-h5);

    p {
      color: var(--color-secondary);
      font-size: var(--fs-secondary);
    }
  }

  .stats {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-block: 0.5rem;
    color: var(--color-secondary);
    font-size: var(--fs-secondary);

    a:hover {
      color: var(--color-gray-900);
    }

    span {
      margin-right: 0.25rem;
      color: var(--color-gray-900);
    }
  }

  @media screen and (${device.md}) {
    padding: 1rem;
    font-size: var(--fs-secondary);

    .user {
      margin: 0.75rem 0 0.25rem;
    }
  }
`;

const StyledEditDiv = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 0.5rem;

  .icon {
    cursor: pointer;
    padding: 0.3rem;
    border: 1px solid var(--color-theme);
    border-radius: 50%;
    color: var(--color-theme);

    :hover {
      color: white;
      background-color: var(--color-theme);
    }
  }

  button {
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--color-theme);
    border-radius: 3.125rem;
    color: var(--color-theme);
    background-color: white;
    font-size: var(--fs-basic);

    &:hover,
    &.active {
      color: white;
      background-color: var(--color-theme);
    }

    &.disabled {
      pointer-events: none;
      opacity: 0.75;
    }
  }

  @media screen and (${device.md}) {
    button {
      padding: 0.5rem 1rem;
    }

    .icon {
      padding: 0.5rem;
    }
  }
`;

const StyledTabs = styled.div`
  display: flex;
  justify-content: start;
  color: var(--color-secondary);
  font-weight: 700;

  .category {
    width: 7em;
    display: grid;
    place-items: center;
    border-bottom: 3px solid white;
    line-height: 3em;

    :hover {
      background-color: var(--color-gray-100);
      border-bottom: 3px solid var(--color-gray-100);
    }

    &.active {
      border-bottom: 3px solid var(--color-theme);
      color: var(--color-theme);
    }
  }

  @media screen and (${device.md}) {
    .category {
      width: 8em;
    }
  }
`;

export default function Profile({ user, onProfileChange }) {
  const { pathname } = useLocation();
  const { currentUser, userFollowings, handleFollow } = useUser();
  const {
    id,
    name,
    account,
    introduction,
    avatar,
    cover,
    followerCounts,
    followingCounts,
  } = user;
  const isFollowed = userFollowings.includes(id);
  const [currentFollowerCounts, setCurrentFollowerCounts] =
    useState(followerCounts);
  const [showModal, setShowModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current && isFollowed === true) {
      setCurrentFollowerCounts((prev) => prev + 1);
    } else if (mounted.current && isFollowed === false) {
      setCurrentFollowerCounts((prev) => prev - 1);
    }
  }, [isFollowed]);

  // source: https://jasonkang14.github.io/react/how-to-prevent-useeffect-on-initial-render
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const handleShowModal = () => {
    const nextShowModal = !showModal;
    setShowModal(nextShowModal);
  };

  const handleFollowBtnClick = async () => {
    setDisabled(true);
    await handleFollow(id);
    setDisabled(false);
  };

  return (
    <>
      <StyledDiv pathname={pathname}>
        <div className="cover">
          <img
            src={cover ?? 'https://loremflickr.com/640/480/nature?lock=27430'}
            alt="user-cover"
          />
        </div>
        <img
          className="avatar"
          src={avatar ?? 'http://placekitten.com/g/500/500'}
          alt="avatar"
        />
        <StyledContentDiv>
          <StyledEditDiv>
            {id === currentUser.id ? (
              <button type="button" onClick={handleShowModal}>
                編輯個人資料
              </button>
            ) : (
              <>
                <span className="icon">
                  <EmailIcon />
                </span>
                <span className="icon">
                  <NotificationIcon />
                </span>
                <button
                  className={`${isFollowed ? 'active' : undefined} ${
                    disabled ? 'disabled' : undefined
                  }`}
                  type="button"
                  onClick={handleFollowBtnClick}
                >
                  {isFollowed ? '正在跟隨' : '跟隨'}
                </button>
              </>
            )}
          </StyledEditDiv>
          <div className="user">
            <b>{name}</b>
            <p>@{account}</p>
          </div>
          <p className="intro">{introduction ?? 'I like alpha camp'}</p>
          <div className="stats">
            <NavLink to={`/users/${id}/followings`}>
              {id === currentUser.id ? (
                <>
                  <span>{userFollowings.length}</span>個跟隨中
                </>
              ) : (
                <>
                  <span>{followingCounts}</span>個跟隨中
                </>
              )}
            </NavLink>
            <NavLink to={`/users/${id}/followers`}>
              {id === currentUser.id ? (
                <>
                  <span>{followerCounts}</span>個跟隨者
                </>
              ) : (
                <>
                  <span>{currentFollowerCounts}</span>個跟隨者
                </>
              )}
            </NavLink>
          </div>
        </StyledContentDiv>
        {!pathname.includes('follow') && (
          <StyledTabs>
            <NavLink className="category" to={`/users/${id}/tweets`}>
              <p>推文</p>
            </NavLink>
            <NavLink className="category" to={`/users/${id}/replies`}>
              <p>回覆</p>
            </NavLink>
            <NavLink className="category" to={`/users/${id}/likes`}>
              <p>喜歡的內容</p>
            </NavLink>
          </StyledTabs>
        )}
      </StyledDiv>
      {showModal && (
        <EditModal
          onClose={handleShowModal}
          onProfileChange={onProfileChange}
        />
      )}
    </>
  );
}
