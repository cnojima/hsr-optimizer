// import { } from "./Common";
import { RelicEnhance, RelicGrade } from "./Relic";
import { CharacterId, Eidolon } from "./Character";
import { SuperImpositionLevel } from "./LightCone";

type MIN_INT = 0 | number;
type MAX_INT = 2147483647 | number;

export type Form = {
  characterEidolon: Eidolon;
  characterId: CharacterId | undefined;
  characterLevel: number;
  enemyCount: number;
  enemyHpPercent: number;
  enemyLevel: number;
  enemyResistance: number;
  enhance: RelicEnhance;
  grade: RelicGrade;
  keepCurrentRelics: boolean;
  lightConeLevel: number;
  lightConeSuperimposition: SuperImpositionLevel;
  mainBody: any[];
  mainFeet: any[];
  mainHands: any[];
  mainHead: any[];
  mainLinkRope: any[];
  mainPlanarSphere: any[];
  ornamentSets: any[];
  predictMaxedMainStat: boolean;
  rankFilter: boolean;
  relicSets: any[];
  statDisplay: string;

  weights: {
    [key: string]: number;
  };
  characterConditionals: {
    [key: string]: [undefined, boolean | number];
    /*
    e1CdBuff: true
    e2SkillDmgBuff: true
    talentEnhancedState: true
    talentHpDrainAtkBuff: true
    */
  };

  buffAtk: number;
  buffAtkP: number;
  buffBe: number;
  buffCd: number;
  buffCr: number;
  buffDefShred: number;
  buffDmgBoost: number;
  buffResPen: number;
  buffSpd: number;
  buffSpdP: number;

  maxAtk: MAX_INT;
  maxBasic: MAX_INT;
  maxBe: MAX_INT;
  maxCd: MAX_INT;
  maxCr: MAX_INT;
  maxCv: MAX_INT;
  maxDef: MAX_INT;
  maxDmg: MAX_INT;
  maxDot: MAX_INT;
  maxEhp: MAX_INT;
  maxEhr: MAX_INT;
  maxFua: MAX_INT;
  maxHp: MAX_INT;
  maxMcd: MAX_INT;
  maxRes: MAX_INT;
  maxSkill: MAX_INT;
  maxSpd: MAX_INT;
  maxUlt: MAX_INT;
  maxWeight: MAX_INT;
  minAtk: MIN_INT;
  minBasic: MIN_INT;
  minBe: MIN_INT;
  minCd: MIN_INT;
  minCr: MIN_INT;
  minCv: MIN_INT;
  minDef: MIN_INT;
  minDmg: MIN_INT;
  minDot: MIN_INT;
  minEhp: MIN_INT;
  minEhr: MIN_INT;
  minFua: MIN_INT;
  minHp: MIN_INT;
  minMcd: MIN_INT;
  minRes: MIN_INT;
  minSkill: MIN_INT;
  minSpd: MIN_INT;
  minUlt: MIN_INT;
  minWeight: MIN_INT;
};