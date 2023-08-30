/**
 * Controls all the settings relating to visuals 
 * throughout simulation sandbox -
 * Colors, gradients, spectrum cycling, etc.
 */

import { DEFAULT_COLOR_LOOP_TIME, DEFAULT_COLOR_GRADIENT } from "./globalVars";

export type RGB = { r: number, g: number, b: number };
export type RGBA = { r: number, g: number, b: number, a: number };

type RenderColorFunctions_Options = {
    loopAfterTicks?: number,
    color?: RGB,
    colorGradient?: RGB[],
}

export const Cell_RenderColorFunctions:{[key:string]: (tick:number, options:RenderColorFunctions_Options) => RGB} = {
    solid: (tick, options) => {
        if (!options || !options.color) return {r: 0, g: 0, b: 0};
        return options.color;
    },

    spectrumCycling: (tick, options) => {
        const loopAfterTicks = options.loopAfterTicks || DEFAULT_COLOR_LOOP_TIME;
        const advanceRate = 1/loopAfterTicks;
        let advancedAmount = (tick%loopAfterTicks) * advanceRate;
        const colorGradient = options.colorGradient || DEFAULT_COLOR_GRADIENT;
        let color1Index = Math.floor(advancedAmount * colorGradient.length), color2Percentage = (advancedAmount * colorGradient.length) - color1Index;
        let color2Index = color1Index + 1, color1Percentage = 1 - color2Percentage;
        let color1 = colorGradient[color1Index];
        let color2 = colorGradient[color2Index];
        return {
            r: (color1.r * color1Percentage) + (color2.r * color2Percentage),
            g: (color1.g * color1Percentage) + (color2.g * color2Percentage),
            b: (color1.b * color1Percentage) + (color2.b * color2Percentage),
        }
    }

}

class CellRenderStrategy {

}