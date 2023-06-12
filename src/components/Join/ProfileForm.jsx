import React from 'react';
import styled from 'styled-components';
import Ellipse from '../../assets/Ellipse-1.png';
import uploadIcon from '../../assets/icon/icon-upload.png';
import FormInput from '../common/Input/FormInput';
import Button from '../common/Button/Button';

const Section = styled.section``;

const Heading = styled.h1`
  margin: 30px 0 12px;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

const Desc = styled.p`
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.txtColor};
  margin-bottom: 30px;
`;

const Label = styled.label`
  width: 110px;
  height: 110px;
  position: relative;
  display: block;
  margin: 0 auto 30px;
  border-radius: 50%;
  border: ${({ theme }) => `1px solid ${theme.colors.gray}`};

  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: ${({ theme }) =>
      `${theme.colors.primary} url(${uploadIcon}) no-repeat center`};
  }
`;

const ProfileImg = styled.img`
  object-fit: cover;
`;

const UploadInput = styled.input``;

const StartBtn = styled(Button)`
  margin-top: 30px;
`;

const ProfileForm = ({
  formData,
  setFormData,
  error,
  setError,
  img,
  setImg,
}) => {
  const handleChange = async (event) => {
    if (!event.target.files) {
      return;
    }
    const formData = new FormData();
    formData.append('image', event.target.files[0]);

    try {
      const response = await fetch(
        'https://api.mandarin.weniv.co.kr/image/uploadfile',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      setImg(data.filename);
    } catch (error) {
      console.log(error.message);
    }
  };

  let formIsValid = false;
  if (error.username === 'noError' && error.accountname === 'noError')
    formIsValid = true;

  return (
    <Section>
      <Heading>프로필 설정</Heading>
      <Desc>나중에 얼마든지 변경할 수 있습니다.</Desc>
      <Label htmlFor="profileImg">
        <ProfileImg
          src={img === '' ? Ellipse : `https://api.mandarin.weniv.co.kr/${img}`}
        />
      </Label>
      <UploadInput
        id="profileImg"
        type="file"
        className="a11y-hidden"
        onChange={handleChange}
      />
      <FormInput
        id="username"
        label="사용자 이름"
        formData={formData}
        setFormData={setFormData}
        error={error}
        setError={setError}
        inputProps={{ type: 'text', placeholder: '2~10자 이내여야 합니다.' }}
      />
      <FormInput
        id="accountname"
        label="계정 ID"
        formData={formData}
        setFormData={setFormData}
        error={error}
        setError={setError}
        inputProps={{
          type: 'text',
          placeholder: '영문, 숫자, 특수문자(,),(_)만 사용 가능합니다.',
        }}
      />
      <FormInput
        id="intro"
        label="소개"
        formData={formData}
        setFormData={setFormData}
        error={error}
        setError={setError}
        inputProps={{
          type: 'text',
          placeholder: '자신과 판매할 상품에 대하여 소개해주세요',
        }}
      />
      <StartBtn mode={formIsValid ? 'default' : 'disabled'} size="lg">
        감귤마켓 시작하기
      </StartBtn>
    </Section>
  );
};

export default ProfileForm;
