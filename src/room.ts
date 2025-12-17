export type RoomCode = string;

export type Role = "display" | "controller" | "spectator";

export interface Player {
  id: string;
  name: string;
  joinedAt: number;
}

export type GamePhase = "LOBBY" | "DISCUSS" | "VOTE" | "RESULTS";

export interface RoomPublicState {
  code: RoomCode;
  phase: GamePhase;
  players: Player[];
  currentTurnPlayerId: string | null;
}
