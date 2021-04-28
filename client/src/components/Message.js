import styled, {css} from "styled-components";
import colors from "../styles/colors";

export default styled.div`
  display: flex;
  align-items: center;
  font-size: 3rem;
  margin-bottom: 2rem;
  align-self: ${({isOwner}) => isOwner ? "flex-start" : "flex-end"};

  ${({isOwner}) => !isOwner && css`
    flex-direction: row-reverse;
  `}
  ${({welcomeMessage}) => welcomeMessage && css`
    font-size: 1.4rem;
    background-color: lightgray;
    opacity: .7;
    align-self: center;
    padding: 10px;
    border-radius: 4px;
  `}
  div {
    width: 4.5rem;
    height: 4.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: burlywood;
    margin: 0 2rem;
    overflow: hidden;
    box-shadow: 0 0 10px 4px rgba(0 0 0 / 9%);

    img {
      width: 100%;
      height: 100%;

    }
  }

  p {
    position: relative;
    word-wrap: break-word;
    font-size: 2rem;
    //min-width: ;
    max-width: 45%;
    padding: 10px;
    border-radius: 8px;
    background-color: ${({isOwner}) => isOwner ? colors.grey : colors.blue};
    box-shadow: 0 0 10px 4px rgba(0 0 0 / 5%);

    &::before {
      content: '';
      position: absolute;
      width: 0;
      top: 50%;
      border: 10px solid transparent;

      ${({isOwner}) => isOwner ? css`
        left: 5px;
        transform: translate(calc(-100% - 5px), -50%);
        border-right: 15px solid ${colors.grey};
      ` : css`
        right: 5px;
        border-left: 15px solid ${colors.blue};
        transform: translate(calc(100% + 5px), -50%);
      `
      }
    }
    
    span {
      font-size: 1.1rem;
      opacity: .7;
    }
  }
`;
