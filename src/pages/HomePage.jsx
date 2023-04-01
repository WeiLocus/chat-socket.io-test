/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';

const StyledDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
`;

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  }, [navigate]);

  return (
    <StyledDiv>
      <div>
        <BeatLoader color="var(--color-theme)" />
      </div>
    </StyledDiv>
  );
}
