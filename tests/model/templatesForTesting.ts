import { Equality, TICKS_BETWEEN_GENERATIONS } from "../../src/model/globalVars";
import World from "../../src/model/world";
import Positions from "../../src/model/positions";
import Lifeform, { ComplexRange, Lifeform_SpreadCondition, Lifeform_SpreadStrategy, IgnoreLifeformOptions } from "../../src/model/lifeform";

export let world1 = new World("world1");

export let positions1 = new Positions<boolean>(world1);
positions1.addPosition({x:0, y:-2}, true);
positions1.addPosition({x:-2, y:0}, true);
positions1.addPosition({x:0, y:0}, true);
positions1.addPosition({x:2, y:0}, true);
positions1.addPosition({x:0, y:2}, true);
/*
 *  0 0 1 0 0
 *  0 0 0 0 0
 *  1 0 1 0 1
 *  0 0 0 0 0
 *  0 0 1 0 0
 */

export let positions2 = new Positions<boolean>(world1);
positions2.addPosition({x:-1, y:-1}, true);
positions2.addPosition({x:1, y:-1}, true);
positions2.addPosition({x:1, y:1}, true);
positions2.addPosition({x:-1, y:1}, true);
/*
 *  0 1 0
 *  1 0 1
 *  0 1 0
 */

export let complexRange = new ComplexRange()
    .addAliveCondition(Equality.EQUALTO, [3, undefined]);

export let spreadCondition = new Lifeform_SpreadCondition(positions1, complexRange, IgnoreLifeformOptions.NONE);

export let spreadStrategies = [ new Lifeform_SpreadStrategy(spreadCondition, positions2, undefined, undefined) ];

export let lifeform = new Lifeform("Test lifeform", spreadStrategies, 100, TICKS_BETWEEN_GENERATIONS - 2);