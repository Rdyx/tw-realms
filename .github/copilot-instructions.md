# Copilot Instructions – Vue 3 / Nuxt 4 / TypeScript / Tailwind 4.2 / D3

## Context

This project is built with:

- **TypeScript**
- **Vue 3 (Composition API only)**
- **Nuxt 4**
- **Tailwind CSS 4.2**
- **D3.js**

The AI agent (Claude Haiku 4.5) is used sparingly to help generate specific parts of the application — mainly components and isolated logic — **not to scaffold or generate the entire application from scratch**.

The codebase already exists. The agent must adapt to it, not redefine it.

The project is about a wiki-like web application for a game called "Tap Wizard Realms" which exists and is edited by TopCog. The role of the website will be to provide information about the game, such as items, characters, mechanics, etc. The content will be stored in markdown files and rendered using Nuxt Content. It will also include interactive charts built with D3 to visualize game data and some tools to help the players making decisions and maths more easily.

---

# General Principles

1. **Do not scaffold the app**
   - Never generate full project structure.
   - Never rewrite configuration unless explicitly requested.
   - Never assume control over routing, layout, or global architecture.

2. **Respect existing architecture**
   - Follow existing folder structure.
   - Reuse existing composables and utilities when relevant.
   - Do not introduce new architectural patterns unless explicitly requested.

3. **Strict TypeScript**
   - No `any`.
   - No implicit types.
   - Always define explicit interfaces/types.
   - Prefer `type` for unions and `interface` for object contracts.
   - Properly type props, emits, refs, computed values.

4. **Small, focused outputs**
   - Generate only what is requested.
   - Do not include unnecessary explanations unless asked.
   - Avoid verbose comments.

---

# Vue 3 Conventions

## Composition API Only

- Always use `<script setup lang="ts">`
- Never use Options API.
- Prefer composables over inline complex logic.
- Extract reusable logic into composables if relevant.

Example structure:

```vue
<script setup lang="ts">
interface Props {
	data: ChartData[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "select", id: string): void;
}>();

const selectedId = ref<string | null>(null);
</script>

<template>
	<div>
		<!-- Template -->
	</div>
</template>
```

## Props

- Always strictly typed.
- No runtime prop validation unless explicitly requested.
- No default `any`.

## Emits

- Fully typed.
- No untyped `emit`.

---

# Nuxt 4 Rules

- Use auto-imported composables properly (`useFetch`, `useAsyncData`, etc.).
- Do not manually import what Nuxt auto-imports.
- Use server routes only if explicitly requested.
- Do not modify `nuxt.config` unless explicitly asked.
- Prefer `useAsyncData` over manual fetch logic when in pages.

---

# Tailwind CSS 4.2 Guidelines

- Utility-first approach.
- No custom CSS unless necessary.
- Avoid `<style>` blocks unless explicitly required.
- Prefer semantic grouping of classes for readability.
- Use responsive variants properly (`sm:`, `md:`, `lg:`).
- Avoid arbitrary values unless truly necessary.

Example:

```html
<div class="flex items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"></div>
```

---

# D3.js Integration Rules

D3 must:

- Be isolated from Vue reactivity when possible.
- Run inside `onMounted`.
- Clean up on `onBeforeUnmount`.
- Never mutate DOM outside the component root.
- Use `ref<HTMLElement | null>` for mounting targets.

Example pattern:

```ts
const container = ref<HTMLDivElement | null>(null);

onMounted(() => {
	if (!container.value) return;

	const svg = d3.select(container.value).append("svg").attr("width", width).attr("height", height);

	// D3 logic here
});

onBeforeUnmount(() => {
	d3.select(container.value).selectAll("*").remove();
});
```

Avoid mixing heavy reactive watchers with D3 unless required.

---

# Component Guidelines

When generating components:

- Keep them small and focused.
- Prefer presentational components.
- Extract business logic into composables if complex.
- Avoid over-engineering.
- Avoid global state unless explicitly requested.

If generating a chart component:

- Props must define input data shape.
- No hardcoded mock data unless explicitly asked.
- No magic numbers without constants.

---

# Performance & Clean Code

- Avoid unnecessary watchers.
- Prefer `computed` over manual recalculation.
- Debounce expensive operations if needed.
- Avoid deeply nested reactive objects.
- Keep templates clean and readable.

---

# What the Agent MUST NOT Do

- ❌ Rebuild the entire application
- ❌ Replace Tailwind with another styling approach
- ❌ Introduce Pinia/Vuex unless explicitly requested
- ❌ Rewrite routing
- ❌ Add unnecessary dependencies
- ❌ Use `any`
- ❌ Generate unused code

---

# Output Style Expectations

When generating code:

- Output only relevant files.
- No markdown explanation unless requested.
- No “Here is your file” intro text.
- Clean, production-ready code.
- Minimal comments.

If unsure about architecture:

- Ask for clarification instead of guessing.

---

# Default Assumptions

Unless specified otherwise:

- The app uses strict TypeScript.
- ESLint is enabled.
- The project follows standard Nuxt directory conventions.
- Components are stored in `/app/components`.
- Composables are stored in `/app/composables`.

---

# Example Use Cases for the Agent

Acceptable:

- Generate a typed chart component using D3
- Create a reusable button component
- Refactor a component to Composition API
- Create a composable for filtering data
- Improve typing of an existing component

Not acceptable:

- “Build me the entire dashboard app”
- “Generate the full Nuxt project structure”
- “Rewrite the app architecture”

---

End of Copilot instructions.
