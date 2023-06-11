import { useEffect, useState } from "react";
import Login from "./Login";

const User = {
  email: "yong@gmail.com",
  password: "zz123123^^"
};

function App() {
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

  const onClickConfirmButton = () => {
    if (email === User.email && pw === User.password) {
      alert("로그인 성공!");
    } else {
      alert("해킹이 감지되었습니다!!!!");
    }
  };

  return (
    <div className="page">
      <div className="titleWrap">
        이메일과 비밀번호를
        <br />
        입력해주세요.
      </div>
      <div className="contentWrap">
        <div className="inputTitle">이메일주소</div>
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="test@gamil.com"
            value={email}
            onChange={handleEmail} //onChane없으면 값을 입력해도 작동안됨. {email}이 바뀌지 않으니까.
          />
        </div>
        <div className="errorMessageWrap">
          {!emailValid && email.length > 0 && (
            <div>올바른 이메일을 입력해주세요.</div>
          )}
          {/* true -> true -> 경우에만 -> 렌더.. 즉 emailValid가 초기에 false이기 때문에 !emailValid는 정규식을 만족하기 전까지 true가 된다. 그러면 1글자 이상 입력하는것도 true, 그래서 유효성이 완전하게 완료되면 !emailValid 는 false가 되기때문에 뒤로 넘어가지 않는다. 그래서 1글자 이상의 조건이 true더라도 뒤의 빨간 에러를 출력안한다. 즉, emailValid가 false인 동안은 !emailValid는 true가 되어 빨간문장이 계속보인다. */}
        </div>

        <div className="inputTitle" style={{ marginTop: "26px" }}>
          비밀번호
        </div>
        <div className="inputWrap">
          <input
            type="password"
            className="input"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={pw}
            onChange={handlePassword}
          />
        </div>
        <div className="errorMessageWrap">
          {!pwValid && pw.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
          )}
        </div>
      </div>
      <div>
        <button
          onClick={onClickConfirmButton}
          disabled={notAllow}
          className="bottomButton"
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default App;
