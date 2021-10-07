import axios from "axios"
import { Audition, AuditionParams } from "../types"

// オーディション一覧取得
export const getAllAuditions = () => {
  return axios.get<Array<Audition>>("http://localhost:3000/api/auditions")
}

// オーディション作成
export const PostAudition = (params: AuditionParams) => {
  return axios.post("http://localhost:3000/api/auditions", params)
}

// オーディション情報取得
export const getAudition = (id: string | number) => {
  return axios.get(`http://localhost:3000/api/auditions/${id}`)
}

// オーディション削除
export const deleteAudition = (id: number | undefined) => {
  return axios.delete(`http://localhost:3000/api/auditions/${id}`)
}



