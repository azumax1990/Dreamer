import React, { ChangeEvent, memo, VFC } from 'react'
import styled from 'styled-components'
import { FaCamera } from 'react-icons/fa'

import { ages } from '../../../data/age'
import { genders } from '../../../data/gender'
import { heights } from '../../../data/height'
import { prefectures } from '../../../data/prefecture'


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
type Props = {
  job:                  string,
  name:                 string | undefined,
  avatar:               {data: string, name: string};
  age:                  number | undefined,
  gender:               string | undefined,
  tall:                 number | undefined,
  prefecture:           string | undefined,
  introduction:         string | undefined,
  onChangeImage:        (e: ChangeEvent<HTMLInputElement>) => void,
  onChangeJob:          (e: ChangeEvent<HTMLInputElement>) => void,
  onChangeName:         (e: ChangeEvent<HTMLInputElement>) => void,
  onChangeAge:          (e: ChangeEvent<{ value: unknown }>) => void,
  onChangeGender:       (e: ChangeEvent<HTMLSelectElement>) => void,
  onChangeTall:         (e: ChangeEvent<{ value: unknown }>) => void,
  onChangePrefecture:   (e: ChangeEvent<HTMLSelectElement>) => void,
  onChangeIntroduction: (e: ChangeEvent<HTMLTextAreaElement>) => void,
  resetImage:           () => void,
}

export const EditPlayerProfile: VFC<Props> = memo((props) => {
  const { job, name, avatar, age, gender, tall, prefecture, introduction,
          onChangeImage, onChangeJob, onChangeName, onChangeAge, onChangeGender, onChangeTall, onChangePrefecture, onChangeIntroduction, resetImage
        } = props;

  return (
    <>
      <InputContainer>
        <RadioTag type="radio" id="formActor" name="type" value="演者" required checked={job === '演者'} onChange={onChangeJob}/>
        <LabelTag htmlFor="formActor">演者<SpanTag>（俳優、歌手、その他）</SpanTag></LabelTag>
        <br />
        <RadioTag type="radio" id="formCompany" name="type" value="企業" onChange={onChangeJob}/>
        <LabelTag htmlFor="formCompany">企業<SpanTag>（事務所、劇団、映像制作会社）</SpanTag></LabelTag>
      </InputContainer>
      <InputContainer>
        <LabelTag htmlFor="formName">名前</LabelTag>
        <InputTag id="formName" value={name} placeholder="名前を入力してください" onChange={onChangeName} />
      </InputContainer>
      <InputContainer>
        <LabelAvatarTag htmlFor="formAvatar"><FaCamera /><AvatarSpanTag>写真を追加する</AvatarSpanTag></LabelAvatarTag>
        <InputAvatarTag type="file" id="formAvatar" name="avatar" onChange={onChangeImage}/>
      </InputContainer>
      { avatar.data ? (
        <>
          <ResetButton onClick={resetImage}>リセット</ResetButton>
          <ImgPreview src={avatar.data} />
        </>
      ) : (null)}
      <InputContainer>
        <LabelTag htmlFor="formAge">年齢</LabelTag>
        <SelectTag id="formAge" value={age} onChange={onChangeAge}>
          {ages.map((age: string, index: number) => (
            <OptionTag key={index} value={age}>{age}</OptionTag>
          ))}
        </SelectTag>
      </InputContainer>
      <InputContainer>
        <LabelTag htmlFor="formGender">性別</LabelTag>
        <SelectTag id="formGender" value={gender} onChange={onChangeGender}>
          {genders.map((gender: string, index: number) => (
            <OptionTag key={index} value={gender}>{gender}</OptionTag>
          ))}
        </SelectTag>
      </InputContainer>
      <InputContainer>
        <LabelTag htmlFor="formTall">身長</LabelTag>
        <SelectTag id="formTall" value={tall} onChange={onChangeTall}>
          {heights.map((height: string, index: number) => (
            <OptionTag key={index} value={height}>{height}</OptionTag>
          ))}
        </SelectTag>
      </InputContainer>
      <InputContainer>
        <LabelTag htmlFor="formPrefecture">出身地</LabelTag>
        <SelectTag id="formPrefecture" value={prefecture} onChange={onChangePrefecture}>
          {prefectures.map((prefecture: string, index: number) => (
            <OptionTag key={index} value={prefecture}>{prefecture}</OptionTag>
          ))}
        </SelectTag>
      </InputContainer>
      <InputContainer>
        <LabelTag htmlFor="formIntroduction">自己紹介</LabelTag>
        <TextAreaTag id="formIntroduction" value={introduction} placeholder="趣味 特技 出演経歴など..." onChange={onChangeIntroduction}/>
      </InputContainer>
    </>
  )
})
