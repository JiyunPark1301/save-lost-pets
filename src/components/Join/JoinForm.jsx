import React from 'react';
import styled from 'styled-components';
import FormInput from '../common/Input/FormInput';
import Button from '../common/Button/Button';

const Section = styled.section``;

const Heading = styled.h1`
  margin: 30px 0 40px;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

const NextBtn = styled(Button)`
  margin-top: 30px;
`;

const JoinForm = ({ onNext, formData, setFormData, error, setError }) => {
  let formIsValid = false;
  if (error.email === 'noError' && error.password === 'noError')
    formIsValid = true;

  const handleClick = () => {
    const duplicationCheck = async () => {
      try {
        const response = await fetch(
          'https://api.mandarin.weniv.co.kr/user/emailvalid',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: { email: formData.email } }),
          }
        );

        const data = await response.json();
        // console.log(data);
        if (data.message === '이미 가입된 이메일 주소 입니다.') {
          setError({ ...error, email: data.message });
        } else if (data.message === '사용 가능한 이메일 입니다.') {
          onNext();
          throw Error('잘못된 접근');
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    duplicationCheck();
  };

  return (
    <Section>
      <Heading>이메일로 회원가입</Heading>
      <FormInput
        id="email"
        label="이메일"
        formData={formData}
        setFormData={setFormData}
        error={error}
        setError={setError}
        inputProps={{
          type: 'email',
          placeholder: '이메일 주소를 입력해 주세요.',
        }}
      />
      <FormInput
        id="password"
        label="비밀번호"
        formData={formData}
        setFormData={setFormData}
        error={error}
        setError={setError}
        inputProps={{
          type: 'password',
          placeholder: '비밀번호를 설정해 주세요.',
          autoComplete: 'off',
        }}
      />
      <NextBtn
        mode={formIsValid ? 'default' : 'disabled'}
        size="lg"
        onClick={handleClick}
      >
        다음
      </NextBtn>
    </Section>
  );
};

export default JoinForm;
