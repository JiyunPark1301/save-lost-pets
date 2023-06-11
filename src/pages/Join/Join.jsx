import React, { useState } from 'react';
import styled from 'styled-components';
import Wrapper from '../../components/common/Wrapper/Wrapper';
import JoinForm from '../../components/Join/JoinForm';
import ProfileForm from '../../components/Join/ProfileForm';
import { atom } from 'recoil';

const Main = styled.main``;

const LayoutWrapper = styled(Wrapper)`
  padding: 0 34px;
`;

const Form = styled.form``;

export const formState = atom({
  key: 'formState',
  default: {
    email: '',
    pw: '',
  },
});

export const touchedState = atom({
  key: 'touchedState',
  default: {
    email: false,
    pw: false,
  },
});

// export const formError = atom({
//   key: 'formError',
//   default: {
//     email: '',
//     pw: '',
//   },
// });

// export const duplicatedEmail = atom({
//   key: 'duplicatedEmail',
//   default: false,
// });

const Join = () => {
  const [step, setStep] = useState(1);

  const handleNextBtn = () => {
    setStep((prev) => prev + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Main>
      <LayoutWrapper>
        <Form onSubmit={handleSubmit}>
          {step === 1 && <JoinForm onNext={handleNextBtn} />}
          {step === 2 && <ProfileForm />}
        </Form>
      </LayoutWrapper>
    </Main>
  );
};

export default Join;
