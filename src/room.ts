export type RoomCode = string;

export type Role = "host" | "player";

export interface Player {
  id: string;
  name: string;
  joinedAt: number;
}

export type GamePhase = "LOBBY" | "DISCUSS" | "VOTE" | "RESULTS";

export type TierId = "S" | "A" | "B" | "C" | "D";
export interface RoomPublicState {
  code: RoomCode;
  phase: GamePhase;
  players: Player[];
  currentTurnPlayerId: string | null;
  tiers: Record<TierId, string[]>;
  currentItem: string | null;
  timers: { discussEndsAt: number | null; voteEndsAt: number | null };
}
