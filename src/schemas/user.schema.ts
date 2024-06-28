import { type InferType, number, object, string } from 'yup'

export const userSchema = object({
  created_at: string().optional(),
  nickname: string().required(),
  session_id: string().required(),
  points: number().nullable(),
  user_id: number().optional()
})

export type userType = InferType<typeof userSchema>
