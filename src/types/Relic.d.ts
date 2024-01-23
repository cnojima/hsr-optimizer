import { StatsValues, Parts, Sets, SubStats } from "lib/constants";
import { GUID } from "types/Common";
import { CharacterId } from "./Character";

export type RelicGrade = 2 | 3 | 4 | 5;
export type RelicEnhance = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

export type Relic = {
  // refactor?
  augmentedCaseWeight?: number;
  averageCaseWeight?: number;
  bestCaseWeight?: number;
  cs?: number;
  ds?: number;
  relicsTabWeight?: number;
  ss?: number

  enhance: RelicEnhance;
  equippedBy: CharacterId;
  grade: RelicGrade;
  id: GUID;

  main: {
    stat: MainStats;
    value: number;
  };
  part: Parts;
  set: Sets;
  substats: [{
    stat: SubStats;
    value: number;
    scoreMeta: {
      multiplier: number;
      score: number;
    }
  }]
};

export type RelicBody = {
  main: {
    stat: (typeof Stats)[StatsValues];
  }
} & Relic;