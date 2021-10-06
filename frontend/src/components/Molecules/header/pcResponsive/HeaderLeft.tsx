import React, { memo, VFC } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TittleWrapper = styled.div`
`
const HeaderTittle = styled.h2`
  font-size: 28px;
  margin: 0;
`

export const HeaderLeft: VFC= memo(() => {
  return (
    <TittleWrapper>
      <Link to="/" style={{ textDecoration: "none", color: "black"}}>
        <HeaderTittle>Dreamer</HeaderTittle>
      </Link>
    </TittleWrapper>
  )
})
