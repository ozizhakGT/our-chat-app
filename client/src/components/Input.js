import styled from "styled-components";

export default styled.input`
  border: none;
  font-size: 1.8rem;
  border-radius: 5px;
  padding: 10px;
  transition: all .2s;
  
  &:focus {
    outline: none;
    border: aquamarine .5px solid;
  }
`;
