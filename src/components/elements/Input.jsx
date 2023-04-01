import styled from 'styled-components';
import clsx from 'clsx';

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  background-color: var(--color-gray-100);
`;

const StyledLabel = styled.label`
  padding: 0.125rem 0.625rem;
  font-size: var(--fs-secondary);
  color: var(--color-gray-700);
`;

const StyledInput = styled.input`
  padding: 0.125rem 0.625rem;
  border: none;
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

const StyledInputCheckContainer = styled.div`
  position: relative;
`;

const StyledInputCount = styled.div`
  text-align: end;
  color: var(--color-gray-700);
  margin-top: 0.5rem;
`;

const StyledInputLimit = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  text-align: end;
  color: var(--color-error);
`;

export default function AuthInput({
  type,
  label,
  placeholder,
  value,
  onChange,
  InputLength,
  onKeyDown,
}) {
  return (
    <>
      <StyledContainer>
        <StyledLabel>{label}</StyledLabel>
        <StyledInput
          className={clsx('', { error: label === '名稱' && InputLength > 50 })}
          type={type || 'text'}
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          onKeyDown={onKeyDown}
        />
      </StyledContainer>
      <StyledInputCheckContainer>
        {InputLength > 0 && (
          <StyledInputCount>{InputLength}/50</StyledInputCount>
        )}
        {InputLength > 50 && (
          <StyledInputLimit>字數超出上限！</StyledInputLimit>
        )}
      </StyledInputCheckContainer>
    </>
  );
}

export { StyledInputCount, StyledInput };
