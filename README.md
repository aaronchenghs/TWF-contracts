# TWF Contracts

Shared contract package for TWF client/server communication and public room state.

Supports:
https://github.com/aaronchenghs/TWF-client
https://github.com/aaronchenghs/TWF-server

This package defines:

- Socket event names and payload types
- Public game/room models
- Shared protocol constants
- Shared validation regex

## Who this is for

Use this repo if you:

- Build TWF backend socket handlers
- Build TWF frontend socket consumers
- Need one source of truth for protocol changes

## Scope and boundaries

This package should contain only cross-service contract concerns.

Include:

- Public state models consumed by both frontend and backend
- Socket event interfaces (`ClientToServerEvents`, `ServerToClientEvents`)
- Cross-service constants (`CODE_LENGTH`, `MAX_NAME_LENGTH`, `LOBBY_CAPACITY`)
- Stable shared regex (`REGEX.GUID`)

Do not include:

- Database schemas
- Server-only internal state
- Business logic/state transitions
- UI component/view types

## Repository structure

```text
src/
  index.ts    # package barrel exports
  room.ts     # room/game/public model types
  socket.ts   # socket event contracts
  codes.ts    # shared numeric/string limits
  regex.ts    # shared regex patterns
dist/         # generated build output (JS + .d.ts)
README.md
package.json
tsconfig.json
```

## Exports

All public API is exported from `src/index.ts`:

```ts
export * from "./room";
export * from "./socket";
export * from "./codes";
export * from "./regex";
```

## Installation and setup

### Requirements

- Node.js 18+ (recommended)
- npm 9+ (recommended)

### Install

```bash
npm install
```

### Build

```bash
npm run build
```

This compiles `src/*` into `dist/*` and emits declaration files.

## Scripts

- `npm run build`: Compile TypeScript to `dist`
- `npm run prepare`: Runs build (used by npm lifecycle)

## How to use this package

### On the backend (Socket.IO server)

```ts
import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@twf/contracts";

const io = new Server<ClientToServerEvents, ServerToClientEvents>();

io.on("connection", (socket) => {
  socket.on("room:join", (payload) => {
    // payload is fully typed (RoomJoinPayload)
  });

  socket.emit("room:closed");
});
```

### On the frontend (Socket.IO client)

```ts
import { io, type Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@twf/contracts";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3000",
);

socket.emit("tierSets:list");
socket.on("room:state", (state) => {
  // state is RoomPublicState
});
```

## Contract reference

### Client -> Server events

- `room:create` `{ role: Role }`
- `room:join` `RoomJoinPayload`
- `room:setTierSet` `{ tierSetId: TierSetId }`
- `room:bootPlayerFromLobby` `{ playerId: PlayerId }`
- `room:start` `{ code: RoomCode }`
- `room:close` `()`
- `tierSets:list` `()`
- `tierSets:get` `{ id: TierSetId }`
- `game:place` `{ tierId: TierId }`
- `game:vote` `{ vote: VoteValue }`
- `debug:togglePause` `()`
- `debug:next` `()`
- `debug:prev` `()`

### Server -> Client events

- `room:created` `{ code: RoomCode }`
- `room:closed` `()`
- `room:state` `RoomPublicState`
- `room:kicked` `()`
- `room:error` `(message: string)`
- `room:joined` `{ playerId: PlayerId }`
- `tierSets:listed` `{ tierSets: TierSetSummary[] }`
- `tierSets:got` `{ tierSet: TierSetDefinition }`

### Core public models

`room.ts` defines shared primitives and domain models, including:

- Lobby/player identity (`RoomCode`, `ClientId`, `Player`, `Role`)
- Player avatar identity (`Avatar`, `AvatarParts`)
- Game lifecycle (`GamePhase`, `VoteValue`, timers, turn state)
- Public room state (`RoomPublicState`)
- Tier set metadata (`TierSetDefinition`, `TierSetSummary`, `Tier`, `TierItem`)

## Shared runtime constants and regex

From `codes.ts`:

- `CODE_LENGTH = 4`
- `MAX_NAME_LENGTH = 18`
- `LOBBY_CAPACITY = 8`
- `AVATAR_BASE = 36`
- `AVATAR_PARTS_COUNT = 3`

From `regex.ts`:

- `REGEX.GUID`: UUID v4 matcher
- `REGEX.AVATAR`: Compact avatar code matcher (`<body>.<mouth>.<eyes>` in base36)

Use these from both client and server to avoid drift.

## Contribution guide

### Contract change workflow

1. Edit source files in `src/` only.
2. Keep naming consistent (`domain:action`, e.g. `room:join`).
3. Ensure payloads are explicit object types (avoid positional args).
4. Maintain backward compatibility where possible.
5. Build locally with `npm run build`.
6. Verify generated `dist/*` updates match your source changes.
7. Update this README when contracts or usage semantics change.

### Breaking-change policy

Treat any of the following as breaking:

- Renaming/removing event names
- Changing payload field names/types
- Removing exported types/constants
- Tightening unions in ways existing consumers cannot satisfy

For breaking changes:

- Coordinate frontend and backend updates together
- Call out migration steps in PR description

### Design rules for new contracts

- Prefer additive changes over mutating existing fields.
- Prefer string literal unions over unbounded strings where values are known.
- Keep server-internal implementation details out of shared types.
- Only add values to `RoomPublicState` that are safe for all clients.
- If a constant is protocol-relevant (limits/validation), define it here.

### PR checklist

- [ ] Source change is in `src/*` (not hand-edited `dist/*`)
- [ ] `npm run build` passes
- [ ] Event names and payloads are symmetric with consumers
- [ ] Backward compatibility considered/documented
- [ ] README updated if contract behavior changed

## Notes for maintainers

- Package is currently marked `"private": true` in `package.json`.
- If you decide to publish externally, remove `private` and establish a release/versioning process first.
