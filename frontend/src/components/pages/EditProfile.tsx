import React, { memo, useContext, useEffect, VFC } from 'react'
import MediaQuery from 'react-responsive'

import { LoginUserContext } from '../../App'

import { useEditProfile } from '../../hooks/useEditProfile'
import { CompanyPcResponsive } from '../mediaQuery/edit/company/CompanyPcResponsive'
import { SmartPhoneResponsive } from '../mediaQuery/edit/company/SmartPhoneResponsive'
import { PlayerPcResponsive } from '../mediaQuery/edit/profile/PlayerPcResponsive'
import { PlayerSmartPhoneResponsive } from '../mediaQuery/edit/profile/PlayerSmartPhoneResponsive'
import { EditPageHeader } from '../organisms/header/pcResponsive/EditPageHeader'
import { MessagePageSmartPhoneHeader } from '../organisms/header/smartPhoneResponsive/MessagePageSmartPhoneHeader'


type Props = {
  id: string;
}
export const EditProfile: VFC<Props> = memo((props) => {
  const { id } = props;
  const { currentUser } = useContext(LoginUserContext)

  //hooks
  const { job,
          name,
          avatar,
          age,
          gender,
          tall,
          prefecture,
          introduction,
          company,
          description,
          onClickPostProfile,
          onChangeImage,
          onChangeJob,
          onChangeName,
          onChangeAge,
          onChangeGender,
          onChangeTall,
          onChangePrefecture,
          onChangeIntroduction,
          onChangeCompany,
          onChangeDescription,
          resetImage,
          getProfile} = useEditProfile()

  // 編集プロフィール取得
  useEffect(() => {
    getProfile(id)
  }, [currentUser, getProfile, id])
  return (
    <>
      {job === '演者' ? (
        <>
          <MediaQuery query="(min-width: 768px)">
            <EditPageHeader />
            <PlayerPcResponsive job={job}
                                name={name}
                                avatar={avatar}
                                age={age}
                                gender={gender}
                                tall={tall}
                                prefecture={prefecture}
                                introduction={introduction}
                                onChangeImage={onChangeImage} 
                                onChangeJob={onChangeJob}
                                onChangeName={onChangeName}
                                onChangeAge={onChangeAge}
                                onChangeGender={onChangeGender}
                                onChangeTall={onChangeTall}
                                onChangePrefecture={onChangePrefecture}
                                onChangeIntroduction={onChangeIntroduction}
                                resetImage={resetImage}
                                onClickPostProfile={onClickPostProfile}
                                />
          </MediaQuery>
          <MediaQuery query="(max-width: 767px)">
            <MessagePageSmartPhoneHeader/>
            <PlayerSmartPhoneResponsive job={job}
                                        name={name}
                                        avatar={avatar}
                                        age={age}
                                        gender={gender}
                                        tall={tall}
                                        prefecture={prefecture}
                                        introduction={introduction}
                                        onChangeImage={onChangeImage} 
                                        onChangeJob={onChangeJob}
                                        onChangeName={onChangeName}
                                        onChangeAge={onChangeAge}
                                        onChangeGender={onChangeGender}
                                        onChangeTall={onChangeTall}
                                        onChangePrefecture={onChangePrefecture}
                                        onChangeIntroduction={onChangeIntroduction}
                                        resetImage={resetImage}
                                        onClickPostProfile={onClickPostProfile}/>
          </MediaQuery>
        </>
      ) : (
        <>
          <MediaQuery query="(min-width: 768px)">
            <EditPageHeader />
            <CompanyPcResponsive job={job} company={company} description={description} onChangeJob={onChangeJob} onChangeCompany={onChangeCompany} onChangeDescription={onChangeDescription} onClickPostProfile={onClickPostProfile}/>
          </MediaQuery>
          <MediaQuery query="(max-width: 767px)">
            <MessagePageSmartPhoneHeader/>
            <SmartPhoneResponsive job={job} company={company} description={description} onChangeJob={onChangeJob} onChangeCompany={onChangeCompany} onChangeDescription={onChangeDescription} onClickPostProfile={onClickPostProfile}/>
          </MediaQuery>
        </>
      )}
    </>
  )
})
