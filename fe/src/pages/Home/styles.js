import styled, {css} from 'styled-components'
export const Container = styled.div`
  margin-top: 32px;

`

export const InputSearchContainer = styled.div`
  width: 100%;
  input {

    width: 100%;
    background-color: white;
    border: none;
    border-radius: 25px;
    height: 50px;
    box-shadow : 0px 4px 10px rgba(0,0,0,0.04);
    outline: none;
    padding: 0 16px;
    &::placeholder {
      color: #bcbcbc;
    }
}

`

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: ${({justifycontent}) => justifycontent};
  margin-top: 32px;
  border-bottom: 2px solid ${({theme}) => theme.colors.gray[100]};
  padding-bottom: 16px;

  strong {
    color: #222222;
    font-size: 24px;
  }

  a {
    font-size: 16px;
    color: ${({theme}) => theme.colors.primary.main};
    text-decoration: none;
    font-weight: bold;
    border: 2px solid #5061FC;
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.2s ease-in;

    &:hover {
      background: ${({theme}) => theme.colors.primary.main};
      color: white;
    }
  }
`;

export const ListHeader = styled.header`
  margin-top: 24px;
  margin-bottom: 8px;
    button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;

    span {
      margin-right: 8px;
      font-weight: bold;
      color: ${({theme}) => theme.colors.primary.main};
    }

    img {
      transform: ${({orderBy}) => (orderBy === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)')};
      transition: transform 0.2s ease-in;

    }
  }
`;

export const Card = styled.div`
    background: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    padding: 16px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & + & {
      margin-top: 16px;
    }

    .info {
      .contact-name {
        display: flex;
        align-items: center;

        small {
          background: ${({theme}) => theme.colors.primary.lighter};
          color:  ${({theme}) => theme.colors.primary.main};
          font-weight: bold;
          text-transform: uppercase;
          padding: 4px;
          border-radius: 4px;
          margin-left: 8px;
        }
      }

      span {
        display: block;
        font-size: 14px;
        color: ${({theme}) => theme.colors.gray[200]}
      }
    }

    .actions {
      display: flex;
      align-items: center;
      button {
        background: transparent;
        border: none;
        margin-left: 8px;
      }
    }
`;

export const ErrorContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;


  .details {
    margin-left: 24px;
    strong{
    font-size: 22px;
    color: ${({theme}) => theme.colors.danger.main};
    display: block;
    margin-bottom: 8px;
  }
  }

`

export const EmptyLisContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img{
    margin-bottom: 8px;
  }

  p {
    text-align: center;
    color: ${({theme}) => theme.colors.gray[200]};
    strong{
      color: ${({theme}) => theme.colors.primary.main};
    }
  }
`

export const SearchNotFound = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: flex-start;

  span {
    color: ${({theme}) => theme.colors.gray[200]};
    margin-left: 24px;
    word-break: break-word;
  }

`

export const ButtonRetry = styled.button`
    height: 52px;
    border: none;
    padding: 0 16px;
    background: ${({theme}) => theme.colors.primary.main};
    color: white;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
    font-size: 16px;
    border-radius: 4px;
    font-weight: bold;
    transition: background 0.2s ease-in;
    display: flex;
    align-items: center;
    justify-content: center;

  &:hover {
    background: ${({theme}) => theme.colors.primary.light};
  }

  &:active {
    background: ${({theme}) => theme.colors.primary.dark};
  }



`
