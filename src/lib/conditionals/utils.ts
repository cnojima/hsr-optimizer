import { Constants } from "lib/constants";

export const precisionRound = (number: number, precision: number = 8): number => {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};

// Remove the ashblazing set atk bonus only when calc-ing fua attacks
export const calculateAshblazingSet = (c, request, hitMulti): {
  ashblazingMulti: number,
  ashblazingAtk: number
} => {
  const enabled = p4(c.sets.TheAshblazingGrandDuke);
  const valueTheAshblazingGrandDuke = request.setConditionals[Constants.Sets.TheAshblazingGrandDuke][1];
  const ashblazingAtk = 0.06 * valueTheAshblazingGrandDuke * enabled * c.baseAtk * enabled;
  const ashblazingMulti = hitMulti * enabled * c.baseAtk;

  return {
    ashblazingMulti,
    ashblazingAtk
  }
};

export const p4 = (set: number): number => {
  return set >> 2
};


// JL, Dr.Ratio
export const skill = (eidolon: number, value1: number, value2: number): number => {
  return eidolon >= 3 ? value2 : value1
};

export const ult = (eidolon: number, value1: number, value2: number): number => {
  return eidolon >= 5 ? value2 : value1
}

export const talent = skill;
export const basic = ult;

// Topaz:
export const skillRev = (eidolon: number, value1: number, value2: number): number => {
  return eidolon >= 5 ? value2 : value1
};

export const ultRev = (eidolon: number, value1: number, value2: number): number => {
  return eidolon >= 3 ? value2 : value1
}

export const talentRev = skill;
export const basicRev = ult;
