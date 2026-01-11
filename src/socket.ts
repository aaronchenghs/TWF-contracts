import type {
  RoomCode,
  Role,
  RoomPublicState,
  TierSetDefinition,
  TierSetId,
  TierSetSummary,
  TierId,
  VoteValue,
  RoomJoinPayload,
  PlayerId,
} from "./room";

export interface ClientToServerEvents {
  "room:create": (payload: { role: Role }) => void;
  "room:join": (payload: RoomJoinPayload) => void;
  "room:setTierSet": (payload: { tierSetId: TierSetId }) => void;
  "room:start": (payload: { code: RoomCode }) => void;
  "room:close": () => void;

  "tierSets:list": () => void;
  "tierSets:get": (payload: { id: TierSetId }) => void;

  "game:place": (payload: { tierId: TierId }) => void;
  "game:vote": (payload: { vote: VoteValue }) => void;

  "debug:next": () => void;
  "debug:prev": () => void;
}

export interface ServerToClientEvents {
  "room:created": (payload: { code: RoomCode }) => void;
  "room:closed": () => void;
  "room:state": (state: RoomPublicState) => void;
  "room:error": (message: string) => void;

  "room:joined": (payload: { playerId: PlayerId }) => void;

  "tierSets:listed": (payload: { tierSets: TierSetSummary[] }) => void;
  "tierSets:got": (payload: { tierSet: TierSetDefinition }) => void;
}
