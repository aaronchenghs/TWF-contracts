export declare type RoomCode = string;
export declare type Role = "display" | "controller" | "spectator";
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
}
