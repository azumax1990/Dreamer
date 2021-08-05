// サインアップ
export type SignUp = {
  email: string
  password: string
  passwordConfirmation: string
}

// サインイン
export type SignIn = {
  email: string
  password: string
}

// ユーザー
export type User = {
  id: number
  uid: string
  provider: string
  email: string
  name?: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
}