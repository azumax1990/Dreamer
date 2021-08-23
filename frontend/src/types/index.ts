// サインアップ
export type SignUpType = {
  email: string
  password: string
  passwordConfirmation: string
}

// サインイン
export type SignInType = {
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
// プロフィール
export type Profile = {
  id?: number;
  userId?: number;
  name?: string;
  avatar_url: string;
  gender?: string;
  age?: number;
  tall?: number;
  prefecture?: string;
  introduction?: string;
  created_at?: Date
  updated_at?: Date
}

export type ParamsProfile = {
  id: number | undefined,
  name: string | undefined,
  age: number | undefined, 
  gender: string | undefined,
  tall: number | undefined, 
  prefecture: string | undefined,
  introduction: string | undefined, 
  avatar: {} | undefined,
}