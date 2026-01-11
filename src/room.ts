export type RoomCode = string;

export type Role = "host" | "player";

export type RoomJoinPayload =
  | { code: RoomCode; role: "host" }
  | { code: RoomCode; role: "player"; name: string };

export interface Player {
  id: string;
  name: string;
  joinedAt: number;
}

export type VoteValue = -1 | 0 | 1;

export type GamePhase =
  | "LOBBY"
  | "STARTING"
  | "REVEAL"
  | "PLACE"
  | "VOTE"
  | "RESULTS"
  | "DRIFT"
  | "RESOLVE"
  | "FINISHED";

export type PlayerId = Player["id"];

export type TurnResolution = {
  up: number;
  down: number;
  agree: number;
  voters: number;
  eligible: number;
  score: number;
  driftDelta: number;
  fromTierId: TierId;
  toTierId: TierId;
};

export interface RoomTimers {
  buildEndsAt: number | null;
  revealEndsAt: number | null;
  placeEndsAt: number | null;
  voteEndsAt: number | null;
  resultsEndsAt: number | null;
  driftEndsAt: number | null;
}

export type VoteMap = Record<PlayerId, VoteValue>;

export interface RoomPublicState {
  code: RoomCode;
  phase: GamePhase;
  players: Player[];
  timers: RoomTimers;

  tierSetId: TierSetId | null;
  /** Keeps track of items placed in tiers */
  tiers: Record<TierId, TierItemId[]>;
  /** Communicates actual info about the tiers themselves */
  tierMetaById?: Record<TierId, Tier>;
  tierOrder: TierId[];

  /**
   * Player IDs in turn order. Empty in LOBBY.
   */
  turnOrderPlayerIds: PlayerId[];
  /**
   * Index into turnOrderPlayerIds. 0 in LOBBY.
   */
  turnIndex: number;
  /**
   * Current player’s turn (must be one of turnOrderPlayerIds when phase != LOBBY/FINISHED).
   */
  currentTurnPlayerId: PlayerId | null;
  /**
   * Item currently being revealed/placed/voted/resolved.
   */
  currentItem: TierItemId | null;
  /**
   * Tier set by the current player whose turn it is, before a vote takes place to drift.
   */
  pendingTierId: TierId | null;
  /**
   * Votes from non-turn players for the currentItem.
   * Convention:
   *  -1 = drift up
   *   0 = agree
   *   1 = drift down
   */
  votes: VoteMap;
  /**
   * Most recent vote resolution
   */
  lastResolution: TurnResolution | null;

  /**
   * Debug options
   */
  debug?: {
    paused?: boolean;
  };
}

// #region Tier Set Definitions

export type TierSetId = string;
export type TierId = string;
export type TierItemId = string;

export type Tier = {
  id: TierId;
  name: string;
  color: string;
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
