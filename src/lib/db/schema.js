"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorEmbeddingSchema = exports.TagSchema = exports.MessageSchema = exports.ChatSchema = exports.UserSchema = void 0;
var zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    email: zod_1.z.string().email(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date()
});
exports.ChatSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    userId: zod_1.z.string().uuid(),
    title: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date()
});
exports.MessageSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    chatId: zod_1.z.string().uuid(),
    role: zod_1.z.enum(['user', 'assistant', 'system']),
    content: zod_1.z.string(),
    model: zod_1.z.string().optional(),
    createdAt: zod_1.z.date()
});
exports.TagSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    createdAt: zod_1.z.date()
});
exports.VectorEmbeddingSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    contentId: zod_1.z.string().uuid(),
    contentType: zod_1.z.string(),
    embedding: zod_1.z.array(zod_1.z.number()),
    createdAt: zod_1.z.date()
});
