import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const prompts = pgTable("prompts", {
  id: varchar("id").primaryKey(),
  content: text("content").notNull(),
  templateId: varchar("template_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPromptSchema = createInsertSchema(prompts).omit({
  id: true,
  createdAt: true,
});

export type InsertPrompt = z.infer<typeof insertPromptSchema>;
export type Prompt = typeof prompts.$inferSelect;

export const sendPromptSchema = z.object({
  prompt: z.string().min(20, "Prompt deve ter pelo menos 20 caracteres"),
});

export type SendPromptRequest = z.infer<typeof sendPromptSchema>;

export interface CodeStralResponse {
  response: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}
