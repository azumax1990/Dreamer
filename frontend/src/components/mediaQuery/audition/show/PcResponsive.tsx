import React, { memo, useContext, VFC } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Link, useHistory } from 'react-router-dom'

import { LoginUserContext } from '../../../../App'
import { Audition, Profile, User } from '../../../../types'

const AuditionWrapper = styled.div`
  padding: 40px 0;
  background-color: #F5F5F5;
  min-height: 100vh;
`
const AuditionContainer = styled.div`
  width: 700px;
  padding: 40px;
  margin: 0 auto;
  background-color: #fff;
`
const TitleText = styled.h2`
  font-size: 28px;
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 5px dotted #F5F5F5;
`
const CreatedAt = styled.p`
  text-align: right;
  font-weight: bold;
  opacity: 0.7;
`
const AuditionAvatar = styled.img`
  width: 100%;
  height: 400px;
`
const InfoContainer = styled.div`
  padding-bottom: 30px;
`
const InfoText = styled.p`
  letter-spacing: 5px;
`
const CompanyContainer = styled.div`
  background-color: #EFEFEF;
  padding: 20px;
`
const InfoTitle = styled.p`
  font-size: 19px;
  font-weight: bold;
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #ddd;
`
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`
const TableRow = styled.tr`
  border-bottom: 2px solid #ddd;
`
const TableHeader = styled.th`
  opacity: 0.7;
  text-align: left;
  padding: 8px 0;
` 
const TableData = styled.td`
  padding: 8px 0;
  padding-right: 140px;
`
const ApplyButton = styled.button`
  color: #fff;
  font-weight: bold;
  width: 100%;
  background-color: #383f48;
  padding: 15px 0;
  margin-top: 20px;
  border: none;
  cursor: pointer;
`
type Props = {
  id:               string;
  audition:         Audition | undefined;
  profile:          Profile | undefined;
  hasApplied:       User | undefined;
  onClickPostApply: (id: string) => void;
  onDeleteAudition: (id: string) => void;
  onDeleteApply:    (id: string) => void;
}

export const PcResponsive: VFC<Props> = memo((props) => {
  const { id, audition, profile, onClickPostApply, hasApplied, onDeleteAudition, onDeleteApply } = props;
  const { currentUser } = useContext(LoginUserContext)
  const history = useHistory()
  const moveToSignInPage  = () => (history.push("/sign_in"))

  return (
    <AuditionWrapper>
      <AuditionContainer>
        <TitleText>{audition?.title}</TitleText>
        <CreatedAt>{moment(audition?.created_at).format('YYYY年MM月DD日')}</CreatedAt>
        {audition?.avatar_url ? (
          <AuditionAvatar src={audition?.avatar_url}/>
        ) : (null)}
        <InfoContainer>
          <InfoText>{audition?.description}</InfoText>
        </InfoContainer>
        <CompanyContainer>
          <InfoTitle>記載者情報</InfoTitle>
          <Table>
            <TableRow>
              <TableHeader>記載元</TableHeader>
                {profile?.company || profile?.name ? (
                  <Link to={`/user/${profile?.user_id}/profile`} style={{ textDecoration: "none", color: "black"}}>
                    <TableData>{profile?.company || profile?.name}</TableData>
                  </Link>
                  ) : (
                  <Link to={`/user/${profile?.user_id}/profile`} style={{ textDecoration: "none", color: "black"}}>
                    <TableData>記載元へ</TableData>
                  </Link>
                )}
            </TableRow>
            <TableRow>
              <TableHeader>担当者</TableHeader>
              {profile?.name ? (
                <Link to={`/user/${profile?.user_id}/profile`} style={{ textDecoration: "none", color: "black"}}>
                  <TableData>{profile?.name}</TableData>
                </Link>
                ) : (null)}
            </TableRow>
            <TableRow>
              <TableHeader>住所</TableHeader>
              <TableData></TableData>
            </TableRow>
          </Table>
          { !currentUser ? (
            <ApplyButton onClick={moveToSignInPage} >ログインしてください</ApplyButton>
          ) : currentUser?.id === profile?.user_id ? (
            <ApplyButton onClick={() => onDeleteAudition(id)}>応募を終了する</ApplyButton>
          ) : !hasApplied ? ( 
            <ApplyButton onClick={() => onClickPostApply(id)} disabled={currentUser ? false : true}>応募する</ApplyButton>
          ) : (
            <ApplyButton onClick={() => onDeleteApply(id)}>応募をやめる</ApplyButton>
          )}
        </CompanyContainer>
      </AuditionContainer>
    </AuditionWrapper>
  )
})
