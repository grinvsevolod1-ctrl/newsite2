import { z } from "zod"

export const userUpdateSchema = z.object({
  full_name: z.string().min(2).max(100).optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .optional(),
  company: z.string().max(200).optional(),
  position: z.string().max(100).optional(),
  bio: z.string().max(500).optional(),
  avatar_url: z.string().url().optional(),
})

export const orderCreateSchema = z.object({
  service_type: z.enum(["website", "mobile_app", "telegram_bot", "ai_solution", "custom"]),
  title: z.string().min(5).max(200),
  description: z.string().min(20).max(2000),
  budget: z.number().min(0).max(1000000),
  deadline: z.string().datetime().optional(),
  requirements: z.record(z.any()).optional(),
})

export const projectCreateSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(20).max(2000),
  client_id: z.string().uuid(),
  start_date: z.string().datetime(),
  end_date: z.string().datetime().optional(),
  budget: z.number().min(0),
  status: z.enum(["planning", "in_progress", "review", "completed", "cancelled"]),
})

export const ticketCreateSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(20).max(2000),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  category: z.enum(["bug", "feature", "support", "question"]),
})

export const promoCodeCreateSchema = z.object({
  code: z.string().min(3).max(50).toUpperCase(),
  discount_type: z.enum(["percentage", "fixed"]),
  discount_value: z.number().min(0).max(100),
  max_uses: z.number().min(1).optional(),
  expires_at: z.string().datetime().optional(),
  description: z.string().max(500),
})
