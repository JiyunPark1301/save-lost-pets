import React from 'react';
import { useForm } from 'react-hook-form';

const App2 = () => {
  const { register, watch, errors, handleSubmit } = useForm();
  console.log(watch('email'));

  const onSubmit = (data) => {
    console.log('data', data);

    // axios.post('/');
  };

  return (
    <>
      <h1>이메일로 회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label for="email">이메일</label>
        <input
          name="email"
          type="email"
          ref={register({
            required: true,
            pattern:
              /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
          })}
        />
        {errors.email && errors.email.type === 'required' && <p>* 이메일을 작성해주세요.</p>}
        {errors.email && errors.email.type === 'required' && (
          <p>* 올바른 이메일 형식이 아닙니다.</p>
        )}

        <label for="password">비밀번호</label>
        <input
          name="password"
          type="password"
          ref={register({ required: true, pattern: /^[A-Za-z0-9]{6,}$/ })}
        />
        {errors.password && errors.password.type === 'required' && (
          <p>* 비밀번호를 작성해주세요.</p>
        )}
        {errors.password && errors.password.type === 'pattern' && (
          <p>* 비밀번호는 6자 이상이어야 합니다.</p>
        )}
        <button type="submit">다음</button>
      </form>
    </>
  );
};

export default App2;
