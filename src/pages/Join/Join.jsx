import React, { useState } from 'react';
import styled from 'styled-components';
import Wrapper from '../../components/common/Wrapper/Wrapper';
import JoinForm from '../../components/Join/JoinForm';
import ProfileForm from '../../components/Join/ProfileForm';
import { useNavigate } from 'react-router-dom';

const Main = styled.main``;

const LayoutWrapper = styled(Wrapper)`
  padding: 0 34px;
`;

const Form = styled.form``;

const initialFormState = {
  email: '',
  password: '',
  username: '',
  accountname: '',
  intro: '',
};

const initialErrorState = {
  email: null,
  password: null,
  username: null,
  accountname: null,
  intro: null,
};

const Join = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState(initialErrorState);
  const [img, setImg] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNextBtn = () => {
    setStep((prev) => prev + 1);
  };

  const signIn = async () => {
    try {
      const response = await fetch('https://api.mandarin.weniv.co.kr/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: { ...formData, image: img } }),
      });

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (step === 1) return;

    const duplicationCheck = async () => {
      try {
        const response = await fetch(
          'https://api.mandarin.weniv.co.kr/user/accountnamevalid',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: { accountname: formData.accountname },
            }),
          }
        );

        const data = await response.json();
        if (data.message === '이미 가입된 계정ID 입니다.') {
          setError({ ...error, accountname: data.message });
        } else if (data.message === '사용 가능한 계정ID 입니다.') {
          setError({ ...error, accountname: 'noError' });
          signIn();
          navigate('/');
        } else {
          throw Error('잘못된 접근');
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    duplicationCheck();
  };

  return (
    <Main>
      <LayoutWrapper>
        <Form onSubmit={handleSubmit}>
          {step === 1 && (
            <JoinForm
              onNext={handleNextBtn}
              formData={formData}
              setFormData={setFormData}
              error={error}
              setError={setError}
            />
          )}
          {step === 2 && (
            <ProfileForm
              formData={formData}
              setFormData={setFormData}
              error={error}
              setError={setError}
              img={img}
              setImg={setImg}
            />
          )}
        </Form>
      </LayoutWrapper>
    </Main>
  );
};

export default Join;
