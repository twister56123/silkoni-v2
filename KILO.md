# Silkoni - Code Agent Instructions (Kilo Code / Qwen3)

## 🎯 PROJECT CONTEXT

**Project:** Silkoni - Single-page silk pillowcase & hair turban e-commerce  
**Language:** Ukrainian (website content)  
**Developer Level:** Junior/Intermediate  
**Goal:** PageSpeed 100/100, Maximum SEO optimization

---

## 🚨 CRITICAL: SAFETY RULES

### ❌ NEVER DO WITHOUT EXPLICIT PERMISSION:

1. **DO NOT install npm packages** - Always ask first
2. **DO NOT delete files** - Ask before any deletion
3. **DO NOT modify package.json** - User approval required
4. **DO NOT change config files** without permission:
   - `astro.config.mjs`
   - `tsconfig.json`
5. **DO NOT add environment variables** - Ask first
6. **DO NOT change project structure** - Keep folders as defined

### ✅ YOU CAN DO FREELY:

1. Create new files in approved locations:
   - `src/components/`
   - `src/layouts/`
   - `src/content/products/`
   - `src/pages/`
2. Edit existing non-config files
3. Add content to markdown files
4. Fix TypeScript errors
5. Add Tailwind classes

### ⚠️ ASK BEFORE:

1. Creating new folders
2. Installing any dependency
3. Modifying routing
4. Adding external APIs

---

## 🛠 TECHNOLOGY STACK

### Core:

```
Astro 5 (static site generation)
Alpine.js 3 (lightweight interactivity)
Tailwind CSS 4 (styling)
TypeScript (strict mode)
pnpm (package manager)
```

### Hosting:

```
Cloudflare Pages (auto-deploy from GitHub)
Live URL: https://silkoni-v2.pages.dev
```

### File Locations:

```
Working directory: /Users/andrejbozhko/repos/silkoni-v2
Import alias: @/ → src/
```

---

## 📁 PROJECT STRUCTURE

```
silkoni-v2/
├── KILO.md                  # ← You are here
├── src/
│   ├── assets/
│   │   └── products/        # Product images (8 files)
│   ├── components/          # Astro components
│   │   └── *.astro
│   ├── layouts/
│   │   └── Layout.astro     # Base layout with Alpine.js init
│   ├── content/
│   │   └── products/        # Product markdown files
│   │       ├── pillowcase.md
│   │       └── turban.md
│   ├── lib/
│   │   └── utils.ts         # cn() helper
│   ├── pages/
│   │   └── index.astro      # Main landing page
│   ├── styles/
│   │   └── global.css       # Tailwind imports
│   ├── types/
│   │   └── global.d.ts      # TypeScript declarations
│   └── content.config.ts    # Content Collections schema
├── public/
│   └── logo.svg
└── package.json
```

---

## 💅 CODE STYLE GUIDE

### Astro Components - Standard structure:

```astro
---
// 1. Interface first
interface Props {
  title: string;
  class?: string;
}

// 2. Props destructuring
const { title, class: className } = Astro.props;

// 3. Imports
import { cn } from '@/lib/utils';
---

<!-- 4. HTML with Tailwind -->
<div class={cn("base-classes", className)}>
  <h1>{title}</h1>
</div>
```

### Alpine.js - Inline directives:

```html
<!-- ✅ CORRECT - Alpine.js for interactivity -->
<div x-data="{ open: false }">
  <button x-on:click="open = !open">Toggle</button>
  <div x-show="open" x-transition>Content</div>
</div>

<!-- ❌ WRONG - Don't use React -->
<button onClick="{handleClick}">Toggle</button>
```

### Alpine.js Common Patterns:

```html
<!-- Counter -->
<div x-data="{ count: 0 }">
  <button x-on:click="count++">Clicked: <span x-text="count"></span></button>
</div>

<!-- Toggle visibility -->
<div x-data="{ show: false }">
  <button x-on:click="show = !show">Toggle</button>
  <p x-show="show" x-transition>Hidden content</p>
</div>

<!-- Form input binding -->
<div x-data="{ name: '' }">
  <input x-model="name" type="text" />
  <p>Hello, <span x-text="name"></span></p>
</div>

<!-- Fetch data -->
<div
  x-data="{ items: [] }"
  x-init="items = await (await fetch('/api/items')).json()">
  <template x-for="item in items">
    <div x-text="item.name"></div>
  </template>
</div>
```

### Imports - Use @/ alias:

```typescript
// ✅ CORRECT
import Layout from "@/layouts/Layout.astro";
import { cn } from "@/lib/utils";

// ❌ WRONG
import Layout from "../../layouts/Layout.astro";
```

### Tailwind CSS - Mobile-first:

```html
<!-- ✅ CORRECT - base styles for mobile, then larger screens -->
<div class="px-4 py-8 md:px-8 md:py-12 lg:px-16">
  <!-- ❌ WRONG - desktop-first -->
  <div class="px-16 md:px-8 sm:px-4"></div>
</div>
```

### cn() helper for conditional classes:

```typescript
import { cn } from '@/lib/utils';

// ✅ CORRECT
<div class={cn(
  "base-classes",
  isActive && "active-classes",
  className
)} />

// ❌ WRONG
<div class={`base-classes ${isActive ? 'active-classes' : ''}`} />
```

---

## 🖼️ IMAGE OPTIMIZATION

**ALWAYS use Astro Image component:**

```astro
---
import { Image } from 'astro:assets';
import productImage from '@/assets/products/pillowcase-pink.jpg';
---

<!-- ✅ CORRECT -->
<Image
  src={productImage}
  alt="Опис українською"
  widths={[375, 640, 768, 1024]}
  loading="lazy"
  class="w-full h-auto"
/>

<!-- ❌ WRONG -->
<img src="/pillowcase.jpg" alt="Product" />
```

---

## 📦 CONTENT COLLECTIONS

**Schema location:** `src/content.config.ts`

```typescript
// Product schema
z.object({
  name: z.string(),
  price: z.number(),
  currency: z.enum(["UAH"]).default("UAH"),
  images: z.array(z.string()).min(1),
  colors: z.array(z.string()),
  description: z.string(),
  metaDescription: z.string().max(160),
  order: z.number().default(0),
  active: z.boolean().default(true),
});
```

**Usage:**

```astro
---
import { getCollection } from 'astro:content';

const products = await getCollection('products');
products.sort((a, b) => a.data.order - b.data.order);
---
```

---

## 🎨 DESIGN SYSTEM

### Colors (Neutral palette):

```
Primary:    black (#000000)
Background: white (#ffffff)
Muted:      gray-500 (#737373)
Border:     gray-200 (#e5e5e5)
```

### Typography:

```
Font: system-ui (no external fonts for performance)
Headings: font-bold
Body: font-normal
```

### Spacing:

```
Section padding: py-16 (mobile), py-24 (desktop)
Container: max-w-7xl mx-auto px-4
Card padding: p-6
Gap: gap-4 (small), gap-8 (large)
```

### Buttons:

```html
<!-- Primary button -->
<button
  class="bg-black text-white px-6 py-3 rounded-md hover:bg-black/90 transition-colors">
  Купити
</button>

<!-- Secondary button -->
<button
  class="border border-black text-black px-6 py-3 rounded-md hover:bg-gray-100 transition-colors">
  Детальніше
</button>
```

---

## 📝 RESPONSE FORMAT

### When creating files:

```
📁 Creating: src/components/Header.astro

[code block]

✅ File created
⚠️ Note: Import in Layout.astro if needed
```

### When asking for confirmation:

```
⚠️ CONFIRMATION REQUIRED

I need to install: [package-name]
Reason: [why needed]
Alternative: [lighter option if exists]

Proceed? [yes/no]
```

---

## 🎯 PERFORMANCE TARGETS

**Must maintain:**

- PageSpeed Performance: 100/100
- Accessibility: 100/100
- Best Practices: 100/100
- LCP: < 1.5s
- CLS: 0
- TBT: 0ms

**How:**

- No external fonts
- Lazy load images below fold
- Minimal JavaScript (Alpine.js only)
- No heavy libraries

---

## ❓ WHEN UNSURE

**Ask instead of guessing!**

Examples:

- "Should this be an Astro component or inline HTML?"
- "Do you want x-transition on this element?"
- "Which image widths should I generate?"

---

## ✅ CHECKLIST BEFORE CREATING CODE

1. [ ] Do I have permission for this action?
2. [ ] Am I using Astro components (not React)?
3. [ ] Am I using Alpine.js for interactivity (not React)?
4. [ ] Am I using @/ import alias?
5. [ ] Am I following mobile-first Tailwind?
6. [ ] Will this impact performance?
7. [ ] Is alt text in Ukrainian?

---

_Updated: January 2026_
_Stack: Astro 5 + Alpine.js 3 + Tailwind CSS 4_
_Project: Silkoni e-commerce_
