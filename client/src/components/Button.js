import styled from "styled-components";

export default styled.button`
  cursor: pointer;
  border: none;
  padding: 10px 15px;
  font-size: 1.6rem;
  border-radius: 4px;
  
  background-color: lightsteelblue;
  
  &[theme="transparent"] {
    background-color: lightgray;
  }
  
  &:hover {
    transform: scale(1.03);
  }
`;
