# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# DigitalLab - AI Observation Protocol

## Project Overview

DigitalLab is an experimental AI research facility interface built with Next.js 14. It visualizes AI model behavior through four distinct observation "rooms", each designed to test and display different cognitive aspects of AI systems. The interface uses a laboratory aesthetic with a custom Tailwind theme.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom lab theme
- **Package Manager:** pnpm

## Commands

```bash
pnpm dev      # Start development server on localhost:3000
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

Note: Both npm and pnpm are present in the project, but pnpm is the preferred package manager.

## Architecture

### Four-Room Structure

The application features a dashboard with 4 experimental rooms displayed in a 2x2 grid:

1. **Behavioral Conflict Zone** (Room 1, top-left) - `components/BehavioralConflictZonePage/`
2. **Pattern Prediction Room** (Room 2, top-right) - `components/PatternPredictionRoomPage/`
3. **Reaction Time Chamber** (Room 3, bottom-left) - `components/ReactionTimeChamberPage/`
4. **Attention Response Lab** (Room 4, bottom-right) - `components/AttentionResponseLabPage/`

Users can navigate between rooms using keyboard shortcuts [1-4] or by clicking on a room.

### Room Component Pattern

Each room follows a consistent component structure:

```
components/[RoomName]Page/
├── [RoomName].tsx               # Main container component
├── ModelActivityIndicator.tsx   # Displays AI model activity state
├── PerformanceIndicator.tsx     # Shows performance metrics
├── [RoomName]Visual.tsx         # Renders experiment visualization
└── [RoomName]Log.tsx or TextLog.tsx  # Displays experiment logs
```

**Key architectural patterns:**
- All room containers accept `isFocused` and `onFocus` props for focus state management
- Interactive child components call `e.stopPropagation()` to prevent triggering parent focus
- Rooms use a ring/shadow effect when focused via `isFocused` prop

### Shared Components

- `SystemMetricsPanel.tsx` - Displays system-wide metrics across all rooms
- `CrossRoomInfluenceIndicator.tsx` - Shows cross-room influence effects

### Hooks Organization

Hooks are organized by domain in the `hooks/` directory:

- **Room-specific hooks**: `useAttentionResponse.ts`, `useReactionTime.ts`, `usePatternPrediction.ts`, `useBehavioralConflict.ts`
- **Room-specific log hooks**: `useTextLog.ts`, `useReactionTimeLog.ts`, `usePatternPredictionLog.ts`, `useBehavioralConflictLog.ts`
- **Shared hooks**:
  - `useRoomFocus.ts` - Manages focused room state and auto-scrolling
  - `useKeyboardShortcuts.ts` - Handles [1-4] keyboard navigation
  - `useModelActivity.ts` - Calculates model activity levels
  - `useSystemMetrics.ts` - Tracks system-wide metrics
  - `useCrossRoomInfluence.ts` - Calculates cross-room influence

### Lib Functions

Pure functions are organized by domain in `lib/` directory:
- Each domain has its own folder (e.g., `lib/attentionResponse/`, `lib/reactionTime/`)
- Functions are small, single-purpose utilities
- Common categories: calculators, generators, filters

### Types

TypeScript types are organized in `types/` directory:
- `roomFocus.ts` - Defines `RoomId` type as union: `'attention' | 'reaction' | 'pattern' | 'conflict'`
- Each room has its own type file with domain-specific types

## Styling Conventions

### Custom Tailwind Theme

Custom theme colors are prefixed with `lab-` (defined in `tailwind.config.ts`):

```
lab-bg: #f5f5f5       - Main background
lab-surface: #e5e5e5  - Surface backgrounds (room containers)
lab-border: #fa500b   - Border color (orange)
lab-text: #000000     - Text color
lab-accent: #fa500b   - Primary accent color (orange)
lab-warning: #fa500b  - Warning color
```

### Style Patterns

- Use `font-mono` for all text (Courier New monospace font)
- Text opacity variants: `/70`, `/50` for secondary/tertiary text
- Transition effects on interactive elements: `transition-all duration-300`
- Focus state: `ring-2 ring-lab-accent ring-offset-2`
- Custom utilities defined in `globals.css`:
  - `.lab-border` - Standard border style
  - `.lab-glow` - Glow effect with orange shadow
  - `.lab-pulse` - Pulsing animation
- Custom scrollbar styling using lab accent colors

### Safelist Colors

Colors in `tailwind.config.ts` safelist are used for dynamic log entry coloring:
- Cyan (400) - Info messages
- Orange (500) - Warnings/Missed events
- Green (400) - Success/Detection events
- Blue (400, 500) - Model activity
- Purple (400, 500) - Predictions

## Code Conventions

### Client Components

- All interactive components use `'use client'` directive (Next.js 14 App Router requirement)
- Server components: Only `app/layout.tsx` is a server component

### Props Interfaces

- Define props interfaces above component exports
- Use descriptive names ending in `Props` (e.g., `AttentionResponseLabProps`)

### Event Handling

- Interactive children of clickable parents must call `e.stopPropagation()` to prevent parent focus triggers
- Example pattern seen in room components:
  ```tsx
  <div onClick={onFocus}>
    <div onClick={(e) => e.stopPropagation()}>
      {/* Interactive content */}
    </div>
  </div>
  ```

### Keyboard Navigation

- Keys [1-4] map to rooms: 1=conflict, 2=pattern, 3=reaction, 4=attention
- Keyboard handlers ignore keypresses when user is in input fields

## Environment Variables

Create a `.env` file with:

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=xxxxxx
NEXT_PUBLIC_DEX_LINK=https://dexscreener.com
```

These are displayed in the header (contract address with copy functionality, DEX link in social icons).

## Development Notes

### Room Focus System

The `useRoomFocus` hook manages which room is currently focused:
- Accepts a default room ID on initialization
- Scrolls to the focused room automatically using `scrollToRoom` utility
- Prevents scroll on initial mount, only scrolls on user interaction

### Log Systems

Each room has its own log system:
- Logs are timestamped with scientific notation format
- Color-coded by message type
- Auto-scroll to latest entries
- Maintain configurable max entries (typically 50)
- Use `isFocused` prop to control log update behavior

### Visual Experiment Modules

Each room's visual component:
- Runs autonomous simulations/animations
- Updates in real-time (typically 2-5 second intervals)
- Synchronized with log entries
- Uses canvas or SVG for visualizations

## Project Structure

```
├── app/
│   ├── globals.css           # Global styles and custom utilities
│   ├── layout.tsx            # Root layout (server component)
│   └── page.tsx              # Main dashboard with 4 rooms (client component)
├── components/
│   ├── AttentionResponseLabPage/
│   ├── BehavioralConflictZonePage/
│   ├── PatternPredictionRoomPage/
│   ├── ReactionTimeChamberPage/
│   ├── SystemMetricsPanel.tsx
│   └── CrossRoomInfluenceIndicator.tsx
├── hooks/                    # Custom React hooks
├── lib/                      # Pure utility functions (by domain)
├── types/                    # TypeScript type definitions
└── public/
    └── LOGO_transparent.png  # DigitalLab logo
```
