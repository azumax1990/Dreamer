import React, { memo, useContext, VFC } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LoginUserContext } from '../../../../App';
import { Audition, Profile } from '../../../../types';

const AuditionWrapper = styled.div`
  padding: 40px 20px;
  // background-color: #F5F5F5;
  min-height: 100vh;
`
const AuditionContainer = styled.div`
`
const TitleText = styled.h2`
  font-size: 25px;
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 5px dotted #ddd;
`
const CreatedAt = styled.p`
  font-size: 15px;
  text-align: right;
  font-weight: bold;
  opacity: 0.7;
`
const InfoContainer = styled.div`
  padding: 20px 0 30px 0;
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
  text-align: left;
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
  audition: Audition | undefined;
  profile: Profile | undefined;
}

export const SmartPhoneResponsive: VFC<Props> = memo((props) => {
  const { audition, profile } = props;
  const { currentUser } = useContext(LoginUserContext)

  return (
    <AuditionWrapper>
      <AuditionContainer>
        <TitleText>{audition?.title}</TitleText>
        <CreatedAt>{audition?.created_at}</CreatedAt>
        <InfoContainer>
          <InfoText>{audition?.description}</InfoText>
        </InfoContainer>
        <CompanyContainer>
          <InfoTitle>記載者情報</InfoTitle>
          <Table>
            <TableRow>
              <TableHeader>記載元</TableHeader>
              <Link to={`/user/${profile?.user_id}/profile`} style={{ textDecoration: "none", color: "black"}}>
                <TableData>{profile?.company}</TableData>
              </Link>
            </TableRow>
            <TableRow>
              <TableHeader>担当者</TableHeader>
              <TableData></TableData>
            </TableRow>
            <TableRow>
              <TableHeader>住所</TableHeader>
              <TableData></TableData>
            </TableRow>
          </Table>
          <ApplyButton disabled={currentUser ? false : true}>応募する</ApplyButton>
        </CompanyContainer>
      </AuditionContainer>
    </AuditionWrapper>
  )
})
