import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  } 


  .container {
    position: relative;
    max-width: 390px;
    height: 80%;
    min-height: 80vh;
    margin: 40px auto;
    border: 1px solid #dbdbdb;
    box-shadow: 0px 0px 5px #dbdbdb;
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
