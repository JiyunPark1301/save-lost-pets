import { RecoilRoot } from "recoil";
import GlobalStyle from "./styles/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import theme from "./styles/Theme";
import Login from "./login_yong/Login";
const Span1 = styled.span`
  font-weight: 200;
  color: ${({ theme }) => theme.colors.primary};
`;
const Span2 = styled.span`
  font-weight: 400;
`;
const Span3 = styled.span`
  font-weight: 700;
`;

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Login />
      </ThemeProvider>
    </RecoilRoot>
  );
}
export default App;
