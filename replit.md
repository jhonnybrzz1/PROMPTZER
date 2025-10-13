# Promptizer

## Visão Geral
Promptizer é uma ferramenta web intuitiva para criar prompts eficazes e específicos para a IA CodeStral (Mistral AI). A aplicação oferece templates pré-definidos, sugestões contextuais em tempo real, validações automáticas e histórico de prompts.

## Arquitetura
- **Frontend**: React com TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Express.js com armazenamento em memória
- **Integração**: API Mistral AI (CodeStral)
- **Idioma**: Interface completamente em Português Brasileiro

## Funcionalidades Principais

### 1. Templates Pré-Definidos
- Geração de Código (Python, JavaScript, etc.)
- Otimização de Algoritmos
- Debug e Correção de Erros
- Documentação de Código
- Análise de Complexidade

### 2. Editor de Prompts
- Área de edição com fonte monospace
- Contador de caracteres
- Validações em tempo real
- Sugestões contextuais automáticas
- Auto-completar baseado em contexto

### 3. Validações em Tempo Real
- Alerta para prompts muito curtos
- Verificação de contexto insuficiente
- Detecção de prompts incompletos
- Feedback visual com cores (sucesso/aviso/erro)

### 4. Histórico de Prompts
- Armazenamento temporário na sessão (memória)
- Visualização cronológica reversa
- Ações rápidas: reutilizar, editar, deletar
- Timestamp relativo (agora, Xmin atrás, Xh atrás)

### 5. Integração CodeStral
- Envio direto de prompts para API Mistral
- Visualização de respostas com syntax highlighting
- Indicador de status da conexão
- Cópia rápida de respostas

## Configuração da API

### Variáveis de Ambiente Necessárias
```bash
CODESTRAL_API_KEY=sua_chave_aqui
# ou
MISTRAL_API_KEY=sua_chave_aqui
```

### Como Obter a Chave da API
1. Acesse [https://console.mistral.ai](https://console.mistral.ai)
2. Crie uma conta ou faça login
3. Navegue até API Keys
4. Crie uma nova chave de API
5. Configure a variável de ambiente no Replit

### Status da Conexão
- **Conectado**: Chave de API configurada e válida
- **Desconectado**: Chave não configurada ou inválida

## Estrutura de Arquivos

### Backend
- `server/routes.ts` - Rotas da API (prompts, CodeStral, sugestões)
- `server/storage.ts` - Interface e implementação de armazenamento
- `shared/schema.ts` - Schemas de dados compartilhados

### Frontend
- `client/src/pages/Home.tsx` - Página principal
- `client/src/components/` - Componentes React
  - `TopBar.tsx` - Barra superior com status e tema
  - `TemplateLibrary.tsx` - Biblioteca de templates
  - `PromptEditor.tsx` - Editor com sugestões
  - `ValidationAlert.tsx` - Alertas de validação
  - `HistoryPanel.tsx` - Painel de histórico
  - `ResponseDisplay.tsx` - Exibição de respostas
- `client/src/hooks/` - Hooks personalizados
  - `usePrompts.ts` - Gerenciamento de prompts
  - `useCodeStral.ts` - Integração com CodeStral
  - `useSuggestions.ts` - Sugestões contextuais

## Endpoints da API

### Prompts
- `GET /api/prompts` - Lista todos os prompts
- `POST /api/prompts` - Cria novo prompt
- `DELETE /api/prompts/:id` - Deleta prompt

### CodeStral
- `POST /api/codestral/generate` - Envia prompt para CodeStral

### Sugestões
- `GET /api/suggestions?query=termo` - Busca sugestões

## Design System
- **Cores Primárias**: Roxo vibrante (#8B5CF6) para ações principais
- **Modo Escuro**: Padrão (tonalidades de ardósia)
- **Modo Claro**: Disponível via toggle
- **Tipografia**: Inter (UI), Fira Code/JetBrains Mono (código)
- **Espaçamento**: Sistema consistente (2, 3, 4, 6, 8, 12, 16)

## Fluxo de Uso

1. **Seleção de Template** (opcional)
   - Usuário escolhe template da biblioteca
   - Prompt pré-preenchido no editor

2. **Edição do Prompt**
   - Digite ou edite o prompt
   - Receba sugestões automáticas
   - Veja validações em tempo real

3. **Envio para CodeStral**
   - Clique em "Enviar para CodeStral"
   - Prompt salvo automaticamente no histórico
   - Resposta exibida abaixo do editor

4. **Gerenciamento do Histórico**
   - Reutilize prompts anteriores
   - Edite e reenvie
   - Delete prompts desnecessários

## Tecnologias Utilizadas
- React 18 + TypeScript
- TailwindCSS + Shadcn UI
- React Query (TanStack Query)
- Express.js
- Wouter (roteamento)
- Zod (validação)
- Lucide React (ícones)

## Estado Atual
✅ Interface completa em português
✅ Sistema de templates funcionando
✅ Editor com sugestões contextuais
✅ Validações em tempo real
✅ Histórico de prompts
✅ Integração com API Mistral CodeStral
✅ Armazenamento temporário (memória)

## Próximas Melhorias Planejadas
- [ ] Persistência em banco de dados PostgreSQL
- [ ] Sistema de compartilhamento de prompts
- [ ] Exportação de prompts/respostas (PDF, MD)
- [ ] Categorização e tags
- [ ] Métricas e analytics
- [ ] Autenticação de usuários

## Notas de Desenvolvimento
- Armazenamento atual: MemStorage (dados perdidos ao reiniciar)
- API Key deve ser configurada antes do primeiro uso
- Sugestões baseadas em padrões predefinidos
- Dark mode é o padrão (melhor para desenvolvedores)
