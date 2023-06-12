import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Container';
import NextButton from './../components/common/NextButton';
import Input from '../components/common/Input';

const RegisterPage = () => {
  // 이메일, 비밀번호 관리 초기값 세팅
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 오류 메세지 상태 저장
  const [messageEmail, setMessageEmail] = useState('');
  const [messagePassword, setMessagePassword] = useState('');
  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  // 버튼 활성화
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return emailRegExp.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegExp = /^[A-Za-z0-9]{6,}$/;
    return passwordRegExp.test(password);
  };

  const checkEmail = (currentEmail) => {
    console.log(currentEmail);
    fetch('https://api.mandarin.weniv.co.kr/user/emailvalid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: currentEmail,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === '사용 가능한 이메일 입니다.') {
          setMessageEmail('* 사용 가능한 이메일입니다.');
          setIsEmail(true);
        } else {
          setMessageEmail('* 이미 사용 중인 이메일입니다.');
          setIsEmail(false);
        }
      })
      .catch((error) => {
        console.error('이메일 중복 검사 실패:', error);
        setMessageEmail('* 이메일 중복 검사에 실패했습니다.');
        setIsEmail(false);
      });
  };

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);

    if (!validateEmail(currentEmail)) {
      setMessageEmail('* 올바른 이메일 형식이 아닙니다.');
      setIsEmail(false);
    } else {
      setMessageEmail('...검사 중');
      setIsEmail(false);
      checkEmail(currentEmail); // 이메일 중복 검사 결과를 기다리는 동안 버튼 비활성화
    }
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);

    if (!validatePassword(currentPassword)) {
      setMessagePassword('* 비밀번호는 6자 이상이어야 합니다.');
      setIsPassword(false);
    } else {
      setMessagePassword('* 사용 가능한 비밀번호입니다.');
      setIsPassword(true);
    }
  };

  useEffect(() => {
    if (isEmail && isPassword) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  }, [isEmail, isPassword]);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <div className="wrapper">
        <main>
          <h1>이메일로 회원가입</h1>
          <form onSubmit={onSubmit}>
            <label htmlFor="email">이메일</label>
            <Input
              type="email"
              value={email}
              placeholder="이메일 주소를 입력해 주세요."
              onChange={onChangeEmail}
              required
            ></Input>
            <p className="message">{messageEmail}</p>
            <label htmlFor="password">비밀번호</label>
            <Input
              type="password"
              value={password}
              placeholder="비밀번호를 설정해 주세요."
              onChange={onChangePassword}
              required
            ></Input>
            <p className="message">{messagePassword}</p>
            <NextButton type="submit" disabled={!isSuccess}>
              다음
            </NextButton>
          </form>
        </main>
      </div>
    </Layout>
  );
};

export default RegisterPage;
