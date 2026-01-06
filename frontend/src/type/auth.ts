export interface RegisterPayload {
  fullname: string
  email: string
  username: string
  password: string
}

export interface RegisterResponse {
  data?: {
    accessToken?: string
    token?: string
  }
}
