import { Coordinate } from "./positions";

export enum Brush_Shapes {
    CIRCLE,
    SQUARE,
}

export interface Brush_Texture_Options {
    coord?: Coordinate,
    probability?: number,
    size?: number,
    shape?: Brush_Shapes,
}

export const matchWithTexture:{[key:string]: ((options:Brush_Texture_Options) => boolean)} = {
    solid: () => true,
    random: (options) => Math.random() < (options.probability || 1)
};