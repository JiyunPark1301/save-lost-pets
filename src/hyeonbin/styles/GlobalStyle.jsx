import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import './font.css';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    box-sizing: border-box;
  } 

  body {
    font-family: "Pretendard-Regular, sans-serif";
  }

  .wrapper {
  display: flex;
  flex-direction: column;
  }

  main {
   margin: 0 auto;
  }

  form {
    display:flex;
    flex-direction: column; 
    margin-top: 50px
  }


  button {
    border: none;
    font-size: inherit;
    font-weight: inherit;
    cursor: pointer;
  }

  h1 {
    font-size: 25px;
    text-align: center;
    margin-top: 50px
  }

  p {
    margin-top: 5px;
    margin-bottom: 30px;
    font-size: 13px;

  }

  .message {
    color: red;
  }

`;

export default GlobalStyle;
