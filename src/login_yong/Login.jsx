import { useEffect, useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [emailValid, setEmailValid] = useState(false); //이메일 정규식 유효성 검사 상태값
  const [pwValid, setPwValid] = useState(false); //패스워드 정규식 유효성 검사 상태값
  const [notAllow, setNotAllow] = useState(true);

  //이메일 인풋 value 입력, 유효성 검사
  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i; //이메일 유효성

    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    // .test() 는 true/false로 반환.  email 변수에 저장된 문자열에 대해 regex 정규 표현식 패턴이 일치하는지 여부를 확인하고, 그 결과를 반환
  };

  //비밀번호 인풋 value 입력, 유효성 검사
  const handlePassword = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/; //비밀번호 유효성 특수문자, 영어, 8글자 이상 20이하하

    if (regex.test(pw)) {
      setPwValid(true);
      return;
    } else {
      setPwValid(false);
    }
  };

  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [emailValid, pwValid]); //emailValid, pwValid 얘네가 변화가 생길때 마다 버튼 활성화 여부 Effect를 체크

  const req = {
    user: {
      email: email,
      password: pw
    }
  };

  const onClickConfirmButton = async () => {
    try {
      const response = await fetch(
        "https://api.mandarin.weniv.co.kr/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(req)
        }
      );
      const result = await response.json();
      console.log("성공했다:", result);
    } catch (error) {
      console.error("실패했다:", error);
    }
  };

  return (
    <section className="loginCard">
      <form className="loginContainer" onSubmit={onClickConfirmButton}>
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
          value={pw}
          onChange={handlePassword}
        />
        <div className="errorWarp">
          {!pwValid && pw.length > 0 && (
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
}

export default Login;
