import React, { memo, useContext, VFC } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { PostGroup } from '../../../../api/group'
import { LoginUserContext } from '../../../../App'
import { GroupUserParams, Post, Profile } from '../../../../types'
import { Images } from '../../../organisms/profile/smartPhoneResponsive/Images'

const ProfileWrapper = styled.div`
  padding: 50px 30px;
`
const ProfileNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #DCDCDC;
  padding-bottom: 10px;
`
const CompanyName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
`
const EditButton = styled.button`
  cursor: pointer;
`
const IntroductionContainer = styled.div`
  padding-top: 25px;
`
const IntroductionText = styled.p`
  font-size: 16px;
  letter-spacing: 8px;
`
const ImagesWrapper = styled.div`
`
type Props = {
  profile: Profile | undefined;
  posts:   Array<Post>;
  groupId: number | undefined;
}
export const SmartPhoneResponsive: VFC<Props> = memo((props) => {
  const { profile, posts, groupId } = props;
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
        <ProfileNameContainer>
          { profile?.company ? (<CompanyName>{profile.company}</CompanyName>) : (<CompanyName>未設定</CompanyName>)}
          { currentUser?.id === profile?.user_id ? (
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
        <IntroductionContainer>
          { profile?.description ? (<IntroductionText>{profile?.description}</IntroductionText>) : (<IntroductionText></IntroductionText>)}
        </IntroductionContainer>
      </ProfileWrapper>
      <ImagesWrapper>
        {posts.map((post) => (
          <Images post={post} key={post.id}/>
        ))}
      </ImagesWrapper>
    </>
  )
})
