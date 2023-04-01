import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../globalStyles';
import { ReactComponent as GoBackIcon } from '../assets/GoBack.svg';
import { useUser } from '../contexts/UserContext';

const StyledHeader = styled.header`
  position: fixed;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-inline: 1px solid var(--color-gray-200);
  background-color: white;

  div {
    display: flex;
    align-items: center;
  }

  div.small {
    display: unset;
    align-items: unset;
  }

  .user-avatar {
    width: 50px;
    height: 50px;
    margin-right: 1rem;
    border-radius: 50%;
  }

  h1 {
    font-size: var(--fs-h4);
  }

  p {
    display: none;
  }

  .small {
    h1 {
      font-size: var(--fs-basic);
    }

    p {
      display: block;
      margin-top: -0.25rem;
      color: var(--color-secondary);
      font-size: var(--fs-secondary);

      span {
        margin-right: 0.25rem;
      }
    }
  }

  @media screen and (${device.md}) {
    position: static;
    width: unset;

    div {
      display: unset;
      align-items: unset;
    }

    .user-avatar {
      display: none;
    }
  }
`;
export default function Header({ headerText, goBack, user, shownUserTweets }) {
  const { pathname } = useLocation();
  const { currentUser } = useUser();
  return (
    <StyledHeader>
      {goBack && (
        <NavLink
          to={
            pathname.includes('follow') ? `users/${user.id}/tweets` : '/tweets'
          }
        >
          <GoBackIcon />
        </NavLink>
      )}
      <div className={user && 'small'}>
        {pathname === '/tweets' && (
          <img
            className="user-avatar"
            src={currentUser.avatar}
            alt="user-avatar"
          />
        )}
        <h1>{headerText}</h1>
        <p>
          <span>{shownUserTweets?.length}</span>推文
        </p>
      </div>
    </StyledHeader>
  );
}
