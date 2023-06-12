import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  & + & {
    margin-top: 16px;
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

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.warning};
  font-size: 12px;
  font-weight: 500;
`;

const ERROR_MSG = {
  required: '필수 입력사항을 입력해주세요.',
  emailPattern: '잘못된 이메일 형식입니다.',
  maxLength: '비밀번호는 6자 이상이어야 합니다.',
  length: '2자~10자 이내여야 합니다.',
  idPattern: '2~16자 이내의 영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.',
};

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const ID_REGEX = /^[a-z0-9A-Z_.]{2,16}$/;

const FormInput = ({
  id,
  label,
  formData,
  setFormData,
  error,
  setError,
  inputProps,
}) => {
  const validateValue = (value) => {
    let result;

    if (value.length === 0) result = 'required';
    else {
      switch (id) {
        case 'email':
          result = EMAIL_REGEX.test(value) ? 'noError' : 'emailPattern';
          break;
        case 'password':
          result = value.length >= 6 ? 'noError' : 'maxLength';
          break;
        case 'username':
          result =
            value.length >= 2 && value.length <= 10 ? 'noError' : 'length';
          break;
        case 'accountname':
          result = ID_REGEX.test(value) ? 'noError' : 'idPattern';
          break;
        default:
          return;
      }
    }
    if (result === 'noError') {
      setError({ ...error, [id]: result });
    } else {
      setError({ ...error, [id]: ERROR_MSG[result] });
    }
  };

  const handleFormData = (event) => {
    const { value } = event.target;
    id !== 'intro' && validateValue(value);
    setFormData({ ...formData, [id]: value });
  };

  let isInvalid = false;
  if (id !== 'intro') {
    isInvalid = error[id] !== 'noError' && error[id] !== null;
  }

  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <StyledInput
        id={id}
        value={formData[id]}
        onChange={handleFormData}
        isInvalid={isInvalid}
        {...inputProps}
      />
      {isInvalid && <ErrorMessage>{`*${error[id]}`}</ErrorMessage>}
    </Container>
  );
};

export default FormInput;
