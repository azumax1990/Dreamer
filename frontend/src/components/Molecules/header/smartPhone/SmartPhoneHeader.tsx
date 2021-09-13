import React, { memo, useState, VFC } from 'react'
import styled from 'styled-components'
import { FaAlignJustify } from 'react-icons/fa'

import { HeaderLeft } from '../pcResponsive/HeaderLeft'
import { ReactNode } from 'react'

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
  z-index: 10;
  background-color: #fff;
  width: 100%;
  padding: 10px 20px;
`
type Props = {
  children: ReactNode;
}
export const SmartPhoneHeader: VFC<Props> = memo((props) => {
  const { children } = props;
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
          {children}
        </SlideWrapper>
      ) : (null)}
    </>
  )
})
