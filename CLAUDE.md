# Karnaryen Next.js Portfolio

## Goal

Rebuild Natalia Karaseva's portfolio (legacy site at `../natkdev/natkdev.com`)
as a modern, high-quality, AI-friendly Next.js portfolio. Performance, modern
frontend best practices, and a clean design system are priorities.

## Decided so far

- Next.js 16 + TypeScript + Tailwind CSS v4
- shadcn/ui (CLI v4, `base-maia` style + Base UI primitives) + lucide-react
- Dark + light mode (via `next-themes`)
- Brand: mint primary on stone neutrals, soft/rounded aesthetic
- pnpm

## Not yet decided — discuss before assuming

- **Pages.** Will likely have more than one; structure TBD.
- **Sections** of the main page — TBD.
- **i18n.** Site needs Dutch + English; library and approach TBD.
- **Three.js / R3F.** Maybe; TBD.
- Anything else not in "Decided so far".

## How to work in this repo

- Don't guess scope. If something isn't in "Decided so far", ask before
  building it.
- Old site is read-only reference at `../natkdev/natkdev.com` — read it
  for content, but re-author components idiomatically here.

## Component layout

`components/` is grouped by feature, mirroring the routes in `app/`:

- `components/ui/` — shadcn/ui primitives (owned by the CLI, don't hand-edit).
- `components/shared/` — used by more than one feature, or by the app shell
  (header, footer, theme, locale switcher, reveal grid, tech stack…).
- `components/<feature>/` — `home`, `blog`, `projects`, `experience`,
  `education`, `contacts`. Sub-features nest further (e.g.
  `projects/tic-tac-toe/`, `blog/mdx/`).

A component used by a second feature moves to `shared/`, unless it clearly
belongs to one feature's domain and the other is just consuming it (e.g.
`home/latest-posts` renders `blog/post-card`).
