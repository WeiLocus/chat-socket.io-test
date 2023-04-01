/* eslint-disable operator-assignment */
import styled from 'styled-components';
import { device } from '../../globalStyles';

const StyledAuthButton = styled.button`
  width: 100%;
  margin: 2rem 0 1rem 0;
  padding: 0.375rem 0;
  border: none;
  border-radius: 30px;
  color: #fff;
  background-color: var(--color-theme);
  font-weight: 400;
  cursor: pointer;

  &:hover {
    background-color: var(--color-light-orange);
  }
  @media screen and (${device.sm}) {
    width: 50%;
  }
`;

export default function AuthButton({ name, onClick }) {
  return <StyledAuthButton onClick={onClick}>{name}</StyledAuthButton>;
}
