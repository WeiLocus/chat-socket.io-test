import styled from 'styled-components';
import { ReactComponent as CheckIcon } from '../../assets/Noti-check.svg';
import { ReactComponent as CrossIcon } from '../../assets/Noti-cross.svg';
import { ReactComponent as ExclamationIcon } from '../../assets/Noti-exclamation.svg';
import { ReactComponent as InfoIcon } from '../../assets/Noti-info.svg';
import { device } from '../../globalStyles.js';

const alertIcons = {
  success: <CheckIcon />,
  error: <CrossIcon />,
  warning: <ExclamationIcon />,
  info: <InfoIcon />,
};

const borderColor = {
  success: `var(--color-light-green)`,
  error: `var(--color-error)`,
  warning: `var(--color-warning)`,
  info: `var(--color-light-blue)`,
};

const StyledBaseAlert = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  z-index: 2;
  width: 250px;
  height: 75px;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 4px rgba(51, 51, 51, 0.04),
    0px 4px 16px rgba(51, 51, 51, 0.08);
  background-color: white;
  font-size: var(--fs-h5);
  font-weight: 700;

  .icon {
    border: 2px solid ${(props) => props.borderColor[props.type]};
    border-radius: 50%;
    padding: 0.25rem;
  }

  @media screen and (${device.md}) {
    width: 400px;
    height: 100px;

    .icon {
      padding: 0.75rem;
    }
  }
`;

// receives type props which can be: success, error, warning, info
export default function Alert({ type, message }) {
  return (
    <StyledBaseAlert borderColor={borderColor} type={type}>
      <p>{message}</p>
      <div className="icon">{alertIcons[type]}</div>
    </StyledBaseAlert>
  );
}
