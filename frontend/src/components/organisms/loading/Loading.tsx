import React, { memo, VFC } from 'react'
import { FaSyncAlt } from "react-icons/fa";
import styled from 'styled-components';

const LoadingContainer = styled.div`
  width: 300px;
  margin: 0 auto;
  padding-top: 100px;
  
`
const SpinContainer = styled.div`
  width: 16px;
  margin: 0 auto;
`
const LoadingText = styled.p`
  text-align: center;
`
export const Loading: VFC = memo(() => {
  return (
    <LoadingContainer>
      <SpinContainer>
        <FaSyncAlt />
      </SpinContainer>
      <LoadingText>読み込んでいます.....</LoadingText>
    </LoadingContainer>
  )
})
