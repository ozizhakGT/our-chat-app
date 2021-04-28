import {keyframes} from "styled-components";

export const fadeInAnimation = keyframes`
  from {opacity: 0}
  to   {opacity: 1}
`
export const fadeInAnimationFromTop = keyframes`
  from {opacity: 0; transform: translateY(-3rem)}
  to {opacity: 1; transform: translateY(0)} 
`
