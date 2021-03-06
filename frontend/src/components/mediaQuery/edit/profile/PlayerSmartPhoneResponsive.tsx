import React, { VFC, memo, ChangeEvent } from 'react'
import styled from 'styled-components'
import { FaCamera } from 'react-icons/fa'

import { ages } from '../../../../data/age'
import { genders } from '../../../../data/gender'
import { heights } from '../../../../data/height'
import { prefectures } from '../../../../data/prefecture'

const EditProfileWrapper = styled.div`
  padding: 40px 0;
  min-height: 100vh;
`

const PageTittle = styled.h1`
  font-size: 26px;
  padding-bottom: 25px;
  margin: 0 ;
  text-align: center;
`
const EditProfileContainer = styled.div`
  padding: 20px 30px;
  margin: 0 auto;
`
const LabelTag = styled.label`
  font-size: 20px;
`
const LabelAvatarTag = styled.label`
  display: block;
  box-sizing:border-box;
  width: 100%;
  padding: 5px 5px 2px 10px;
  margin-top: 15px;
  outline: none;
  border: solid 1px gray;
  box-shadow:  0 0 6px #F5F5F5;
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`
const AvatarSpanTag = styled.span`
  display: inline-block;
  padding-left: 10px;
  margin-bottom: 7px;
`
const InputContainer = styled.div`
  padding-bottom: 25px;
`
const InputTag = styled.input`
  width: 100%;
  font-size: 18px;
  box-sizing:border-box;
  padding: 8px;
  margin-top: 10px;
  border-color: #f5f5f5;
  outline: none;
`
const InputAvatarTag = styled.input`
  display: none;
`
const ResetButton = styled.button`
  display: block;
  padding: 5px 10px;
  margin-bottom: 15px;
  border: none;
  box-shadow:  0 0 4px gray;
  cursor: pointer;
`
const ImgPreview = styled.img`
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
`
const RadioTag = styled.input`
`
const SpanTag = styled.span`
  font-size: 15px;
`
const TextAreaTag = styled.textarea`
  width: 100%;
  height: 200px;
  font-size: 15px;
  box-sizing:border-box;
  padding: 8px;
  margin-top: 10px;
  outline: none;
`
const SelectTag = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  outline: none;
  font-size: 16px;
`
const OptionTag = styled.option`
`
const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  font-size: 15px;
  box-shadow:  0 0 3px gray;
  cursor: pointer;
`
type Props = {
  job:                  string;
  name:                 string | undefined;
  avatar:               {data: string, name: string};
  age:                  number | undefined;
  gender:               string | undefined;
  tall:                 number | undefined;
  prefecture:           string | undefined;
  introduction:         string | undefined;
  onChangeImage:        (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeJob:          (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeName:         (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeAge:          (e: ChangeEvent<{ value: unknown }>) => void;
  onChangeGender:       (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangeTall:         (e: ChangeEvent<{ value: unknown }>) => void;
  onChangePrefecture:   (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangeIntroduction: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  resetImage:           () => void;
  onClickPostProfile:   () => void;
}
export const PlayerSmartPhoneResponsive: VFC<Props> = memo((props) => {
  const { job, name, avatar, age, gender, tall, prefecture, introduction,
    onChangeImage, onChangeJob, onChangeName, onChangeAge, onChangeGender, onChangeTall, onChangePrefecture, onChangeIntroduction, resetImage, onClickPostProfile
  } = props;
  return (
    <EditProfileWrapper>
      <PageTittle>????????????????????????</PageTittle>
      <EditProfileContainer>
        <InputContainer>
          <RadioTag type="radio" id="formActor" name="type" value="??????" required checked={job === '??????'} onChange={onChangeJob}/>
          <LabelTag htmlFor="formActor">??????<SpanTag>?????????????????????????????????</SpanTag></LabelTag>
          <br />
          <RadioTag type="radio" id="formCompany" name="type" value="??????" onChange={onChangeJob}/>
          <LabelTag htmlFor="formCompany">??????<SpanTag>?????????????????????????????????????????????</SpanTag></LabelTag>
        </InputContainer>
        <InputContainer>
          <LabelTag htmlFor="formName">??????</LabelTag>
          <InputTag id="formName" value={name} placeholder="?????????????????????????????????" onChange={onChangeName} />
        </InputContainer>
        <InputContainer>
          <LabelAvatarTag htmlFor="formAvatar"><FaCamera /><AvatarSpanTag>?????????????????????</AvatarSpanTag></LabelAvatarTag>
          <InputAvatarTag type="file" id="formAvatar" name="avatar" onChange={onChangeImage}/>
        </InputContainer>
        { avatar.data ? (
          <>
            <ResetButton onClick={resetImage}>????????????</ResetButton>
            <ImgPreview src={avatar.data} />
          </>
        ) : (null)}
        <InputContainer>
          <LabelTag htmlFor="formAge">??????</LabelTag>
          <SelectTag id="formAge" value={age} onChange={onChangeAge}>
            {ages.map((age: string, index: number) => (
              <OptionTag key={index} value={age}>{age}</OptionTag>
            ))}
          </SelectTag>
        </InputContainer>
        <InputContainer>
          <LabelTag htmlFor="formGender">??????</LabelTag>
          <SelectTag id="formGender" value={gender} onChange={onChangeGender}>
            {genders.map((gender: string, index: number) => (
              <OptionTag key={index} value={gender}>{gender}</OptionTag>
            ))}
          </SelectTag>
        </InputContainer>
        <InputContainer>
          <LabelTag htmlFor="formTall">??????</LabelTag>
          <SelectTag id="formTall" value={tall} onChange={onChangeTall}>
            {heights.map((height: string, index: number) => (
              <OptionTag key={index} value={height}>{height}</OptionTag>
            ))}
          </SelectTag>
        </InputContainer>
        <InputContainer>
          <LabelTag htmlFor="formPrefecture">?????????</LabelTag>
          <SelectTag id="formPrefecture" value={prefecture} onChange={onChangePrefecture}>
            {prefectures.map((prefecture: string, index: number) => (
              <OptionTag key={index} value={prefecture}>{prefecture}</OptionTag>
            ))}
          </SelectTag>
        </InputContainer>
        <InputContainer>
          <LabelTag htmlFor="formIntroduction">????????????</LabelTag>
          <TextAreaTag id="formIntroduction" value={introduction} placeholder="?????? ?????? ??????????????????..." onChange={onChangeIntroduction}/>
        </InputContainer>
        <SubmitButton onClick={onClickPostProfile} disabled={name || age || gender || prefecture || tall || introduction || avatar ? false : true}>??????</SubmitButton>
      </EditProfileContainer>
    </EditProfileWrapper>
  )
})
