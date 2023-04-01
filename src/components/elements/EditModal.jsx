import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import clsx from 'clsx';
import { device, breakpoint } from '../../globalStyles.js';
import AuthInput, { StyledInputCount } from './Input';
import Alert from './Alert';
import { ReactComponent as CrossIcon } from '../../assets/Cross.svg';
import { ReactComponent as ChangeImgIcon } from '../../assets/ChangeImg.svg';
import { useUser } from '../../contexts/UserContext';
import { changeUserProfile } from '../../api/user';

const StyledMsgDiv = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  display: grid;
  place-items: center;
`;

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

  .content {
    position: relative;
    display: flex;
    flex-direction: column;

    .cover {
      position: relative;
      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        object-position: bottom;
      }
    }
  }

  .avatar {
    position: absolute;
    top: 7.75rem;
    left: 1rem;
    width: 140px;
    aspect-ratio: 1/1;
    border: 4px solid white;
    border-radius: 50%;
    overflow: hidden;
  }

  @media screen and (${device.md}) {
    position: absolute;
    inset: 3.5rem 0;
    width: 634px;
    height: 650px;
    margin: 0 auto;
    border-radius: 1rem;
  }
`;

const StyledCloseDiv = styled.div`
  display: grid;
  grid-template-columns: 3rem 1fr auto;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--color-gray-200);

  p {
    font-weight: 700;
  }

  .close-btn {
    all: unset;
    cursor: pointer;
    color: var(--color-theme);
  }

  .save-btn {
    all: unset;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-theme);
    border-radius: 3.125rem;
    color: white;
    background-color: var(--color-theme);

    &.disabled {
      pointer-events: none;
      opacity: 0.75;
    }
  }
`;

const StyledFilterDiv = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);

  .icons {
    display: flex;
    align-items: center;
    gap: 2rem;

    .icon {
      cursor: pointer;
      :hover {
        color: var(--color-theme);
      }
    }

    .avatar-input,
    .cover-input {
      display: none;
    }
  }
`;

const StyledInputContainer = styled.div`
  position: relative;
  margin-top: 5rem;
  padding: 1rem;
  .introduction {
    display: flex;
    flex-direction: column;
    margin-top: 1.4rem;
    background-color: var(--color-gray-100);
    label {
      padding: 0.125rem 0.625rem;
      font-size: var(--fs-secondary);
      color: var(--color-gray-700);
    }
  }
`;

// introduction
const StyledInput = styled.textarea`
  padding: 0.125rem 0.625rem;
  border: none;
  resize: none;
  background-color: var(--color-gray-100);
  line-height: 1.6rem;
  font-size: var(--fs-basic);
  ::-webkit-input-placeholder {
    color: var(--color-gray-500);
  }
  border-bottom: 2px solid var(--color-gray-700);
  :focus {
    border-bottom: 2px solid var(--color-light-blue);
    outline: none;
  }
  :hover {
    border-bottom: 2px solid var(--color-light-blue);
  }
  &.error {
    border-bottom: 2px solid var(--color-error);
  }
`;
const StyledInputLimit = styled.div`
  position: absolute;
  bottom: 1rem;
  text-align: end;
  color: var(--color-error);
`;

export default function EditModal({ onClose, onProfileChange }) {
  const isMobile = useMediaQuery({ query: `(max-width: ${breakpoint.md} )` });
  const { currentUser, handleUserUpdate } = useUser();
  const nextUser = { ...currentUser };
  const [name, setName] = useState(nextUser.name);
  const [introduction, setIntroduction] = useState(nextUser.introduction);
  const [avatarPreview, setAvatarPreview] = useState(nextUser.avatar);
  const [coverPreview, setcoverPreview] = useState(nextUser.cover);
  const [avatar, setAvatar] = useState(nextUser.avatar);
  const [cover, setCover] = useState(nextUser.cover);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState('');
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const nameLength = name.length;
  const introductionLength = introduction.length;

  const handleAvatarChange = (e) => {
    const selectedImage = e.target.files[0];
    const previewURL = URL.createObjectURL(e.target.files[0]);
    setAvatar(selectedImage);
    setAvatarPreview(previewURL);
  };

  const handleCoverChange = (e) => {
    const selectedImage = e.target.files[0];
    const previewURL = URL.createObjectURL(e.target.files[0]);
    setCover(selectedImage);
    setcoverPreview(previewURL);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (name.trim().length === 0 || introduction.trim().length === 0) {
      setShowErrorMsg('欄位不可空白!');
      setTimeout(() => {
        setShowErrorMsg(false);
        setIsSubmitting(false);
      }, 1000);
      return;
    }
    if (name.length > 50 || introduction.length > 160) {
      setShowErrorMsg('字數超過上限!');
      setTimeout(() => {
        setShowErrorMsg(false);
        setIsSubmitting(false);
      }, 1000);
      return;
    }

    const { data, status } = await changeUserProfile({
      id: currentUser.id,
      name,
      introduction,
      avatar,
      cover,
    });
    if (data && status === 200) {
      setIsSubmitting(false);
      setShowSuccessMsg(true);
      const newCurrentUser = {
        ...currentUser,
        name: data.name,
        introduction: data.introduction,
        avatar: data.avatar,
        cover: data.cover,
      };
      setTimeout(() => {
        setShowSuccessMsg(false);
        onClose();
        handleUserUpdate(newCurrentUser);
        onProfileChange();
      }, 1000);
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
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <StyledCloseDiv>
            <button className="close-btn" type="button" onClick={onClose}>
              <CrossIcon />
            </button>
            <p>編輯個人資料</p>
            <button
              className={`save-btn ${isSubmitting ? 'disabled' : undefined}`}
              type="submit"
            >
              {isSubmitting ? '儲存中...' : '儲存'}
            </button>
          </StyledCloseDiv>
          <div className="content">
            <div className="cover">
              <img src={coverPreview} alt="user-cover" />
              <StyledFilterDiv>
                <div className="icons">
                  <label htmlFor="cover-input">
                    <ChangeImgIcon className="icon" />
                  </label>
                  <CrossIcon className="icon" onClick={onClose} />
                  <input
                    className="cover-input"
                    name="cover"
                    id="cover-input"
                    placeholder="none"
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                  />
                </div>
              </StyledFilterDiv>
            </div>
            <StyledInputContainer>
              <AuthInput
                label="名稱"
                placeholder="name"
                value={name}
                onChange={(nameInput) => setName(nameInput)}
                InputLength={nameLength}
              />
              <div className="introduction">
                <label>自我介紹</label>
                <StyledInput
                  className={clsx('', { error: introductionLength > 160 })}
                  rows={isMobile ? '6' : '3'}
                  placeholder="Hello! My name is ..."
                  value={introduction}
                  onChange={(event) => setIntroduction(event.target.value)}
                />
              </div>
              {introductionLength > 0 && (
                <StyledInputCount>{introductionLength}/160</StyledInputCount>
              )}
              {introductionLength > 160 && (
                <StyledInputLimit>字數超出上限！</StyledInputLimit>
              )}
            </StyledInputContainer>
            <div className="avatar">
              <img src={avatarPreview} alt="avatar" />
              <StyledFilterDiv>
                <div className="icons">
                  <label htmlFor="avatar-input">
                    <ChangeImgIcon className="icon" />
                  </label>
                  <input
                    className="avatar-input"
                    id="avatar-input"
                    name="avatar"
                    placeholder="none"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </div>
              </StyledFilterDiv>
            </div>
          </div>
        </form>
      </StyledModal>
      {showErrorMsg && (
        <StyledMsgDiv>
          <Alert type="error" message={showErrorMsg} />
        </StyledMsgDiv>
      )}
      {showSuccessMsg && (
        <StyledMsgDiv>
          <Alert type="success" message="修改成功" />
        </StyledMsgDiv>
      )}
    </StyledDiv>
  );
}
