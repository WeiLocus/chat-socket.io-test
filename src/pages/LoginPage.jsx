import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  AuthContainer,
  AuthInputContainer,
  AuthLinkText,
  AuthLinkContainer,
  AuthInput,
  AuthButton,
  Alert,
} from '../components';
import { ReactComponent as LogoIcon } from '../assets/Logo.svg';
import { login } from '../api/auth';

// alert message container
const StyledDiv = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  display: grid;
  place-items: center;
`;

// title style
const StyledTitle = styled.div`
  margin-top: 1rem;
  font-size: var(--fs-h3);
  font-weight: 700;
`;

export default function LoginPage() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState('');

  const navigate = useNavigate();

  // check login status
  const handelClick = async () => {
    if (account.length === 0 || password.length === 0) {
      setShowErrorMsg('欄位不可空白!');
      setTimeout(() => {
        setShowErrorMsg(false);
        navigate('/login');
      }, 1000);
      return;
    }
    const { token, status, message, isAdmin } = await login({
      account,
      password,
    });

    if (token && isAdmin === false) {
      localStorage.setItem('token', token);
      setShowSuccessMsg(true);
      setTimeout(() => {
        setShowSuccessMsg(false);
        navigate('/tweets');
      }, 1000);
    }
    // get error message
    if (status === 'error' && message) {
      setShowErrorMsg(message);
      setTimeout(() => {
        setShowErrorMsg(false);
        navigate('/login');
      }, 1000);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      if (account.trim().length === 0 || password.trim().length === 0) {
        setShowErrorMsg('欄位不可空白!');
        setTimeout(() => {
          setShowErrorMsg(false);
          navigate('/login');
        }, 1000);
        return;
      }
      const { token, status, message, isAdmin } = await login({
        account,
        password,
      });

      if (token && isAdmin === false) {
        localStorage.setItem('token', token);
        setShowSuccessMsg(true);
        setTimeout(() => {
          setShowSuccessMsg(false);
          navigate('/tweets');
        }, 1000);
      }
      // get error message
      if (status === 'error' && message) {
        setShowErrorMsg(message);
        setTimeout(() => {
          setShowErrorMsg(false);
          navigate('/login');
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/tweets');
    }
  }, [navigate]);

  return (
    <AuthContainer>
      <div>
        <LogoIcon />
      </div>
      <StyledTitle>登入 Alphitter</StyledTitle>
      <AuthInputContainer>
        <AuthInput
          label="帳號"
          placeholder="請輸入帳號"
          value={account}
          onChange={(accountInput) => setAccount(accountInput)}
          onKeyDown={handleKeyDown}
        />
      </AuthInputContainer>
      <AuthInputContainer>
        <AuthInput
          type="password"
          label="密碼"
          value={password}
          placeholder="請輸入密碼"
          onChange={(passwordInput) => setPassword(passwordInput)}
          onKeyDown={handleKeyDown}
        />
      </AuthInputContainer>
      <AuthButton name="登入" onClick={handelClick} />
      <AuthLinkContainer>
        <Link to="/signup">
          <AuthLinkText>註冊</AuthLinkText>
        </Link>
        <div>・</div>
        <Link to="/admin">
          <AuthLinkText>後台登入</AuthLinkText>
        </Link>
      </AuthLinkContainer>
      {showSuccessMsg && (
        <StyledDiv>
          <Alert type="success" message="登入成功" />
        </StyledDiv>
      )}
      {showErrorMsg && (
        <StyledDiv>
          <Alert type="error" message={showErrorMsg} />
        </StyledDiv>
      )}
    </AuthContainer>
  );
}
