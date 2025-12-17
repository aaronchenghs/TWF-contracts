import type { RoomCode, Role, RoomPublicState } from "./room";
export interface ClientToServerEvents {
    "room:create": (payload: {
        role: Role;
    }) => void;
    "room:join": (payload: {
        code: RoomCode;
        role: Role;
        name?: string;
    }) => void;
    "room:start": (payload: {
        code: RoomCode;
    }) => void;
}
export interface ServerToClientEvents {
    "room:created": (payload: {
        code: RoomCode;
    }) => void;
    "room:state": (state: RoomPublicState) => void;
    "room:error": (message: string) => void;
}
