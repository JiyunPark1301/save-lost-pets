import React from 'react';
import styled from 'styled-components';
import FormInput from '../common/Input/FormInput';
import Button from '../common/Button/Button';
import { formState, touchedState } from '../../pages/Join/Join';
import { useRecoilValue } from 'recoil';

const Section = styled.section``;

const Heading = styled.h2`
  margin: 30px 0 40px;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

// const ERROR_MSG = {
//   required: '필수 입력사항을 입력해주세요.',
//   invalidEmail: '잘못된 이메일 형식입니다.',
//   invalidPw: '비밀번호는 6자 이상이어야 합니다.',
// };

// const duplicationCheck = async (value) => {
//   console.log(value);
//   const response = await fetch(
//     'https://api.mandarin.weniv.co.kr/user/emailvalid',
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ user: { email: value } }),
//     }
//   );

//   const data = await response.json();
//   if (data.message === '이미 가입된 이메일 주소 입니다.') {
//     console.log('data', data);
//     return true;
//   }
//   return false;
// };

const JoinForm = ({ onNext }) => {
  const formData = useRecoilValue(formState);
  const isTouched = useRecoilValue(touchedState);
  // const [errorMsg, setErrorMsg] = useRecoilState(formError);
  // const [isDuplicated, setIsDuplicated] = useState(false);
  // const isDuplicated = useRecoilValue(duplicatedEmail);

  const validateInput = (id) => {
    const value = formData[id];
    const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (value.length === 0) return '필수 입력사항을 입력해주세요.';
    if (id === 'email' && !EMAIL_REGEX.test(value))
      return '잘못된 이메일 형식입니다.';
    // if (id === 'email' && isDuplicated) {
    //   return '이미 가입된 이메일 주소입니다.';
    // }
    if (id === 'pw' && value.length < 6)
      return '비밀번호는 6자 이상이어야 합니다.';
    return 'noError';
  };

  const emailInvalidMsg = validateInput('email');
  const isEmailInvalid = emailInvalidMsg !== 'noError' && isTouched.email;
  const pwInvalidMsg = validateInput('pw');
  const isPwInvalid = pwInvalidMsg !== 'noError' && isTouched.pw;

  let formIsValid = false;

  if (emailInvalidMsg === 'noError' && pwInvalidMsg === 'noError')
    formIsValid = true;

  return (
    <Section>
      <Heading>이메일로 회원가입</Heading>
      <FormInput
        id="email"
        label="이메일"
        isInvalid={isEmailInvalid}
        errorMsg={emailInvalidMsg}
        inputProps={{
          type: 'email',
          placeholder: '이메일 주소를 입력해 주세요.',
        }}
      />
      <FormInput
        id="pw"
        label="비밀번호"
        isInvalid={isPwInvalid}
        errorMsg={pwInvalidMsg}
        inputProps={{
          type: 'password',
          placeholder: '비밀번호를 설정해 주세요.',
          autoComplete: 'off',
        }}
      />
      <Button
        mode={formIsValid ? 'default' : 'disabled'}
        size="lg"
        onClick={onNext}
      >
        다음
      </Button>
    </Section>
  );
};

export default JoinForm;
