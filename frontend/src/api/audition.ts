import axios from "axios"
import { Audition, AuditionParams } from "../types"
import { DEFAULT_API } from "../url/indx"

// オーディション一覧取得
export const getAllAuditions = () => {
  return axios.get<Array<Audition>>(`${DEFAULT_API}/api/auditions`)
}

// オーディション作成
export const PostAudition = (params: AuditionParams) => {
  return axios.post(`${DEFAULT_API}/api/auditions`, params)
}

// オーディション情報取得
export const getAudition = (id: string | number) => {
  return axios.get(`${DEFAULT_API}/api/auditions/${id}`)
}

// オーディション削除
export const deleteAudition = (id: number | undefined) => {
  return axios.delete(`${DEFAULT_API}/api/auditions/${id}`)
}