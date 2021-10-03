import React, { memo, useContext, VFC } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { LoginUserContext } from '../../../../App'
import { GroupUserParams, Post, Profile } from '../../../../types'
import avatarImage from '../../../../images/no-avatar.jpeg'
import { Images } from '../../../organisms/profile/smartPhoneResponsive/Images'
import { PostGroup } from '../../../../api/group'


const ProfileWrapper = styled.div`
  padding: 50px 0;
  
`
const ProfileLeftWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
`
const ProfileNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 10px 10px;
`
const UserName = styled.h2`
  font-size: 20px;
  font-weight: lighter;
  margin: 0;
`
const EditButton = styled.button`
  cursor: pointer;
`
const ProfileAvatar = styled.img`
  width: 100%;
  height: 300px;
`
const ProfileRightWrapper = styled.div`
  width: 100%;
`
const ProfileInfoContainer = styled.div`
  padding: 0 10px 0 10px;
  border-bottom: solid 1px #DCDCDC;
`
const ProfileText = styled.p`
  font-size: 20px;
  opacity: 0.8;
`
const IntroductionContainer = styled.div`
  padding: 0 10px 0 10px;
`
const IntroductionText= styled.p`
  letter-spacing: 8px;
`
const ImagesWrapper = styled.div`
  padding-bottom: 20px;
`

type Props = {
  profile: Profile;
  posts:   Array<Post>;
  groupId:   number | undefined;
}

export const SmartPhoneResponsive: VFC<Props> = memo((props) => {
  const { profile, posts, groupId } = props
  const { currentUser } = useContext(LoginUserContext)
  const history = useHistory()

  const moveToMessageGroup = () => history.push(`/group/${groupId}`)

  const params: GroupUserParams = {
    userId: currentUser?.id,
    profileId: profile?.user_id
  }

  const onClickPostGroup = () => {
    PostGroup(params)
    .then((res) => {
      const groupId = res.data.id
      history.push(`/group/${groupId}`)
    })
    .catch(() => alert('エラーが発生しました。もう一度お試しください。'))
  }
  
  return (
    <>
      <ProfileWrapper>
        <ProfileLeftWrapper>
          <ProfileNameContainer>
            { profile.name ? (<UserName>{profile.name}</UserName>) : (<UserName>未設定</UserName>)}
            { !currentUser ? (null) : currentUser?.id === profile?.user_id ? (
              <Link to={`/user/${currentUser?.id}/profile/edit`}>
                <EditButton>編集する</EditButton>
              </Link>
              ) : groupId ? (
                <EditButton onClick={moveToMessageGroup}>メールする</EditButton>
              ) : (
                <EditButton onClick={onClickPostGroup}>メールする</EditButton>
              )
            }
          </ProfileNameContainer>
          {profile.avatar_url ? (<ProfileAvatar src={profile.avatar_url} alt="プロフィール"/>)
            : (
                <ProfileAvatar src={avatarImage} alt="プロフィール"/>
              )
          }
        </ProfileLeftWrapper>
        <ProfileRightWrapper>
          <ProfileInfoContainer>
            {profile.gender ? (<ProfileText>性別 : {profile.gender}</ProfileText>) : (<ProfileText>性別 : 未設定</ProfileText>)}
            {profile.age ? (<ProfileText>年齢 : {profile.age}歳</ProfileText>) : (<ProfileText>年齢 : 未設定</ProfileText>)}
            {profile.tall ? (<ProfileText>身長 : {profile.tall}cm</ProfileText>) : (<ProfileText>身長 : 未設定</ProfileText>)}
            {profile.prefecture ? (<ProfileText>出身地 : {profile.prefecture}</ProfileText>) : (<ProfileText>出身地 : 未設定</ProfileText>)}
          </ProfileInfoContainer>
          <IntroductionContainer>
            <IntroductionText>{profile.introduction}</IntroductionText>
          </IntroductionContainer>
        </ProfileRightWrapper>
      </ProfileWrapper>
      <ImagesWrapper>
        {posts.map((post) => (
          <Images post={post} key={post.id}/>
        ))}
      </ImagesWrapper>
    </>
  )
})
