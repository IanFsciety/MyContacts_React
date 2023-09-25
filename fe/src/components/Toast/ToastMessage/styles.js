import styled, {css} from "styled-components";

const containerVariant =  {
  default: css`
    background: ${({theme}) => theme.colors.primary.main};
  `,
  success: css`
    background: ${({theme}) => theme.colors.sucess.main};
  `,
  danger: css`
  background: ${({theme}) => theme.colors.danger.main};
  `,

};

export const Container = styled.div`
  padding: 16px 32px;
  background: ${({theme}) => theme.colors.primary.main};
  color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;


  ${({ type }) => containerVariant[type] || containerVariant.default}

   & + & {
    margin-top: 12px;
   }
   box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);

   img {
    margin-right: 8px;
   }
`
