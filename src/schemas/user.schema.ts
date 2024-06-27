import { type InferType, number, object, string } from 'yup'

export const userSchema = object({
  nickname: string().required(),
  session_id: string().required(),
  points: number().optional()
})

export type userType = InferType<typeof userSchema>
