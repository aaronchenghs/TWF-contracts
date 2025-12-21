export declare type RoomCode = string;
export declare type Role = "host" | "player";
export interface Player {
    id: string;
    name: string;
    joinedAt: number;
}
export declare type GamePhase = "LOBBY" | "DISCUSS" | "VOTE" | "RESULTS";
export interface RoomPublicState {
    code: RoomCode;
    phase: GamePhase;
    players: Player[];
    currentTurnPlayerId: string | null;
    tiers: Record<TierId, TierItemId[]>;
    currentItem: TierItemId | null;
    timers: {
        discussEndsAt: number | null;
        voteEndsAt: number | null;
    };
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
