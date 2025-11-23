# FlashFlow Theme Documentation

This document outlines all the custom Tailwind theme tokens and design system used in the FlashFlow app.

## Color Palette

### Primary Colors
```css
/* Blue Gradient (Main brand color) */
from-blue-400 to-blue-500    /* #60A5FA → #3B82F6 */
from-blue-500 to-blue-600    /* #3B82F6 → #2563EB */

/* Cyan (Add Card button) */
from-cyan-400 to-cyan-500    /* #22D3EE → #06B6D4 */
from-cyan-500 to-cyan-600    /* #06B6D4 → #0891B2 */

/* Indigo (Study button) */
from-indigo-500 to-indigo-600    /* #6366F1 → #4F46E5 */
from-indigo-600 to-indigo-700    /* #4F46E5 → #4338CA */

/* Green (Stats & Success) */
from-green-400 to-green-500    /* #4ADE80 → #22C55E */
from-green-500 to-green-600    /* #22C55E → #16A34A */

/* Pink (Accent) */
from-pink-400 to-pink-500    /* #F472B6 → #EC4899 */

/* Purple (Accent) */
from-purple-400 to-purple-500    /* #C084FC → #A855F7 */

/* Yellow (Accent) */
from-yellow-300 to-yellow-400    /* #FDE047 → #FACC15 */

/* Red (Don't Know) */
red-500    /* #EF4444 */
red-600    /* #DC2626 */
```

### Background Colors
```css
/* Main app background gradients */
bg-gradient-to-br from-blue-50 via-white to-yellow-50
bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50
bg-gradient-to-br from-blue-50 via-white to-green-50

/* Decorative blob colors (with opacity) */
bg-blue-200 opacity-20 blur-3xl
bg-yellow-200 opacity-20 blur-3xl
bg-pink-200 opacity-20 blur-3xl
bg-purple-200 opacity-20 blur-3xl
bg-green-200 opacity-20 blur-3xl
```

### Text Colors
```css
/* Primary text */
text-gray-900    /* #111827 */
text-blue-500    /* #3B82F6 */

/* Secondary text */
text-gray-600    /* #4B5563 */
text-gray-700    /* #374151 */

/* Muted text */
text-gray-500    /* #6B7280 */

/* White text on colored backgrounds */
text-white
text-white/90    /* 90% opacity */
```

## Border Radius

### Custom Radius Values
```css
rounded-full     /* 9999px - circles */
rounded-3xl      /* 24px - large cards and buttons */
rounded-2xl      /* 16px - medium cards */
rounded-xl       /* 12px - small cards */
```

## Shadows

### Custom Shadow System
```css
shadow-sm        /* Subtle elevation */
shadow-md        /* Medium elevation */
shadow-lg        /* Large elevation - main cards */
shadow-xl        /* Extra large - hover states */
shadow-2xl       /* Maximum elevation - flashcards */
```

## Spacing & Layout

### Custom Spacing
```css
/* Padding */
p-4, p-5, p-6, p-8    /* 16px, 20px, 24px, 32px */
px-6 py-8             /* Horizontal 24px, Vertical 32px */

/* Gaps */
gap-2, gap-3, gap-4, gap-6    /* 8px, 12px, 16px, 24px */

/* Margins */
mb-1, mb-2, mb-4, mb-6    /* 4px, 8px, 16px, 24px */
```

### Grid Layout
```css
grid grid-cols-2 gap-4    /* 2-column grid for deck cards */
```

## Effects & Animations

### Blur Effects
```css
blur-3xl    /* Large blur for decorative blobs */
backdrop-blur-sm    /* Subtle backdrop blur */
```

### Opacity Values
```css
opacity-20    /* Decorative elements */
opacity-30    /* Decorative circles */
opacity-40    /* Lighter decorative elements */
opacity-50    /* Medium transparency */
opacity-60    /* Higher visibility decorations */
opacity-90    /* Near-opaque text */
```

### Transitions
```css
transition-all
transition-colors
transition-shadow
transition-transform

/* Durations (default is 150ms) */
duration-300    /* Smooth animations */
duration-600    /* Card flip animation */
```

### Transform Effects
```css
hover:scale-[1.02]    /* Subtle grow on hover */
scale-0.9             /* Shrink for animations */
-translate-x-1/2      /* Center positioning */
translate-x-1/3       /* Blob positioning */
rotate-180            /* Flip elements */
```

## Component-Specific Styles

### Deck Cards (Home Screen)
```css
bg-gradient-to-br [from-color] [to-color]
rounded-[2rem]
p-5
shadow-lg
hover:shadow-xl
transition-all
transform hover:scale-[1.02]
min-height: 140px
```

### Action Buttons
```css
w-full
py-5
rounded-3xl
bg-gradient-to-r [from-color] [to-color]
text-white
hover:[from-color-darker] hover:[to-color-darker]
transition-colors
shadow-lg
flex items-center justify-center gap-3
```

### Flashcards
```css
bg-white
rounded-3xl
shadow-2xl
p-8
min-h-[280px]
flex items-center justify-center
```

### Input Fields
```css
w-full
px-5 py-4
rounded-2xl
border-2 border-gray-200
focus:border-blue-400
focus:outline-none
transition-colors
bg-white
shadow-sm
```

### Progress Bars
```css
h-3
bg-gray-200
rounded-full
overflow-hidden

/* Progress fill */
bg-gradient-to-r from-blue-400 to-blue-500
rounded-full
```

### Floating Action Button (FAB)
```css
fixed bottom-8 right-8
bg-blue-500
text-white
rounded-full
p-4
shadow-lg
hover:bg-blue-600
transition-colors
flex items-center gap-2
```

## Decorative Blobs

### Positioning & Styling
```css
/* Top right blob */
absolute top-0 right-0
w-80 h-80
bg-[color]-200
rounded-full
opacity-20
blur-3xl
translate-x-1/3 -translate-y-1/3

/* Bottom left blob */
absolute bottom-0 left-0
w-64 h-64
bg-[color]-200
rounded-full
opacity-20
blur-3xl
-translate-x-1/3 translate-y-1/3
```

## Z-Index Layers

```css
relative z-10    /* Content above decorative blobs */
```

## Hover States

```css
/* Buttons */
hover:bg-[color]-600
hover:shadow-xl
hover:scale-[1.02]

/* Cards */
hover:shadow-2xl
hover:bg-white/50

/* Icons */
hover:bg-gray-100
hover:bg-white/50
```

## Disabled States

```css
disabled:bg-gray-300
disabled:from-gray-300 disabled:to-gray-300
disabled:cursor-not-allowed
disabled:opacity-50
```

## Typography

The app uses default Tailwind typography with custom settings from globals.css:

```css
/* Headings */
h1: text-2xl, font-medium
h2: text-xl, font-medium
h3: text-lg, font-medium

/* Body */
p: text-base, font-normal

/* Labels & Buttons */
font-medium
```

## Usage Examples

### Creating a Deck Card
```tsx
<button className="relative w-full bg-gradient-to-br from-blue-400 to-blue-500 rounded-[2rem] p-5 shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] text-left overflow-hidden">
  {/* Content */}
</button>
```

### Creating an Action Button
```tsx
<button className="w-full py-5 rounded-3xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-white hover:from-cyan-500 hover:to-cyan-600 transition-colors shadow-lg flex items-center justify-center gap-3">
  <Icon className="w-6 h-6" />
  <span>Button Text</span>
</button>
```

### Adding Background with Decorative Blobs
```tsx
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 relative overflow-hidden">
  {/* Decorative blobs */}
  <div className="absolute top-0 right-0 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl translate-x-1/3 -translate-y-1/3" />
  <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-200 rounded-full opacity-20 blur-3xl -translate-x-1/3 translate-y-1/3" />
  
  {/* Content */}
  <div className="relative z-10">
    {/* Your content here */}
  </div>
</div>
```

## Color Scheme Summary

| Element | Color |
|---------|-------|
| Primary Brand | Blue (#3B82F6) |
| Add Card | Cyan (#06B6D4) |
| Study | Indigo (#4F46E5) |
| Stats/Success | Green (#22C55E) |
| Error/Don't Know | Red (#EF4444) |
| Accent 1 | Pink (#EC4899) |
| Accent 2 | Purple (#A855F7) |
| Accent 3 | Yellow (#FACC15) |
| Background | White with gradient overlays |
| Text Primary | Gray-900 (#111827) |
| Text Secondary | Gray-600 (#4B5563) |

---

This theme creates a friendly, playful, and modern aesthetic perfect for a flashcard learning application!
