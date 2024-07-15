import { boolean, type InferType, number, object, string } from 'yup'

export enum UserType {
  'PLAYER' = 'player',
  'OBSERVER' = 'observer'
}

export const userSchema = object({
  created_at: string().optional(),
  nickname: string().required(),
  session_id: string().required(),
  points: number().nullable(),
  user_id: number().optional(),
  type: string().required().oneOf(Object.values(UserType)).default(UserType.PLAYER),
  is_admin: boolean().required().default(false)
})

export type userType = InferType<typeof userSchema>
