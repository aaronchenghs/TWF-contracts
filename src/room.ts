export type RoomCode = string;
export type ClientId = string;

export type Role = "host" | "player";

export type RoomJoinPayload = {
  code: RoomCode;
  role: Role;
  name?: string;
  clientId: ClientId;
};

export type Avatar = `${string}.${string}.${string}`;

export type AvatarPartIndex = number;

export type AvatarParts = {
  body: AvatarPartIndex;
  mouth: AvatarPartIndex;
  eyes: AvatarPartIndex;
};

export interface Player {
  id: string;
  name: string;
  avatar: Avatar;
  joinedAt: number;
  connected?: boolean;
}

/**
 * Voting values represent whether the item should move relative to the placer tier.
 * Negative values bump "up" (toward earlier tiers in tierOrder), positive bump "down".
 */
export type VoteValue = -1 | 0 | 1;

export type GamePhase =
  | "LOBBY"
  | "STARTING"
  | "PLACE"
  | "VOTE"
  | "RESULTS"
  | "RESOLVE"
  | "FINISHED";

export type PlayerId = Player["id"];

export type JoinRoomResult = {
  resumed: boolean;
  canonicalName?: string;
};

export type TurnResolution = {
  counts: {
    up2: number;
    up1: number;
    agree: number;
    down1: number;
    down2: number;
  };
  /** Players who cast a vote (excluding missing/abstain). */
  voters: number;
  /** Eligible voters at resolution time. */
  eligible: number;
  /** Signed score used for drift/within-tier placement. */
  score: number;
  /** Requested drift delta before clamping to tier boundaries. */
  driftDeltaRequested: number;
  /** Applied drift delta after clamping to tier boundaries. */
  driftDeltaApplied: number;
  fromTierId: TierId;
  toTierId: TierId;
  /** Insert position within toTierId (0..toTierLength). */
  insertIndex: number;
};

export interface RoomTimers {
  buildEndsAt: number | null;
  placeEndsAt: number | null;
  voteEndsAt: number | null;
  resultsEndsAt: number | null;
}

export type VoteMap = Record<PlayerId, VoteValue>;
export type VoteConfirmations = Record<PlayerId, boolean>;

export interface RoomPublicState {
  code: RoomCode;
  phase: GamePhase;
  players: Player[];
  timers: RoomTimers;

  tierSetId: TierSetId | null;
  /** Keeps track of items placed in tiers */
  tiers: Record<TierId, TierItemId[]>;
  tierOrder: TierId[];
  /** Communicates actual info about the tiers themselves */
  tierMetaById?: Record<TierId, Tier>;
  /** Communicates actual info about the items themselves */
  itemMetaById?: Record<TierItemId, TierItem>;

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
   *  -1 = bump up one tier
   *   0 = agree/no bump
   *   1 = bump down one tier
   */
  votes: VoteMap;
  /**
   * Explicit "lock-in" confirmations for the current vote window.
   * Confirmed votes can no longer be changed and the vote ends early if all eligible voters confirm.
   */
  voteConfirmedByPlayerId: VoteConfirmations;
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
  itemCount: number;
  firstItemName?: string;
  firstItemImageSrc?: string;
};

export type TierSetDefinition = {
  id: TierSetId;
  title: string;
  description?: string;
  tiers: Tier[];
  items: TierItem[];
};
