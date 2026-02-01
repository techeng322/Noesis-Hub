# NOESIS - AI Observation Protocol

## Project Overview

NOESIS is an experimental AI research facility interface built with Next.js 14. It visualizes AI model behavior through four distinct observation "rooms", each designed to test and display different cognitive aspects of AI systems.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom lab theme
- **Package Manager:** pnpm

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main dashboard with 4 rooms
├── components/
│   ├── AttentionResponseLabPage/
│   ├── BehavioralConflictZonePage/
│   ├── PatternPredictionRoomPage/
│   ├── ReactionTimeChamberPage/
│   ├── SystemMetricsPanel.tsx
│   └── CrossRoomInfluenceIndicator.tsx
├── hooks/
│   ├── useRoomFocus.ts
│   └── useKeyboardShortcuts.ts
└── public/
    └── LOGO_transparent.png
```

## Room Architecture

Each room follows a consistent component pattern:

| Component | Purpose |
|-----------|---------|
| `[Room].tsx` | Main container component |
| `ModelActivityIndicator.tsx` | Displays AI model activity state |
| `PerformanceIndicator.tsx` | Shows performance metrics |
| `[Room]Visual.tsx` | Renders experiment visualization |
| `[Room]Log.tsx` or `TextLog.tsx` | Displays experiment logs |

## Styling Conventions

- Use Tailwind CSS utility classes
- Custom theme colors prefixed with `lab-`:
  - `lab-surface` - Background surfaces
  - `lab-accent` - Primary accent color
  - `lab-text` - Text colors (with opacity variants like `/70`, `/50`)
- Monospace font (`font-mono`) for technical/data displays
- Transition effects for interactive elements

## Code Conventions

- Use `'use client'` directive for client components
- Props interfaces defined above component exports
- Event propagation stopped on interactive children to prevent parent focus triggers
- Keyboard shortcuts [1-4] for room navigation

## Environment Variables

- `NEXT_PUBLIC_CONTRACT_ADDRESS` - Contract address display
- `NEXT_PUBLIC_DEX_LINK` - DEX link URL

## Commands

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```
