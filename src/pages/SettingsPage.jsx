import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../globalStyles';
import { Header, AuthInput, AuthLinkText, Alert } from '../components';
import { useUser } from '../contexts/UserContext';
import { changeUserInformation } from '../api/user';

const StyledDiv = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  display: grid;
  place-items: center;
`;

const StyedSettingsContainer = styled.div`
  height: calc(100vh - 60px);
  overflow-y: scroll;
  padding: 1.6rem;
  padding-top: calc(62px + 1.6rem);
  padding-bottom: calc(60px + 1.6rem);
  border: 1px solid var(--color-gray-200);
  border-bottom: none;
  background-color: #fff;

  .logout {
    margin-top: 1rem;
    text-align: end;
  }
  @media screen and (${device.md}) {
    height: calc(100vh - 68px);
    padding-top: unset;
    padding-bottom: unset;
    padding: 1.6rem;

    .logout {
      display: none;
    }
  }
`;

const StyledInputContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: end;

  button {
    cursor: pointer;
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-theme);
    border-radius: 3.125rem;
    color: white;
    background-color: var(--color-theme);
    :hover {
      border: 1px solid var(--color-light-orange);
      background-color: var(--color-light-orange);
    }
  }
`;

export default function SettingsPage() {
  const { currentUser, handleUserUpdate } = useUser();
  const nextUser = { ...currentUser };
  const { account: userAccount, name: userName, email: userEmail } = nextUser;
  const [account, setAccount] = useState(userAccount);
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState('');
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nameLength = name.length;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleClick = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (
      account.trim().length === 0 ||
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      checkPassword.trim().length === 0
    ) {
      setShowErrorMsg('欄位不可空白!');
      setTimeout(() => {
        setShowErrorMsg(false);
        setIsSubmitting(false);
      }, 1000);
      return;
    }
    if (name.length > 50) {
      setShowErrorMsg('字數超過上限!');
      setTimeout(() => {
        setShowErrorMsg(false);
        setIsSubmitting(false);
      }, 1000);
      return;
    }
    if (password !== checkPassword) {
      setShowErrorMsg('密碼與確認密碼不符!');
      setTimeout(() => {
        setShowErrorMsg(false);
        setIsSubmitting(false);
      }, 1000);
      return;
    }

    const { data, status } = await changeUserInformation({
      id: currentUser.id,
      account,
      name,
      email,
      password,
      checkPassword,
    });
    if (data && status === 200) {
      setIsSubmitting(false);
      setShowSuccessMsg(true);
      setTimeout(() => {
        setShowSuccessMsg(false);
      }, 1000);
    }
    // 將新data修正至 currentUser
    const newCurrentUser = {
      ...currentUser,
      account: data.account,
      name: data.name,
      email: data.email,
    };
    handleUserUpdate(newCurrentUser);
  };
  // mobile event handler
  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <Header headerText="帳戶設定" />
      <StyedSettingsContainer>
        {showErrorMsg && (
          <StyledDiv>
            <Alert type="error" message={showErrorMsg} />
          </StyledDiv>
        )}
        {showSuccessMsg && (
          <StyledDiv>
            <Alert type="success" message="修改成功" />
          </StyledDiv>
        )}
        <StyledInputContainer>
          <AuthInput
            label="帳號"
            placeholder="請輸入帳號"
            value={account}
            onChange={(accountInput) => setAccount(accountInput)}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <AuthInput
            label="名稱"
            placeholder="請輸入使用者名稱"
            value={name}
            onChange={(nameInput) => setName(nameInput)}
            InputLength={nameLength}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <AuthInput
            label="Email"
            placeholder="請輸入Email"
            value={email}
            onChange={(emailInput) => setEmail(emailInput)}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <AuthInput
            type="password"
            label="密碼"
            placeholder="請設定密碼"
            value={password}
            onChange={(passwordInput) => setPassword(passwordInput)}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <AuthInput
            type="password"
            label="密碼確認"
            placeholder="請再次輸入密碼"
            value={checkPassword}
            onChange={(pwdConfirmValue) => setCheckPassword(pwdConfirmValue)}
          />
        </StyledInputContainer>
        <StyledButtonDiv>
          <button type="button" onClick={handleClick}>
            {isSubmitting ? '儲存中...' : '儲存'}
          </button>
        </StyledButtonDiv>
        <div className="logout">
          <AuthLinkText onClick={handleLogoutClick}>登出</AuthLinkText>
        </div>
      </StyedSettingsContainer>
    </>
  );
}
