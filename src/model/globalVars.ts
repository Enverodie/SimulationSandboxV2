export enum Equality { LESSTHAN, LESSTHAN_EQUALTO, EQUALTO, GREATERTHAN_EQUALTO, GREATERTHAN, BETWEEN_INCLUSIVE };

// this determines the DEFAULT amount of ticks for a normal lifeform to wait before moving to the next generation
export const TICKS_BETWEEN_GENERATIONS = 256;

// this determines HALF the minimum/maximum size a world is allowed to be created with
export const MIN_WORLD_SPAN = 6;
export const MAX_WORLD_SPAN = Infinity;

export const DEFAULT_LIFEFORM_STRENGTH = 100;
export const DEFAULT_TIME_TO_SPROUT = 1;

// TODO: implement this boundary
export const MAX_TILES_SPREADCONDITION = 8+18;
export const MAX_TILES_SPREADSTRATEGY = 32;