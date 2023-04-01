import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../globalStyles.js';
import { TweetModal } from './index';
import { ReactComponent as LogoIcon } from '../assets/Logo.svg';
import { ReactComponent as HomeIcon } from '../assets/Home.svg';
import { ReactComponent as HomeBlackIcon } from '../assets/Home-black.svg';
import { ReactComponent as PersonIcon } from '../assets/Person.svg';
import { ReactComponent as PersonBlackIcon } from '../assets/Person-black.svg';
import { ReactComponent as SettingIcon } from '../assets/Setting.svg';
import { ReactComponent as SettingBlackIcon } from '../assets/Setting-black.svg';
import { ReactComponent as LogoutIcon } from '../assets/Logout.svg';
import { ReactComponent as MobileTweetIcon } from '../assets/Mobile-Tweet.svg';
import { ReactComponent as NotificationNavbarIcon} from '../assets/Notification-navbar.svg';
import { ReactComponent as NotificationNavbarBlackIcon} from '../assets/Notification-navbar-black.svg';

const StyledNav = styled.nav`
  width: 100%;
  position: absolute;
  bottom: 0;
  border-top: 2px solid var(--color-gray-200);
  background-color: #fff;
  z-index: 1;

  .logo,
  .logout {
    display: none;
  }

  ul.nav-links {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 1rem;

    a:first-of-type {
      order: -2;
    }
    .tweet-icon-li {
      order: -1;
    }
  }

  @media screen and (${device.md}) {
    height: 100vh;
    width: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.5rem;
    border-top: unset;

    .logo {
      display: block;
      margin-bottom: 0.25rem;
    }

    .logout {
      display: flex;
    }

    ul.nav-links {
      display: unset;
      padding: unset;
    }
  }

  @media screen and (${device.lg}) {
    align-items: unset;

    width: 10rem;
  }
`;

const StyledLi = styled.li`
  cursor: pointer;
  color: var(--color-gray-800);

  .icon {
    :hover,
    .active & {
      color: var(--color-theme);
    }
  }

  span {
    display: none;
  }
  @media screen and (${device.md}) {
    padding-top: 2rem;

    .icon {
      display: grid;
      place-items: center;
    }

    .tweet-icon {
      display: grid;
      place-items: center;

      .svg {
        display: grid;
        place-items: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: white;
        background-color: var(--color-theme);
        :hover {
          background-color: var(--color-light-orange);
        }
      }
    }

    &.logout {
      padding-bottom: 1rem;
    }
  }

  @media screen and (${device.lg}) {
    display: flex;
    gap: 1rem;
    padding: 0.75rem 0.5rem;
    font-weight: 700;

    :hover,
    .active & {
      color: var(--color-theme);
    }

    span {
      display: block;
    }

    .icon {
      width: 20%;
    }

    .tweet-icon {
      display: none;
    }
  }
`;

const StyledNavButton = styled.button`
  display: none;

  @media screen and (${device.lg}) {
    display: block;
    cursor: pointer;
    width: 100%;
    margin: 1rem 0;
    padding: 0.5rem 0;
    border: none;
    border-radius: 2rem;
    color: white;
    background-color: var(--color-theme);

    :hover {
      background-color: var(--color-light-orange);
    }
  }
`;

export function Navbar({ tweetInput, currentUser, onChange, onAddTweet }) {
  const { pathname } = useLocation();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleShowModal = () => {
    const nextShowModal = !showModal;
    setShowModal(nextShowModal);
  };

  const handleUserLogoutClick = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <StyledNav>
        <div>
          <div className="logo">
            <LogoIcon />
          </div>
          <ul className="nav-links">
            <NavLink to="/tweets">
              <StyledLi>
                <div className="icon">
                  {pathname.includes('/tweets') &&
                  !pathname.includes('/users') ? (
                    <HomeBlackIcon />
                  ) : (
                    <HomeIcon />
                  )}
                </div>
                <span>首頁</span>
              </StyledLi>
            </NavLink>
            <NavLink
              to={`/users/${currentUser.id}/tweets`}
              className={
                pathname.includes(`users/${currentUser.id}`) && 'active'
              }
            >
              <StyledLi>
                <div className="icon">
                  {pathname.includes(`users/${currentUser.id}`) ? (
                    <PersonBlackIcon />
                  ) : (
                    <PersonIcon />
                  )}
                </div>
                <span>個人資料</span>
              </StyledLi>
            </NavLink>
            <NavLink to="/settings">
              <StyledLi>
                <div className="icon">
                  {pathname.includes('/settings') ? (
                    <SettingBlackIcon />
                  ) : (
                    <SettingIcon />
                  )}
                </div>
                <span>設定</span>
              </StyledLi>
            </NavLink>
            <StyledLi className="tweet-icon-li">
              <div className="tweet-icon">
                <div className="svg">
                  <MobileTweetIcon onClick={handleShowModal} />
                </div>
              </div>
            </StyledLi>
          </ul>
          <StyledNavButton onClick={handleShowModal}>推文</StyledNavButton>
        </div>
        <ul>
          <StyledLi className="logout" onClick={handleUserLogoutClick}>
            <div className="icon">
              <LogoutIcon />
            </div>
            <span>登出</span>
          </StyledLi>
        </ul>
      </StyledNav>
      {showModal && (
        <TweetModal
          tweetInput={tweetInput}
          currentUser={currentUser}
          onChange={onChange}
          onAddTweet={onAddTweet}
          onClose={handleShowModal}
        />
      )}
    </>
  );
}

export function AdminNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleAdminLogoutClick = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <StyledNav>
      <div>
        <div className="logo">
          <LogoIcon />
        </div>
        <ul className="nav-links">
          <NavLink to="/admin/tweets">
            <StyledLi>
              <div className="icon">
                {pathname.includes('/tweets') ? (
                  <HomeBlackIcon />
                ) : (
                  <HomeIcon />
                )}
              </div>
              <span>推文清單</span>
            </StyledLi>
          </NavLink>
          <NavLink
            to="/admin/users"
            className={pathname.includes('uses') && 'active'}
          >
            <StyledLi>
              <div className="icon">
                {pathname.includes('users') ? (
                  <PersonBlackIcon />
                ) : (
                  <PersonIcon />
                )}
              </div>
              <span>使用者列表</span>
            </StyledLi>
          </NavLink>
        </ul>
      </div>
      <ul>
        <StyledLi className="logout" onClick={handleAdminLogoutClick}>
          <div className="icon">
            <LogoutIcon className="logoutIcon" />
          </div>
          <span>登出</span>
        </StyledLi>
      </ul>
    </StyledNav>
  );
}
