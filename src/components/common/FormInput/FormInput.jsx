import React from 'react';
import styled from 'styled-components';
import {
  duplicatedEmail,
  formState,
  touchedState,
} from '../../../pages/Join/Join';
import { useRecoilState } from 'recoil';
import Button from '../Button/Button';

const Container = styled.div`
  & + & {
    margin-top: 16px;
    margin-bottom: 30px;
  }
`;

const Label = styled.label`
  display: block;
  color: ${({ theme }) => theme.colors.txtColor};
  font-size: 12px;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  width: 100%;
  font-size: 14px;
  line-height: 14px;
  padding-bottom: 8px;
  border: none;
  border-bottom: ${({ theme, isInvalid }) =>
    isInvalid
      ? `1px solid ${theme.colors.warning}`
      : `1px solid ${theme.colors.gray}`};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }

  &:focus {
    outline: none;
    border-bottom: ${({ theme, isInvalid }) =>
      isInvalid
        ? `1px solid ${theme.colors.warning}`
        : `1px solid ${theme.colors.primary}`};
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
`;

const CheckButton = styled(Button)`
  flex-basis: 100px;
  flex-shrink: 0;
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.warning};
  font-size: 12px;
  font-weight: 500;
`;

// const ERROR_MSG = {
//   required: '필수 입력사항을 입력해주세요.',
//   invalidEmail: '잘못된 이메일 형식입니다.',
//   invalidPw: '비밀번호는 6자 이상이어야 합니다.',
// };

// const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const FormInput = ({ id, label, isInvalid, errorMsg, inputProps }) => {
  const [formData, setFormData] = useRecoilState(formState);
  const [isTouched, setIsTouched] = useRecoilState(touchedState);
  // const [errorMsg, setErrorMsg] = useRecoilState(formError);
  // const [isEmailDuplicated, setIsEmailDuplicated] =
  //   useRecoilState(duplicatedEmail);

  // const validateValue = () => {
  //   let result;
  //   const value = formData[id];

  //   if (value.length === 0) result = 'required';
  //   else {
  //     switch (id) {
  //       case 'email':
  //         result = EMAIL_REGEX.test(value) ? true : 'invalidEmail';
  //         break;
  //       case 'pw':
  //         result = result.length >= 6 ? true : 'invalidPw';
  //         break;
  //       default:
  //         return;
  //     }
  //   }
  //   setErrorMsg({ ...errorMsg, [id]: result });
  // };

  const handleFormData = (event) => {
    setFormData({ ...formData, [id]: event.target.value });
  };

  const handleIsTouched = () => {
    if (isTouched.email && isTouched.pw) return;
    console.log('focused');
    setIsTouched({ ...isTouched, [id]: true });
  };

  // const duplicationCheck = async () => {
  //   const response = await fetch(
  //     'https://api.mandarin.weniv.co.kr/user/emailvalid',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ user: { email: formData.email } }),
  //     }
  //   );

  //   const data = await response.json();
  //   if (data.message === '이미 가입된 이메일 주소 입니다.') {
  //     setIsEmailDuplicated(true);
  //   } else {
  //     setIsEmailDuplicated(false);
  //   }
  // };

  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <FlexContainer>
        <StyledInput
          id={id}
          value={formData[id]}
          onChange={handleFormData}
          // onBlur={handleIsTouched}
          onFocus={handleIsTouched}
          isInvalid={isInvalid}
          {...inputProps}
        />
        {id === 'email' && (
          <CheckButton
            size="ms"
            mode={isInvalid ? 'disabled' : 'default'}
            // onClick={duplicationCheck}
          >
            중복 검사
          </CheckButton>
        )}
      </FlexContainer>
      {isInvalid && <ErrorMessage>{`*${errorMsg}`}</ErrorMessage>}
    </Container>
  );
};

export default FormInput;
