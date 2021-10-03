import React, { memo, useState, useCallback, VFC } from 'react'
import styled from 'styled-components'

import { Audition } from '../../../../types'
import { useSelectAudition } from '../../../../hooks/useSelectAudition'
import { AuditionInfo } from '../../../Molecules/audition/pcResponsive/AuditionInfo'
import { AppliedUsers } from '../../../Molecules/audition/pcResponsive/AppliedUsers'

const ModalWrapper = styled.div`
`
const OverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`
const Modal = styled.div`
  background-color: #fff;
  width:40%;
  padding: 20px 20px;
  border-radius: 10px;
`
const TitleText = styled.h2`
  padding-left: 235px;
  margin: 0;
`
const ModalDelete = styled.p`
  font-weight: bold;
  font-size: 30px;
  margin: 0;
  &:hover {
    cursor: pointer;
  }
`
const AuditionsContainer = styled.div`
  height: 500px;
  padding-top: 20px;
  overflow: scroll;
`
const AuditionNameContainer = styled.div`
  display: flex;
  aline-items: center;
  justify-content: space-between;
`


type Props = {
  auditions:                Array<Audition>;
  ChangeAuditionModalOpen: () => void;
}
export const ModalAuditions: VFC<Props> = memo((props) => {
  const { auditions, ChangeAuditionModalOpen } = props;
  const [appliedModal, setAppliedModal] = useState(false)
  
  const { onSelectAudition, selectedAudition } = useSelectAudition()

  const onChangeAppliedModal = useCallback(() => {setAppliedModal(false)}, [])
  const onChooseAudition = useCallback((id: number) => {
    onSelectAudition({ id, auditions })
    setAppliedModal(true)
  }, [auditions, onSelectAudition])
  return (
    <>
      <ModalWrapper >
        <OverLay >
          <Modal>
            {!appliedModal ? (
              <>
                <AuditionNameContainer>
                  <TitleText>募集リスト</TitleText>
                  <ModalDelete onClick={ChangeAuditionModalOpen}>×</ModalDelete> 
                </AuditionNameContainer>
                <AuditionsContainer>
                  {auditions.map((audition) => (
                    <AuditionInfo audition={audition} onChooseAudition={onChooseAudition} /> 
                  ))}
                </AuditionsContainer>
              </>
            ) : (
              <AppliedUsers id={selectedAudition?.id} onChangeAppliedModal={onChangeAppliedModal} ChangeAuditionModalOpen={ChangeAuditionModalOpen}/>
            )}
          </Modal>
        </OverLay>
      </ModalWrapper>
    </>
  )
})
