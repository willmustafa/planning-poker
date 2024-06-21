import { number, object, string } from 'yup'

export const userSchema = object({
  nickname: string().required(),
  session_id: string().required(),
  points: number()
})
