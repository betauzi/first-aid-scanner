# First Aid Scanner — Interface Design Plan

## Brand & Color Palette

| Token | Light Value | Purpose |
|-------|-------------|---------|
| `primary` | `#1A8FE3` | CTA buttons, active states, icons |
| `background` | `#F0F8FF` | Screen background (Alice Blue) |
| `surface` | `#FFFFFF` | Cards, modals |
| `foreground` | `#1A2B3C` | Primary text |
| `muted` | `#6B8499` | Secondary text, placeholders |
| `border` | `#D0E8F5` | Card borders, dividers |
| `success` | `#2ECC71` | Low severity badge |
| `warning` | `#F39C12` | Medium severity badge |
| `error` | `#E74C3C` | High severity badge |

## Screen List

1. **Home Screen** — Entry point with scan CTA, navigation to History and Guide
2. **Camera Screen** — Full-screen camera preview with frame guide and capture controls
3. **Result Screen** — Wound analysis card with severity and treatment summary
4. **Steps Screen** — Numbered step-by-step treatment instructions

## Primary Content & Functionality

### Home Screen
- App logo + title at top center
- Large "Scan Wound" primary button (full width, rounded, with camera icon)
- Two secondary buttons side by side: "History" and "First Aid Guide"
- Warning disclaimer text at bottom

### Camera Screen
- Full-screen camera preview (no header)
- Semi-transparent overlay with centered square guide frame (animated dashed border)
- Instruction label above frame: "Position wound in frame"
- Bottom control bar: switch camera (left), capture button (center, large), gallery (right)
- Back button top-left

### Result Screen
- Back navigation header
- Result card with:
  - Wound type label + icon
  - Severity badge (color-coded: green/orange/red)
  - Confidence percentage
  - Treatment summary paragraph
- Two action buttons: "View Steps" and "Find Nearby Hospital"
- Disclaimer text at bottom

### Steps Screen
- Back navigation header with wound type subtitle
- Numbered step list (cards), each with:
  - Step number circle (primary color)
  - Step title (bold)
  - Step description
  - Icon representing the action
- "Done" button at bottom

## Key User Flows

**Primary flow:** Home → Camera (tap Scan Wound) → Result (after capture) → Steps (tap View Steps)

**Secondary flows:**
- Home → History (past scans list)
- Home → First Aid Guide (static guide)
- Result → Find Nearby Hospital (opens maps)

## Typography

- Headers: 28px bold, `foreground`
- Body: 16px regular, `foreground`
- Captions/muted: 13px, `muted`
- Button labels: 16px semibold

## Component Patterns

- Large primary buttons: `h-16 rounded-2xl bg-primary`
- Secondary buttons: `h-14 rounded-xl border border-primary`
- Cards: `rounded-2xl bg-surface shadow-sm border border-border p-5`
- Severity badges: `rounded-full px-3 py-1 text-white text-xs font-bold`
