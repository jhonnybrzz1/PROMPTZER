# Design Guidelines - Promptizer

## Design Approach
**Selected System**: Material Design 3 with influences from Linear and VS Code for developer-focused UI
**Justification**: Utility-focused productivity tool requiring clarity, efficiency, and professional aesthetics for technical users

## Core Design Principles
1. **Clarity First**: Information hierarchy optimized for quick scanning and decision-making
2. **Developer-Centric**: Familiar patterns from coding environments (syntax highlighting, monospace fonts for code)
3. **Portuguese-Native**: All UI elements, labels, and microcopy in Brazilian Portuguese
4. **Efficiency Over Flash**: Minimal distractions, maximum productivity

## Color Palette

### Dark Mode (Primary)
- **Background**: 220 15% 8% (deep slate, primary surface)
- **Surface Elevated**: 220 15% 12% (cards, panels)
- **Surface Interactive**: 220 15% 16% (hover states)
- **Primary Brand**: 260 85% 65% (vibrant purple for CTAs and accents)
- **Primary Hover**: 260 85% 72%
- **Text Primary**: 220 10% 95% (high contrast)
- **Text Secondary**: 220 8% 70% (labels, hints)
- **Success**: 142 70% 55% (validation success)
- **Warning**: 38 92% 60% (alerts, ambiguous prompts)
- **Error**: 0 72% 60% (validation errors)
- **Border Subtle**: 220 12% 18%
- **Border Interactive**: 220 10% 25%

### Light Mode (Secondary)
- **Background**: 220 15% 98%
- **Surface Elevated**: 0 0% 100%
- **Primary Brand**: 260 75% 55%
- **Text Primary**: 220 15% 15%
- **Text Secondary**: 220 10% 45%

## Typography

### Font Families
- **Primary (UI)**: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif
- **Code/Monospace**: 'Fira Code', 'JetBrains Mono', 'Consolas', monospace
- **Portuguese Optimization**: Ensure proper diacritics rendering (ã, õ, ç, etc.)

### Type Scale
- **Display**: 32px/40px, weight 700 (main headings)
- **H1**: 24px/32px, weight 600 (section titles)
- **H2**: 18px/24px, weight 600 (subsections)
- **Body Large**: 16px/24px, weight 400 (primary content)
- **Body**: 14px/20px, weight 400 (standard text)
- **Caption**: 12px/16px, weight 500 (labels, metadata)
- **Code**: 14px/20px, weight 400 (monospace for prompts/responses)

## Layout System

### Spacing Primitives
Use Tailwind units: **2, 3, 4, 6, 8, 12, 16** for consistent rhythm
- Micro spacing: 2, 3 (inline elements, tight groups)
- Component padding: 4, 6 (buttons, inputs)
- Section spacing: 8, 12 (between components)
- Layout gaps: 16 (major sections)

### Grid Structure
- **Container**: max-w-7xl (1280px) centered
- **Sidebar**: Fixed 280px (template/history navigation)
- **Main Content**: flex-1 with max-w-4xl for optimal prompt editing
- **Response Panel**: Full width or split view (60/40) for prompt + response

### Responsive Breakpoints
- Mobile: Stack sidebar below main content, full-width cards
- Tablet (768px+): Side-by-side where appropriate
- Desktop (1024px+): Full three-column layout when applicable

## Component Library

### Navigation
- **Top Bar**: 64px height, sticky position
  - Logo/brand left (with "Promptizer" text)
  - API status indicator center-right (connected/disconnected)
  - Theme toggle, user settings right
  - Background: surface elevated with subtle bottom border

### Template Library (Left Sidebar)
- **Card Style**: Compact list items with icons
- Categories: "Geração de Código", "Otimização", "Debug", "Documentação", "Análise"
- States: Default, hover (background lift), selected (primary border-left 3px)
- Search filter at top with real-time filtering

### Prompt Editor (Main Area)
- **Textarea**: Full-width, auto-expanding (min 200px height)
- Background: surface elevated
- Border: 2px solid, border-interactive on focus, primary on active
- Padding: p-6
- Font: Code/monospace
- Character counter bottom-right
- Real-time suggestions dropdown below cursor position

### Validation Panel
- **Alert Cards**: Positioned above or inline with editor
- Success: green left border, success icon
- Warning: amber left border, warning icon  
- Error: red left border, error icon
- Dismissible with × button

### History Panel (Right Sidebar or Bottom)
- **Timeline Style**: Reverse chronological cards
- Each card shows: timestamp, prompt preview (truncated), quick actions (reuse, edit, delete)
- Hover: subtle background lift
- Click: loads prompt into editor

### Response Display
- **Code Block Style**: Dark elevated surface with syntax highlighting
- Copy button top-right
- Language indicator if code detected
- Scrollable for long responses
- Loading state: skeleton with pulse animation

### Buttons
- **Primary**: bg-primary, text-white, px-6 py-3, rounded-lg, font-medium
- **Secondary**: bg-transparent, border-2 border-primary, text-primary
- **Text**: text-primary, no background, underline on hover
- **Icon Buttons**: 40×40px, rounded-full, surface interactive on hover

### Form Inputs
- **Height**: 48px for consistency
- **Background**: Surface elevated, border-interactive
- **Focus State**: primary border, no outline
- **Label**: Caption size, text-secondary, mb-2

### Modal/Dialog
- **Backdrop**: backdrop-blur-sm, bg-black/50
- **Container**: max-w-2xl, rounded-2xl, surface elevated
- **Header**: 64px with title and close button
- **Content**: p-8
- **Footer**: Border-top, p-6, actions right-aligned

## Icons
Use **Heroicons** (outline style) via CDN for consistency with modern productivity tools

## Animations
**None** - Instant state transitions for maximum productivity and accessibility

## Images
**No hero images needed** - This is a utility-focused application where screen real estate is precious. The interface itself is the hero, showcasing functionality immediately.

### Optional Illustrations
- Empty states: Simple line illustrations for "No templates" or "No history"
- Onboarding: Optional 3-step visual guide (dismissible)
- Style: Minimal, monochromatic line art matching brand purple

## Page Layout Structure

### Main View (Primary Screen)
1. **Top Navigation Bar**: Logo, API status, settings
2. **Three-Column Layout**:
   - Left (280px): Template browser with categories
   - Center (flex-1): Prompt editor + validation alerts
   - Right (320px): History timeline OR CodeStral response (toggle)
3. **Bottom Action Bar**: "Enviar para CodeStral" (primary button), "Limpar" (secondary)

### Mobile Layout
- Top bar with hamburger menu
- Template browser as bottom sheet/drawer
- Full-width editor
- History as separate tab/view
- Floating action button for "Enviar"

## Accessibility
- Dark mode as default with light mode toggle
- All form inputs maintain consistent dark styling
- Keyboard navigation: Tab order follows logical flow (templates → editor → actions)
- ARIA labels in Portuguese for screen readers
- Focus indicators: 2px primary color outline with 2px offset
- Minimum contrast ratio 4.5:1 for all text

## Portuguese Localization Details
- Button labels: "Enviar", "Limpar", "Salvar", "Editar", "Reutilizar"
- Validation messages: "Prompt muito curto", "Adicione mais contexto", "Prompt salvo com sucesso"
- Placeholder text: "Descreva sua solicitação aqui..."
- Empty states: "Nenhum prompt no histórico", "Selecione um template para começar"