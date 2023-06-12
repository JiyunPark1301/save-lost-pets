import React, { useEffect, useState } from "react";
import "./login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const req = {
    user: {
      email: email,
      password: password,
    },
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://api.mandarin.weniv.co.kr/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
        }
      );

      const result = await response.json();
      console.log("성공:", result);
    } catch (error) {
      console.error("실패:", error);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    const regex = /^.{6,}$/;
    if (regex.test(password)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  useEffect(() => {
    if (emailValid && passwordValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, passwordValid]);

  return (
    <section className="loginCard">
      <form className="loginContainer" onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <label htmlFor="userEmail">이메일</label>
        <input
          type="email"
          id="userEmail"
          value={email}
          onChange={handleEmail}
        />
        <div className="errorWrap">
          {!emailValid && email.length > 0 && (
            <p className="errorTxt">올바른 이메일을 입력해 주세요.</p>
          )}
        </div>
        <label htmlFor="userPassword">비밀번호</label>
        <input
          type="password"
          placeholder="영문, 숫자, 특수문자 포함 6자 이상"
          id="userPassword"
          value={password}
          onChange={handlePassword}
        />
        <div className="errorWarp">
          {!passwordValid && password.length > 0 && (
            <p className="errorTxt">비밀번호가 일치하지 않습니다.</p>
          )}
        </div>
        <button disabled={notAllow} className="loginBtn">
          로그인
        </button>
        <a href="#" className="signIn">
          이메일로 회원가입
        </a>
      </form>
    </section>
  );
};
