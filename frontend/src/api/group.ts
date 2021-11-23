import axios from "axios"
import { GroupUserParams } from "../types"
import { DEFAULT_API } from "../url/indx"

// メッセージグループ作成
export const PostGroup = (params: GroupUserParams) => {
  return axios.post(`${DEFAULT_API}/api/groups`, params)
}