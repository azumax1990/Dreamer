import axios from "axios"
import { ApplyParams } from "../types"

// オーディション応募
export const postApply = (audition_id: string, params: ApplyParams) => {
  return axios.post(`http://localhost:3000/api/auditions/${audition_id}/applies`, {
    user_id: params.user_id
  })
}

// 応募削除
export const deleteApply = (audition_id: string, id: number | undefined) => {
  return axios.delete(`http://localhost:3000/api/auditions/${audition_id}/applies/${id}`)
}