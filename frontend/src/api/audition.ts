import axios from "axios"
import { AuditionParams } from "../types"

// オーディション一覧取得
export const getAllAuditions = () => {
  return axios.get("http://localhost:3000/api/auditions")
}

// オーディション作成
export const PostAudition = (params: AuditionParams) => {
  return axios.post("http://localhost:3000/api/auditions", params)
}

// オーディション情報取得
export const getAudition = (id: string) => {
  return axios.get(`http://localhost:3000/api/auditions/${id}`)
}



