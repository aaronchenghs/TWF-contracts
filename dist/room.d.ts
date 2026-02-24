export declare type RoomCode = string;
export declare type ClientId = string;
export declare type Role = "host" | "player";
export declare type RoomJoinPayload = {
    code: RoomCode;
    role: Role;
    name?: string;
    clientId: ClientId;
};
export declare type Avatar = `${string}.${string}.${string}`;
export declare type AvatarPartIndex = number;
export declare type AvatarParts = {
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
export declare type VoteValue = -1 | 0 | 1;
export declare type GamePhase = "LOBBY" | "STARTING" | "PLACE" | "VOTE" | "RESULTS" | "RESOLVE" | "FINISHED";
export declare type PlayerId = Player["id"];
export declare type JoinRoomResult = {
    resumed: boolean;
    canonicalName?: string;
};
export declare type TurnResolution = {
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
export declare type VoteMap = Record<PlayerId, VoteValue>;
export declare type VoteConfirmations = Record<PlayerId, boolean>;
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
export declare type TierSetId = string;
export declare type TierId = string;
export declare type TierItemId = string;
export declare type Tier = {
    id: TierId;
    name: string;
    color: string;
};
export declare type TierItem = {
    id: TierItemId;
    name: string;
    imageSrc: string;
};
export declare type TierSetSummary = {
    id: TierSetId;
    title: string;
    description?: string;
    coverImageSrc?: string;
};
export declare type TierSetDefinition = {
    id: TierSetId;
    title: string;
    description?: string;
    tiers: Tier[];
    items: TierItem[];
};
