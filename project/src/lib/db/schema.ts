import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const ChatSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const MessageSchema = z.object({
  id: z.string().uuid(),
  chatId: z.string().uuid(),
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
  model: z.string().optional(),
  createdAt: z.date()
});

export const TagSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  createdAt: z.date()
});

export const VectorEmbeddingSchema = z.object({
  id: z.string().uuid(),
  contentId: z.string().uuid(),
  contentType: z.string(),
  embedding: z.array(z.number()),
  createdAt: z.date()
});

export type User = z.infer<typeof UserSchema>;
export type Chat = z.infer<typeof ChatSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type Tag = z.infer<typeof TagSchema>;
export type VectorEmbedding = z.infer<typeof VectorEmbeddingSchema>;