import React, { useState, VFC } from 'react'
import styled from 'styled-components'
import { FaAlignJustify } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { HeaderLeft } from '../../../Molecules/header/HeaderLeft'

const HeaderWrapper = styled.header`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #E0FFFF;
  margin: 0;
`
const IconTag = styled.p`
  padding-top: 8px;;
  font-size: 22px;
  &:hover {
    cursor: pointer;
  }
`
const SlideWrapper = styled.div`
  position: absolute;
  top: 70px;
  z-index: 1px;
  background-color: #fff;
  width: 100%;
  padding: 10px 20px;
`
const LinkItem = styled.p` 
  border-bottom: 1px solid #e8e8e8;
  padding: 10px 0;
  margin: 0;
  &:hover {
    cursor: pointer;
  }
`


export const ProfileSmartPhoneHeader: VFC = () => {
  const [ slideOpen, setSlideOpen ] = useState(false)
  return (
    <>
      <HeaderWrapper>
        <HeaderLeft />
        <IconTag onClick={() => setSlideOpen(!slideOpen)}>
          <FaAlignJustify />
        </IconTag>
      </HeaderWrapper>
      {slideOpen ? (
        <SlideWrapper >
          <Link to="/post" style={{ textDecoration: "none", color: "black" }}>
            <LinkItem>写真を追加する</LinkItem>
          </Link>
          <LinkItem>ログアウト</LinkItem>
        </SlideWrapper>
      ) : (null)}
    </>
  )
}
