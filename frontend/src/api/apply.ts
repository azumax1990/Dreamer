import axios from "axios"
import { ApplyParams } from "../types"

// オーディション応募
export const postApply = (audition_id: string, params: ApplyParams) => {
  return axios.post(`http://localhost:3000/api/auditions/${audition_id}/applies`, {
    user_id: params.user_id
  })
}
