import { array, boolean, type InferType, object, string } from 'yup'

export const sessionSchema = object({
  created_at: string().optional(),
  session_id: string().required(),
  info: object({
    points: array().optional(),
    card: string().optional(),
    revealed: boolean().optional()
  })
})

export type sessionType = InferType<typeof sessionSchema>
