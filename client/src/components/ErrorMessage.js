import styled from "styled-components";
import {fadeInAnimation} from "../styles/animations";

export default styled.span`
  opacity: 0;
  position: absolute;
  font-size: 1.3rem;
  color: red;
  animation: ${fadeInAnimation} .3s .2s forwards;
`
