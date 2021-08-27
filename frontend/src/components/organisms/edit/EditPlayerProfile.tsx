import React, { ChangeEvent, memo, VFC } from 'react'
import styled from 'styled-components'

import { ages } from '../../../data/age'
import { genders } from '../../../data/gender'
import { heights } from '../../../data/height'
import { prefectures } from '../../../data/prefecture'


const LabelTag = styled.label`
  font-size: 20px;
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
  box-shadow:  0 0 3px gray;
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
  border-color: #f5f5f5;
  outline: none;
  box-shadow:  0 0 3px gray;
`
const SelectTag = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  box-shadow: 0 0 3px gray;
  outline: none;
  font-size: 16px;
`
const OptionTag = styled.option`
`
type Props = {
  job:                  string,
  name:                 string | undefined,
  age:                  number | undefined,
  gender:               string | undefined,
  tall:                 number | undefined,
  prefecture:           string | undefined,
  introduction:         string | undefined,
  onChangeImage:        (e: ChangeEvent<HTMLInputElement>) => void,
  onChangeJob:         (e: ChangeEvent<HTMLInputElement>) => void,
  onChangeName:         (e: ChangeEvent<HTMLInputElement>) => void,
  onChangeAge:          (e: ChangeEvent<{ value: unknown }>) => void,
  onChangeGender:       (e: ChangeEvent<HTMLSelectElement>) => void,
  onChangeTall:         (e: ChangeEvent<{ value: unknown }>) => void,
  onChangePrefecture:   (e: ChangeEvent<HTMLSelectElement>) => void,
  onChangeIntroduction: (e: ChangeEvent<HTMLTextAreaElement>) => void,
}

export const EditPlayerProfile: VFC<Props> = memo((props) => {
  const { job, name, age, gender, tall, prefecture, introduction,
          onChangeImage, onChangeJob, onChangeName, onChangeAge, onChangeGender, onChangeTall, onChangePrefecture, onChangeIntroduction
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
        <LabelTag htmlFor="formAvatar">写真</LabelTag>
        <InputTag type="file" id="formAvatar" name="avatar" onChange={onChangeImage}/>
      </InputContainer>
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
