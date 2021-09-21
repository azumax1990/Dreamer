import axios from "axios"
import { GroupUserParams } from "../types"

// メッセージグループ作成
export const PostGroup = (params: GroupUserParams) => {
  return axios.post("http://localhost:3000/api/groups", params)
}