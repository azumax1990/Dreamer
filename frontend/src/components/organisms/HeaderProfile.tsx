import React, { memo, VFC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HeaderWrapper = styled.header`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: #E0FFFF;
`
const HeaderLeft = styled.div`
`

const HeaderRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const HeaderTittle = styled.h2`
  font-size: 28px;
  margin: 0;
`
const HeaderItems = styled.p`
  padding-left: 20px;
  margin: 0;
  &:hover {
    cursor: pointer;
  } 
`
const LabelTag = styled.label`
  font-size: 16px;
  &:hover {
    cursor: pointer;
  } 
`
const InputTag = styled.input`
  display: none;
`
type Props = {
  id: string;
}

export const HeaderProfile: VFC<Props> = memo((props) => {
  const { id } = props;
  return (
    <>
      <HeaderWrapper>
        <HeaderLeft>
          <Link to="/auditions" style={{ textDecoration: "none", color: "black"}}>
            <HeaderTittle>Dreamer</HeaderTittle>
          </Link>
        </HeaderLeft>
        <HeaderRight>
          <LabelTag htmlFor="formImage">写真投稿する</LabelTag>
          <InputTag type="file" id="formImage"/>
          <HeaderItems>ログアウト</HeaderItems>
        </HeaderRight>
      </HeaderWrapper>
    </>
  )
})
