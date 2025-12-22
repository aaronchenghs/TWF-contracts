import type { RoomCode, Role, RoomPublicState, TierSetDefinition, TierSetId, TierSetSummary } from "./room";
export declare type RoomJoinPayload = {
    code: RoomCode;
    role: "host";
} | {
    code: RoomCode;
    role: "player";
    name: string;
};
export interface ClientToServerEvents {
    "room:create": (payload: {
        role: Role;
    }) => void;
    "room:join": (payload: RoomJoinPayload) => void;
    "room:start": (payload: {
        code: RoomCode;
    }) => void;
    "room:close": () => void;
    "tierSets:list": () => void;
    "tierSets:get": (payload: {
        id: TierSetId;
    }) => void;
    "room:setTierSet": (payload: {
        tierSetId: TierSetId;
    }) => void;
}
export interface ServerToClientEvents {
    "room:created": (payload: {
        code: RoomCode;
    }) => void;
    "room:closed": () => void;
    "room:state": (state: RoomPublicState) => void;
    "room:error": (message: string) => void;
    "tierSets:listed": (payload: {
        tierSets: TierSetSummary[];
    }) => void;
    "tierSets:got": (payload: {
        tierSet: TierSetDefinition;
    }) => void;
}
