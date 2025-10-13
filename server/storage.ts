import { type Prompt, type InsertPrompt } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getPrompt(id: string): Promise<Prompt | undefined>;
  getAllPrompts(): Promise<Prompt[]>;
  createPrompt(prompt: InsertPrompt): Promise<Prompt>;
  deletePrompt(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private prompts: Map<string, Prompt>;

  constructor() {
    this.prompts = new Map();
  }

  async getPrompt(id: string): Promise<Prompt | undefined> {
    return this.prompts.get(id);
  }

  async getAllPrompts(): Promise<Prompt[]> {
    return Array.from(this.prompts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createPrompt(insertPrompt: InsertPrompt): Promise<Prompt> {
    const id = randomUUID();
    const prompt: Prompt = {
      id,
      content: insertPrompt.content,
      templateId: insertPrompt.templateId ?? null,
      createdAt: new Date(),
    };
    this.prompts.set(id, prompt);
    return prompt;
  }

  async deletePrompt(id: string): Promise<void> {
    this.prompts.delete(id);
  }
}

export const storage = new MemStorage();
