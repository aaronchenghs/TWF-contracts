import type { RoomCode, Role, RoomPublicState } from "./room";

export type RoomJoinPayload =
  | { code: RoomCode; role: "host" }
  | { code: RoomCode; role: "player"; name: string };

export interface ClientToServerEvents {
  "room:create": (payload: { role: Role }) => void;
  "room:join": (payload: RoomJoinPayload) => void;
  "room:start": (payload: { code: RoomCode }) => void;
}

export interface ServerToClientEvents {
  "room:created": (payload: { code: RoomCode }) => void;
  "room:state": (state: RoomPublicState) => void;
  "room:error": (message: string) => void;
}
