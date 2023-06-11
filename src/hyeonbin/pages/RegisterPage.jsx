import React from 'react';
import { useState } from 'react';
import Input from '../components/common/Input';
import NextButton from '../components/common/NextButton';

const RegisterPage = () => {
  // 이메일, 비밀번호, 버튼 상태 관리 초기값 세팅
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 오류 메세지 상태 저장
  const [messageEmail, setMessageEmail] = useState('');
  const [messagePassword, setMessagePassword] = useState('');

  // 유효성 검사 : 하나씩 onChange가 되었을 때, 유효성 검사를 실시 -> 모두 값이 true라면 다음 버튼 활성화
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!emailRegExp.test(currentEmail)) {
      setMessageEmail('* 올바른 이메일 형식이 아닙니다.');
      setIsEmail(false);
    } else {
      setMessageEmail('* 사용가능한 이메일 입니다.');
      setIsEmail(true);
    }
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp = /^[A-Za-z0-9]{6,}$/;

    if (!passwordRegExp.test(currentPassword)) {
      setMessagePassword('* 비밀번호는 6자 이상이어야 합니다.');
      setIsPassword(false);
    } else {
      setMessagePassword('* 사용가능한 비밀번호 입니다.');
      setIsPassword(true);
    }
  };

  // 버튼 활성화
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="wrapper">
        <main>
          <h1>이메일로 회원가입</h1>
          <form>
            <label for="email">이메일</label>
            <Input
              type="email"
              value={email}
              placeholder="이메일 주소를 입력해 주세요."
              onChange={onChangeEmail}
              required
            ></Input>
            <p className="message">
              {messageEmail}
              {isEmail}
            </p>
            <label for="password">비밀번호</label>
            <Input
              type="password"
              value={password}
              placeholder="비밀번호를 설정해 주세요."
              onChange={onChangePassword}
              required
            ></Input>
            <p className="message">
              {messagePassword}
              {isPassword}
            </p>
            <NextButton type="submit" onSubmit={onSubmit}>
              다음
            </NextButton>
          </form>
        </main>
      </div>
    </div>
  );
};

export default RegisterPage;
