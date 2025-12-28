# Promptizer

## 🚀 Ferramenta Avançada de Engenharia de Prompt

O Promptizer é uma aplicação full-stack desenvolvida para otimizar o processo de engenharia de prompts, especialmente focada em geração de código e assistência técnica. A aplicação integra-se com a API CodeStral (Mistral AI) para fornecer respostas inteligentes e geração de código de alta qualidade.

## 🌟 Recursos

- **Editor de Prompts Avançado**: Interface intuitiva para criação e edição de prompts
- **Integração com CodeStral**: Conexão direta com o modelo CodeStral da Mistral AI
- **Histórico de Prompts**: Armazenamento e recuperação de prompts anteriores
- **Avaliação de Prompts**: Sistema de rating para avaliar a qualidade das respostas
- **Sugestões Inteligentes**: Auto-completar com sugestões baseadas em padrões comuns
- **Validação em Tempo Real**: Feedback imediato sobre a qualidade do prompt
- **Design em Português**: Interface completamente em português brasileiro
- **Tema Escuro Padrão**: Otimizado para uso prolongado por desenvolvedores

## 🛠️ Tecnologias Utilizadas

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Radix UI Components
- Lucide React Icons
- TanStack Query (React Query)

### Backend
- Node.js
- Express
- TypeScript
- Zod (validação de esquemas)

### Banco de Dados
- PostgreSQL (via Neon Serverless)
- Drizzle ORM

### IA
- CodeStral (Mistral AI API)
- Modelos de linguagem avançados

### Outras Ferramentas
- Vite (empacotamento e desenvolvimento)
- Framer Motion (animações)
- Wouter (roteamento)

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn
- Chave de API da Mistral AI (CodeStral)

### Instalação

1. Clone este repositório:
```bash
git clone https://github.com/jhonnybrzz1/PROMPTZER.git
```

2. Instale as dependências:
```bash
cd PROMPTZER
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env na raiz do projeto
CODESTRAL_API_KEY=sua_chave_codestral_ou_mistral
# ou
MISTRAL_API_KEY=sua_chave_mistral
```

4. Execute a aplicação em modo de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5000` (ou na porta especificada na variável `PORT`).

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo de desenvolvimento com hot-reload
- `npm run build` - Compila a aplicação para produção
- `npm run start` - Inicia a aplicação em modo de produção
- `npm run check` - Executa a verificação de tipos TypeScript
- `npm run db:push` - Atualiza o banco de dados com as últimas migrações do Drizzle

## 📁 Estrutura do Projeto

```
├── client/                 # Código-fonte do frontend React
│   ├── components/         # Componentes reutilizáveis
│   ├── pages/              # Páginas da aplicação
│   ├── hooks/              # Hooks personalizados
│   ├── lib/                # Bibliotecas e utilitários
│   ├── index.css          # Estilos globais
│   └── main.tsx           # Ponto de entrada do React
├── server/                 # Código-fonte do backend Express
│   ├── index.ts           # Ponto de entrada do servidor
│   ├── routes.ts          # Definição de rotas da API
│   └── storage.ts         # Lógica de armazenamento
├── shared/                 # Esquemas compartilhados e tipos
├── attached_assets/       # Recursos estáticos
├── design_guidelines.md   # Diretrizes de design do sistema
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração do TypeScript
├── tailwind.config.ts     # Configuração do Tailwind CSS
└── vite.config.ts         # Configuração do Vite
```

## 📊 Funcionalidades

1. **Editor de Prompts**: Área principal para criação e edição de prompts
2. **Integração com IA**: Envio direto para o modelo CodeStral
3. **Histórico**: Acesso a prompts anteriores com possibilidade de reutilização
4. **Avaliação**: Sistema de rating para melhorar a qualidade dos prompts
5. **Templates**: Coleção de templates para diferentes tipos de tarefas
6. **Validação**: Feedback em tempo real sobre a qualidade do prompt
7. **Sugestões**: Auto-completar com sugestões contextuais

## 🎯 Casos de Uso

- Geração de código a partir de descrições textuais
- Otimização de código existente
- Debugging assistido por IA
- Documentação automática de funções
- Análise de complexidade de algoritmos
- Criação de testes unitários
- Refatoração de código legado
- Explicação de código complexo

## 🎨 Design System

O Promptizer utiliza um design system baseado no Material Design 3 com influências do Linear e VS Code, otimizado para usuários técnicos. O sistema prioriza clareza, eficiência e estética profissional com foco em usuários brasileiros.

## 🤝 Contribuição

Sinta-se à vontade para contribuir com este projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob os termos descritos no arquivo LICENSE.

## 📞 Suporte

Para suporte, abra uma issue no repositório ou entre em contato com o mantenedor.