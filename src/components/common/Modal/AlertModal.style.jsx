import styled from 'styled-components';

export const AlertSection = styled.div`
  width: 252px;
  height: 110px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 999;
  overflow: hidden;
`;

export const Strong = styled.strong`
  display: inline-block;
  border: none;
  margin: 22px 50px;
  font-size: 16px;
`;

export const Ul = styled.ul`
  border-top: ${({ theme }) => `0.5px solid ${theme.colors.gray}`};
  display: flex;
  justify-content: space-between;
`;

export const Li = styled.li`
  flex: 1;
`;

export const Button = styled.button`
  width: 100%;
  height: 46px;
  font-weight: 700;
  color: ${({ color }) => color || 'inherit'};
`;
