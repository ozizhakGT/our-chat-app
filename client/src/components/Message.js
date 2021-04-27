import styled, {css} from "styled-components";
import colors from "../styles/colors";

export default styled.div`
  display: flex;
  align-items: center;
  font-size: 3rem;
  margin-bottom: 2rem;
  align-self: ${({ isOwner }) => isOwner ? "flex-start" : "flex-end"};
  ${({ isOwner }) => !isOwner && css`
    flex-direction: row-reverse;
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
    
    img {
      width: 100%;
      height: 100%;
    }
  }
  
  p {
    font-size: 2rem;
    min-width: fit-content;
    max-width: 50%;
    padding: 10px;
    border-radius: 8px;
    background-color: ${({ isOwner }) => isOwner ? colors.grey : colors.blue};
  }
`;
