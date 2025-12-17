# TWF Contracts

This repository defines the **authoritative public contract** between the TWF frontend and backend services.

It contains **TypeScript types only**. No runtime code. No service logic.

---

## Purpose

- Single source of truth for:
  - Socket.IO event names
  - Event payload shapes
  - Public room and player state
- Enforces compile-time correctness across services
- Prevents protocol drift
- Enables independent deployment of frontend and backend

---

## What lives here

- Public domain models (`Room`, `Player`, `RoomPublicState`)
- Socket event contracts:
  - `ClientToServerEvents`
  - `ServerToClientEvents`

What does **not** live here:

- Server-only state
- Database models
- Business logic
- UI-specific types

---

## Repo structure
