export declare type RoomCode = string;
export declare type Role = "host" | "player";
export interface Player {
    id: string;
    name: string;
    joinedAt: number;
}
export declare type VoteValue = -1 | 0 | 1;
export declare type GamePhase = "LOBBY" | "STARTING" | "REVEAL" | "PLACE" | "VOTE" | "RESOLVE" | "FINISHED";
export declare type PlayerId = Player["id"];
export interface RoomTimers {
    buildEndsAt: number | null;
    revealEndsAt: number | null;
    placeEndsAt: number | null;
    voteEndsAt: number | null;
}
export declare type VoteMap = Record<PlayerId, VoteValue>;
export interface RoomPublicState {
    code: RoomCode;
    phase: GamePhase;
    players: Player[];
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
    tiers: Record<TierId, TierItemId[]>;
    /**
     * Item currently being revealed/placed/voted/resolved.
     */
    currentItem: TierItemId | null;
    /**
     * Votes from non-turn players for the currentItem.
     * Convention:
     *  -1 = drift up
     *   0 = agree
     *   1 = drift down
     */
    votes: VoteMap;
    timers: RoomTimers;
    tierSetId: TierSetId | null;
}
export declare type TierSetId = string;
export declare type TierId = string;
export declare type TierItemId = string;
export declare type Tier = {
    id: TierId;
    name: string;
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
