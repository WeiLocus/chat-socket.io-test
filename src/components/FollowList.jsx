import { useState, useEffect } from 'react';
import { NavLink, useLocation, useOutletContext } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';
import { device } from '../globalStyles.js';
import { useUser } from '../contexts/UserContext.jsx';
import { getUserFollowings, getUserFollowers } from '../api/user.js';

const StyledList = styled.ul`
  height: calc(100% - 53px);
  background-color: white;
  border-inline: 1px solid var(--color-gray-200);
`;

const StyledLoadingDiv = styled.div`
  width: 100%;
  height: calc(100% - 53px);
  display: grid;
  place-items: center;
`;

const StyledListItem = styled.li`
  display: grid;
  grid-template-columns: calc(50px + 1rem) 1fr;
  padding: 1rem;
  border: 1px solid var(--color-gray-200);
  background-color: white;

  img {
    width: 50px;
    aspect-ratio: 1/1;
    margin-right: 1rem;
    border-radius: 50%;
    overflow: hidden;
  }

  .user {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    margin-bottom: 0.5rem;

    p {
      margin-left: 0.5rem;
      font-size: var(--fs-secondary);
      color: var(--color-secondary);
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

  .content {
    color: var(--color-gray-900);
  }

  @media screen and (${device.md}) {
    button {
      padding: 0.5rem 1rem;
    }
  }
`;

const StyledTab = styled.div`
  display: flex;
  justify-content: start;
  color: var(--color-secondary);
  background-color: white;
  font-weight: 700;

  .category {
    width: 8em;
    display: grid;
    place-items: center;
    border-bottom: 3px solid white;
    line-height: 3em;

    :hover {
      border-bottom: 3px solid var(--color-gray-100);
      background-color: var(--color-gray-100);
    }

    &.active {
      border-bottom: 3px solid var(--color-theme);
      color: var(--color-theme);
    }
  }

  @media screen and (${device.md}) {
    border: 1px solid var(--color-gray-200);
  }
`;

export default function FollowList() {
  const { pathname } = useLocation();
  const { userFollowings } = useUser();
  const { shownUser } = useOutletContext();
  const [isLoading, setIsLoading] = useState(true);
  const [userFollowingsData, setUserFollowingsData] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  let renderedFollowItem;

  if (pathname.includes('following')) {
    renderedFollowItem = userFollowingsData.map((user) => {
      return <FollowItem key={user.id} user={user} />;
    });
  } else {
    renderedFollowItem = userFollowers.map((user) => {
      return <FollowItem key={user.id} user={user} />;
    });
  }

  useEffect(() => {
    const getFollowUsersAsync = async () => {
      try {
        const followings = await getUserFollowings(shownUser.id);
        const followers = await getUserFollowers(shownUser.id);
        setUserFollowingsData(followings);
        setUserFollowers(followers);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    setIsLoading(true);
    getFollowUsersAsync();
  }, [userFollowings]);

  return (
    <>
      <FollowTab id={shownUser.id} />
      {isLoading ? (
        <StyledLoadingDiv>
          <div>
            <BeatLoader color="var(--color-theme)" />
          </div>
        </StyledLoadingDiv>
      ) : (
        <StyledList>{renderedFollowItem}</StyledList>
      )}
    </>
  );
}

function FollowTab({ id }) {
  return (
    <StyledTab>
      <NavLink className="category" to={`/users/${id}/followers`}>
        <p>追隨者</p>
      </NavLink>
      <NavLink className="category" to={`/users/${id}/followings`}>
        <p>正在追隨</p>
      </NavLink>
    </StyledTab>
  );
}

function FollowItem({ user }) {
  const { userFollowings, handleFollow } = useUser();
  const { id, name, account, avatar, introduction } = user;
  const isFollowed = userFollowings.includes(id);
  const [disabled, setDisabled] = useState(false);

  const handleFollowBtnClick = async () => {
    setDisabled(true);
    await handleFollow(id);
    setDisabled(false);
  };

  return (
    <StyledListItem>
      <NavLink to={`/users/${id}/tweets`}>
        <img src={avatar} alt="avatar" />
      </NavLink>
      <div>
        <div className="user">
          <b>{name}</b>
          <p>@{account}</p>
          <button
            className={`${isFollowed ? 'active' : undefined} ${
              disabled ? 'disabled' : undefined
            }`}
            type="button"
            onClick={handleFollowBtnClick}
          >
            {isFollowed ? '正在跟隨' : '跟隨'}
          </button>
        </div>
        <p className="content">{introduction}</p>
      </div>
    </StyledListItem>
  );
}
