import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertPromptSchema,
  sendPromptSchema,
  type CodeStralResponse,
} from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/prompts", async (req, res) => {
    try {
      const prompts = await storage.getAllPrompts();
      res.json(prompts);
    } catch (error) {
      console.error("Error fetching prompts:", error);
      res.status(500).json({ error: "Erro ao buscar prompts" });
    }
  });

  app.post("/api/prompts", async (req, res) => {
    try {
      const data = insertPromptSchema.parse(req.body);
      const prompt = await storage.createPrompt(data);
      res.json(prompt);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Dados inválidos", details: error.errors });
      } else {
        console.error("Error creating prompt:", error);
        res.status(500).json({ error: "Erro ao salvar prompt" });
      }
    }
  });

  app.delete("/api/prompts/:id", async (req, res) => {
    try {
      await storage.deletePrompt(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting prompt:", error);
      res.status(500).json({ error: "Erro ao deletar prompt" });
    }
  });

  app.post("/api/codestral/generate", async (req, res) => {
    try {
      const { prompt } = sendPromptSchema.parse(req.body);
      const apiKey = process.env.CODESTRAL_API_KEY || process.env.MISTRAL_API_KEY;

      if (!apiKey) {
        return res.status(400).json({
          error: "Chave da API não configurada",
          message: "Configure CODESTRAL_API_KEY ou MISTRAL_API_KEY nas variáveis de ambiente",
        });
      }

      const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "codestral-latest",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("CodeStral API error:", errorData);
        return res.status(response.status).json({
          error: "Erro na API do CodeStral",
          message: errorData.error?.message || "Erro desconhecido",
        });
      }

      const data = await response.json();
      const codeStralResponse: CodeStralResponse = {
        response: data.choices[0]?.message?.content || "Sem resposta",
        model: data.model,
        usage: data.usage
          ? {
              promptTokens: data.usage.prompt_tokens,
              completionTokens: data.usage.completion_tokens,
              totalTokens: data.usage.total_tokens,
            }
          : undefined,
      };

      res.json(codeStralResponse);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Prompt inválido", details: error.errors });
      } else {
        console.error("Error generating response:", error);
        res.status(500).json({ error: "Erro ao gerar resposta" });
      }
    }
  });

  app.get("/api/suggestions", async (req, res) => {
    const { query } = req.query;
    
    const suggestions = [
      "Crie uma função que",
      "Otimize o seguinte código",
      "Explique como funciona",
      "Adicione tratamento de erros para",
      "Refatore este código para usar",
      "Escreva testes unitários para",
      "Documente a função",
      "Corrija o bug em",
      "Converta este código para",
      "Analise a complexidade de",
    ];

    if (typeof query === "string" && query.length > 0) {
      const filtered = suggestions.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      );
      res.json(filtered);
    } else {
      res.json([]);
    }
  });

  app.get("/api/status", async (req, res) => {
    const apiKey = process.env.CODESTRAL_API_KEY || process.env.MISTRAL_API_KEY;
    res.json({ 
      connected: !!apiKey,
      hasApiKey: !!apiKey 
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
