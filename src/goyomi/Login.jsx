import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const BlockInp = styled.input`
  display: block;
  margin-bottom: 10px;
`;

export const Login = () => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  useEffect(() => {
    axios
      .post("https://api.mandarin.weniv.co.kr/user/login")
      .then((response) => {
        console.log(response);
        setEmail(response.email);
      });
  }, []);

  return (
    <form className="loginContainer">
      <h1>로그인</h1>
      <label htmlFor="userEmail">이메일</label>
      <BlockInp type="email" id="userEmail" />
      <label htmlFor="userPassword">비밀번호</label>
      <BlockInp type="password" id="userPassword" />
      <button type="submit">로그인</button>
      <p>이메일로 회원가입</p>
    </form>
  );
};

// const handleEmailChange = (e) => {
//   setEmail(e.target.value);
// };

// const handlePasswordChange = (e) => {
//   setPassword(e.target.value);
// };
