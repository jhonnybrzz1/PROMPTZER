# PROMPTZER Design System (Master)

## 1. Vision
**PROMPTZER** is a professional AI Prompt Engineering tool. The design must convey **precision, intelligence, and modern efficiency**. It uses a **Modern Dark (Cinema Mobile)** aesthetic with **Glassmorphism** and **Bento Grid** layouts.

## 2. Core Palette (Modern Dark & Vibrant)
- **Primary:** `#7C3AED` (Deep Violet) - Core actions, branding.
- **Secondary:** `#8B5CF6` (Lavender) - Sub-actions, highlights.
- **Accent:** `#0891B2` (Tool Cyan) - Engineering status, data, positive validation.
- **Background:** `#0C0C0E` (Deep Space) - Primary background.
- **Surface/Card:** `#16161A` (Dark Matter) - Card backgrounds with subtle border.
- **Foreground:** `#F8FAFC` (Ghost White) - Main text.
- **Muted:** `#94A3B8` (Slate) - Secondary text, descriptions.
- **Border:** `rgba(255, 255, 255, 0.08)` - Hairline separators.
- **Destructive:** `#F43F5E` (Rose) - Errors, critical warnings.
- **Success:** `#10B981` (Emerald) - Ready for use, validated.

## 3. Typography
- **Font Family:** `Plus Jakarta Sans`, sans-serif.
- **Scale:**
  - **Heading 1:** 2.5rem, Bold, Tracking -0.02em.
  - **Heading 2:** 1.5rem, Semibold, Tracking -0.01em.
  - **Body:** 1rem, Regular, Line-height 1.6.
  - **Mono (Data/Prompt):** `JetBrains Mono` or system-mono for hashes and code blocks.

## 4. Components & Layout (Bento-Glass Style)
- **Layout:** Bento Grid (Modular cards with consistent gaps: `20px`).
- **Cards:**
  - `border-radius: 24px`.
  - `background: rgba(22, 22, 26, 0.6)`.
  - `backdrop-filter: blur(12px)`.
  - `border: 1px solid rgba(255, 255, 255, 0.08)`.
- **Buttons:**
  - `border-radius: 999px` (Pill shape).
  - Hover: `scale(1.02)`, transition `200ms ease-out`.
  - Primary: Gradient `#7C3AED` to `#8B5CF6` with glow shadow.

## 5. Micro-interactions & Animations
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (Expo-out).
- **Duration:** `200ms` for hover, `300ms` for page transitions.
- **States:**
  - Hover: Subtle scale + border highlight.
  - Active: `scale(0.98)`.
  - Loading: Shimmer/Skeleton for cards.

## 6. UX Guidelines
- **Accessibility:** Minimum contrast 4.5:1. Never use color alone for status.
- **Touch:** Min target size `44x44px`.
- **Feedback:** Haptic-like visual feedback on clicks.
- **Structure:** Content-first, eliminate clutter.
