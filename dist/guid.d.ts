/**
 * Nominal/Branded string type for UUID/GUID values.
 * Prevents accidentally passing plain strings where a Guid is expected.
 */
export declare type Guid = string & {
    readonly __brand: "Guid";
};
export declare function newGuid(): Guid;
export declare function isGuid(value: string): value is Guid;
