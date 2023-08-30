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

export const DEFAULT_COLOR_LOOP_TIME = TICKS_BETWEEN_GENERATIONS;
export const DEFAULT_COLOR_GRADIENT = [
    {r: 255, g: 0, b: 0},
    {r: 255, g: 154, b: 0},
    {r: 208, g: 222, b: 33},
    {r: 79, g: 220, b: 74},
    {r: 63, g: 218, b: 216},
    {r: 47, g: 201, b: 226},
    {r: 28, g: 127, b: 238},
    {r: 95, g: 21, b: 242},
    {r: 186, g: 12, b: 248},
    {r: 251, g: 7, b: 217},
    {r: 255, g: 0, b: 0},
];

export const MAX_BRUSH_SPAN = 50;