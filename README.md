# Gambarno — Creative AI Imagery for Ambitious Teams

> Your studio-grade control center for generating, curating, and shipping on-brand visuals with uncompromising polish.

---

## At a Glance
- **Creative certainty** with reusable prompt recipes, brand-safe filters, and approval flows your clients trust.
- **Lightning execution** through realtime previews, bulk generations, and direct-to-campaign exports.
- **Enterprise calm** thanks to role-aware access, predictable billing, and observability from credits to CDN hits.

---

## Why Studios Choose Gambarno
- **Studio Canvas**: Snap-to-grid layout, prompt history, and intelligent refinements keep ideation flowing without tab overload.
- **Brand Vault**: Lock palettes, typography, and references so every render respects the identity playbook.
- **Batch Lab**: Spin up batches, monitor GPU queues, and auto-route finals to shared folders or downstream automations.
- **Insights Dashboard**: Surface the styles that resonate, track spend by client, and forecast upcoming credit needs.

---

## Experience Principles
- **Delightfully focused**: We fade the noise—ambient prompts, keyboard-first navigation, and contextual nudges keep momentum high.
- **Inclusive by default**: WCAG-ready contrast, screen-reader labels, motion-safe modes, and global-ready copy.
- **Offline capable**: Installable PWA shell caches recent projects, prompt templates, and queued jobs for on-the-go reviews.

---

## Platform Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Gambarno Cloud Stack                  │
├──────────────────────────────────────────────────────────┤
│  Astro Frontend  | React islands | Tailwind design system│
│  Service Worker  | Manifest & offline cache              │
│  Edge Gateway    | Auth middleware | rate limiting       │
│  Application API | Node.js + tRPC | event bus            │
│  Model Orchestration | Diffusion runners | queue workers │
│  Media Pipeline  | Object storage | CDN optimization     │
│  Billing Layer   | Stripe + usage metering + webhooks    │
└──────────────────────────────────────────────────────────┘
```

---

## Operational Superpowers
- **Model orchestration**: Resilient workers dispatch prompts to GPU clusters or partner APIs with retry and observability baked in.
- **Media pipeline**: Generated assets stream into S3-compatible storage, get auto-tagged, transcoded, and distributed globally.
- **Billing & entitlements**: Stripe-powered subscriptions, usage credit packs, and role-based access control keep finance aligned with flow.
- **Audit & compliance**: Signed URLs, immutable request logs, and exportable reports satisfy enterprise procurement checklists.

---

## Roadmap Signals
- Launchpad for community-curated style marketplaces.
- Fine-tune console for custom diffusion checkpoints and brand-exclusive models.
- AI prompt coach that suggests sharper creative directions in real time.
- Automated publishing bridges to CMS, DAM, and social schedulers once work is approved.

---

## Quickstart

```bash
npm install
npm run dev    # Start the studio on http://localhost:4321
```

---

**Need Support?** Drop into `#gambarno`, or email `support@gambarno.app`. Our creative crew ships alongside you.

