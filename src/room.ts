export type RoomCode = string;

export type Role = "host" | "player";

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
  tiers: Record<TierId, TierItemId[]>;
  currentItem: TierItemId | null;
  timers: { discussEndsAt: number | null; voteEndsAt: number | null };
  tierSetId: TierSetId | null;
}

// #region Tier Set Definitions

export type TierSetId = string;
export type TierId = string;
export type TierItemId = string;

export type Tier = {
  id: TierId;
  name: string;
};

export type TierItem = {
  id: TierItemId;
  name: string;
  imageSrc: string;
};

export type TierSetSummary = {
  id: TierSetId;
  title: string;
  description?: string;
  coverImageSrc?: string;
};

export type TierSetDefinition = {
  id: TierSetId;
  title: string;
  description?: string;
  tiers: Tier[];
  items: TierItem[];
};
