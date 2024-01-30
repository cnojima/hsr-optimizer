import React from "react";
import { Flex } from "antd";
import { HeaderText } from "components/HeaderText";
import { FormSlider, FormSwitch } from "components/optimizerTab/FormConditionalInputs";
import { TooltipImage } from "components/TooltipImage";
import { Constants } from 'lib/constants.ts'
import { Hint } from "lib/hint";

import { calculateAshblazingSet, basic, skill, talent, ult } from "lib/conditionals/utils";
import { ASHBLAZING_ATK_STACK, baseComputedStatsObject } from "lib/conditionals/constants";

import drratio from 'lib/conditionals/character/DrRatio';
import jingliu from 'lib/conditionals/character/Jingliu';
import xueyi from 'lib/conditionals/character/Xueyi';
import ruanmei from 'lib/conditionals/character/RuanMei';
import yukong from 'lib/conditionals/character/Yukong';
import yanqing from 'lib/conditionals/character/Yanqing';
import welt from 'lib/conditionals/character/Welt';
import firetrailblazer from 'lib/conditionals/character/TrailblazerPreservation';
import physicaltrailblazer from 'lib/conditionals/character/TrailblazerDestruction';
import topaz from 'lib/conditionals/character/Topaz';
import tingyun from 'lib/conditionals/character/Tingyun';
import sushang from 'lib/conditionals/character/Sushang';
import silverwolf from 'lib/conditionals/character/SilverWolf';

const Stats = Constants.Stats

export const characterOptionMapping = {
  1212: jingliu,
  1302: argenti,
  1008: arlan,
  1009: asta,
  1211: bailu,
  1205: blade,
  1101: bronya,
  1107: clara,
  1002: danheng,
  1208: fuxuan,
  1104: gepard,
  1210: guinaifen,
  1215: hanya,
  1013: herta,
  1003: himeko,
  1109: hook,
  1217: huohuo,
  1213: imbibitorlunae, // Simplified stacking logic, revisit
  1204: jingyuan,
  1005: kafka,
  1111: luka,
  1203: luocha,
  1110: lynx,
  1001: march7th,
  1105: natasha,
  1106: pela,
  1201: qingque,
  1108: sampo,
  1102: seele,
  1103: serval,
  1006: silverwolf,
  1206: sushang,
  1202: tingyun,
  1112: topaz,
  8001: physicaltrailblazer,
  8002: physicaltrailblazer,
  8003: firetrailblazer,
  8004: firetrailblazer,
  1004: welt,
  1209: yanqing,
  1207: yukong,
  1303: ruanmei,
  1305: drratio,
  1214: xueyi,
  1306: sparkle,
  1307: blackswan,
  1312: misha,
}



// function silverwolf(e) {
//   const skillResShredValue = skill(e, 0.10, 0.105)
//   const skillDefShredBufValue = skill(e, 0.08, 0.088)
//   const ultDefShredValue = ult(e, 0.45, 0.468)

//   const basicScaling = basic(e, 1.00, 1.10)
//   const skillScaling = skill(e, 1.96, 2.156)
//   const ultScaling = ult(e, 3.80, 4.104)

//   return {
//     display: () => (
//       <Flex vertical gap={10} >
//         <FormSwitch name='skillResShredDebuff' text='Skill res shred' />
//         <FormSwitch name='skillDefShredDebuff' text='Skill def shred' />
//         <FormSwitch name='ultDefShredDebuff' text='Ult def shred' />
//         <FormSlider name='targetDebuffs' text='Target debuffs' min={0} max={5} />
//       </Flex>
//     ),
//     defaults: () => ({
//       skillResShredDebuff: true,
//       skillDefShredDebuff: true,
//       ultDefShredDebuff: true,
//       targetDebuffs: 5,
//     }),
//     precomputeEffects: (request) => {
//       const r = request.characterConditionals
//       const x = Object.assign({}, baseComputedStatsObject)

//       // Stats

//       // Scaling
//       x.BASIC_SCALING += basicScaling
//       x.SKILL_SCALING += skillScaling
//       x.ULT_SCALING += ultScaling
//       x.ULT_SCALING += (e >= 4) ? r.targetDebuffs * 0.20 : 0

//       // Boost
//       x.RES_PEN += (r.skillResShredDebuff) ? skillResShredValue : 0
//       x.RES_PEN += (r.skillResShredDebuff && r.targetDebuffs >= 3) ? 0.03 : 0
//       x.DEF_SHRED += (r.skillDefShredDebuff) ? skillDefShredBufValue : 0
//       x.DEF_SHRED += (r.ultDefShredDebuff) ? ultDefShredValue : 0
//       x.ELEMENTAL_DMG += (e >= 6) ? r.targetDebuffs * 0.20 : 0

//       return x
//     },
//     calculateBaseMultis: (c) => {
//       const x = c.x

//       x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
//       x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
//       x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
//       // x.FUA_DMG += 0
//     }
//   }
// }

function serval(e) {
  const talentExtraDmgScaling = talent(e, 0.72, 0.792)

  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 1.40, 1.54)
  const ultScaling = ult(e, 1.80, 1.944)
  const dotScaling = skill(e, 1.04, 1.144)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='targetShocked' text='Target shocked' />
        <FormSwitch name='enemyDefeatedBuff' text='Enemy killed buff' />
      </Flex>
    ),
    defaults: () => ({
      targetShocked: true,
      enemyDefeatedBuff: true,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.ATK_P] += (r.enemyDefeatedBuff) ? 0.20 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling
      x.DOT_SCALING += dotScaling

      x.BASIC_SCALING += (r.targetShocked) ? talentExtraDmgScaling : 0
      x.SKILL_SCALING += (r.targetShocked) ? talentExtraDmgScaling : 0
      x.ULT_SCALING += (r.targetShocked) ? talentExtraDmgScaling : 0

      // Boost
      x.ELEMENTAL_DMG += (e >= 6 && r.targetShocked) ? 0.30 : 0

      return x
    },
    calculateBaseMultis: (c) => {
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      x.DOT_DMG += x.DOT_SCALING * x[Stats.ATK]
    }
  }
}

function seele(e) {
  const buffedStateDmgBuff = talent(e, 0.80, 0.88)
  const speedBoostStacksMax = (e >= 2 ? 2 : 1)

  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 2.20, 2.42)
  const ultScaling = ult(e, 4.25, 4.59)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='buffedState' text='Buffed state' />
        <FormSlider name='speedBoostStacks' text='Speed boost stacks' min={0} max={speedBoostStacksMax} />
        <FormSwitch name='e6UltTargetDebuff' text='E6 ult debuff' disabled={e < 6} />
      </Flex>
    ),
    defaults: () => ({
      buffedState: true,
      speedBoostStacks: speedBoostStacksMax,
      e6UltTargetDebuff: true
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.CR] += (e >= 1 && request.enemyHpPercent <= 0.80) ? 0.15 : 0
      x[Stats.SPD_P] += 0.25 * r.speedBoostStacks

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      // Boost
      x.ELEMENTAL_DMG += (r.buffedState) ? buffedStateDmgBuff : 0
      x.RES_PEN += (r.buffedState) ? 0.20 : 0

      return x
    },
    calculateBaseMultis: (c, request) => {
      const r = request.characterConditionals
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]

      x.BASIC_DMG += (e >= 6 && r.e6UltTargetDebuff) ? 0.15 * x.ULT_DMG : 0
      x.SKILL_DMG += (e >= 6 && r.e6UltTargetDebuff) ? 0.15 * x.ULT_DMG : 0
      x.ULT_DMG += (e >= 6 && r.e6UltTargetDebuff) ? 0.15 * x.ULT_DMG : 0
    }
  }
}

function sampo(e) {
  const dotVulnerabilityValue = ult(e, 0.30, 0.32)

  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 0.56, 0.616)
  const ultScaling = ult(e, 1.60, 1.728)
  const dotScaling = talent(e, 0.52, 0.572)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='targetDotTakenDebuff' text='Ult dot taken debuff' />
        <FormSlider name='skillExtraHits' text='Skill extra hits' min={0} max={4} />
        <FormSwitch name='targetWindShear' text='Target has wind shear' />
      </Flex>
    ),
    defaults: () => ({
      targetDotTakenDebuff: true,
      skillExtraHits: 4,
      targetWindShear: true
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.SKILL_SCALING += (r.skillExtraHits) * skillScaling
      x.ULT_SCALING += ultScaling
      x.DOT_SCALING += dotScaling
      x.DOT_SCALING += (e >= 6) ? 0.15 : 0

      // Boost
      x.DOT_VULNERABILITY += (r.targetDotTakenDebuff) ? dotVulnerabilityValue : 0
      x.DMG_RED_MULTI *= (r.targetWindShear) ? (1 - 0.15) : 1

      return x
    },
    calculateBaseMultis: (c) => {
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      x.DOT_DMG += x.DOT_SCALING * x[Stats.ATK]
    }
  }
}

function qingque(e) {
  const skillStackDmg = skill(e, 0.38, 0.408)
  const talentAtkBuff = talent(e, 0.72, 0.792)

  const basicScaling = basic(e, 1.00, 1.10)
  const basicEnhancedScaling = basic(e, 2.40, 2.64)
  const skillScaling = skill(e, 0, 0)
  const ultScaling = ult(e, 2.00, 2.16)

  const hitMultiByTargetsBlast = {
    1: ASHBLAZING_ATK_STACK * (1 * 1 / 1), // 0.06
    3: ASHBLAZING_ATK_STACK * (2 * 1 / 1), // 0.12
    5: ASHBLAZING_ATK_STACK * (2 * 1 / 1)  // 0.12
  }

  const hitMultiSingle = ASHBLAZING_ATK_STACK * (1 * 1 / 1)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='basicEnhanced' text='Basic enhanced' />
        <FormSwitch name='basicEnhancedSpdBuff' text='Basic enhanced spd buff' />
        <FormSlider name='skillDmgIncreaseStacks' text='Skill dmg stacks' min={0} max={4} />
      </Flex>
    ),
    defaults: () => ({
      basicEnhanced: true,
      basicEnhancedSpdBuff: true,
      skillDmgIncreaseStacks: 4,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.ATK_P] += (r.basicEnhanced) ? talentAtkBuff : 0
      x[Stats.SPD_P] += (r.basicEnhancedSpdBuff) ? 0.10 : 0

      // Scaling
      x.BASIC_SCALING += (r.basicEnhanced) ? basicEnhancedScaling : basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling
      x.FUA_SCALING += (e >= 4) ? x.BASIC_SCALING : 0

      // Boost
      x.ELEMENTAL_DMG += r.skillDmgIncreaseStacks * skillStackDmg
      x.ULT_BOOST += (e >= 1) ? 0.10 : 0

      return x
    },
    calculateBaseMultis: (c, request) => {
      const r = request.characterConditionals
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]

      if (r.basicEnhanced) {
        const hitMulti = hitMultiByTargetsBlast[request.enemyCount]
        const { ashblazingMulti, ashblazingAtk } = calculateAshblazingSet(c, request, hitMulti)
        x.FUA_DMG += x.FUA_SCALING * (x[Stats.ATK] - ashblazingAtk + ashblazingMulti)
      } else {
        const { ashblazingMulti, ashblazingAtk } = calculateAshblazingSet(c, request, hitMultiSingle)
        x.FUA_DMG += x.FUA_SCALING * (x[Stats.ATK] - ashblazingAtk + ashblazingMulti)
      }
    }
  }
}

function pela(e) {
  const ultDefPenValue = ult(e, 0.40, 0.42)

  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 2.10, 2.31)
  const ultScaling = ult(e, 1.00, 1.08)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='enemyDebuffed' text='Enemy debuffed' />
        <FormSwitch name='skillRemovedBuff' text='Skill removed buff' />
        <FormSwitch name='ultDefPenDebuff' text='Ult def pen debuff' />
        <FormSwitch name='e4SkillResShred' text='E4 skill res shred' disabled={e < 4} />
      </Flex>
    ),
    defaults: () => ({
      enemyDebuffed: true,
      skillRemovedBuff: true,
      ultDefPenDebuff: true,
      e4SkillResShred: true,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.EHR] += 0.10
      x[Stats.SPD_P] += (e >= 2 && r.skillRemovedBuff) ? 0.10 : 0
      x[Stats.SPD_P] += (e >= 2 && r.skillRemovedBuff) ? 0.10 : 0
      x[Stats.SPD_P] += (e >= 2 && r.skillRemovedBuff) ? 0.10 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      // Boost
      x.BASIC_BOOST += (r.skillRemovedBuff) ? 0.20 : 0
      x.SKILL_BOOST += (r.skillRemovedBuff) ? 0.20 : 0
      x.ULT_BOOST += (r.skillRemovedBuff) ? 0.20 : 0

      x.RES_PEN += (e >= 4 && r.e4SkillResShred) ? 0.12 : 0
      x.DEF_SHRED += (r.ultDefPenDebuff) ? ultDefPenValue : 0

      x.ELEMENTAL_DMG += (r.enemyDebuffed) ? 0.20 : 0

      return x
    },
    calculateBaseMultis: (c) => {
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]

      x.BASIC_DMG += (e >= 6) ? 0.40 * x[Stats.ATK] : 0
      x.SKILL_DMG += (e >= 6) ? 0.40 * x[Stats.ATK] : 0
      x.ULT_DMG += (e >= 6) ? 0.40 * x[Stats.ATK] : 0
    }
  }
}

function natasha(e) {
  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 0, 0)
  const ultScaling = ult(e, 0, 0)

  return {
    display: () => (
      <Flex vertical gap={10} >
      </Flex>
    ),
    defaults: () => ({
    }),
    precomputeEffects: () => {
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      // Boost

      return x
    },
    calculateBaseMultis: (c) => {
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.BASIC_DMG += (e >= 6) ? 0.40 * x[Stats.HP] : 0
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
    }
  }
}

function march7th(e) {
  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 0, 0)
  const ultScaling = ult(e, 1.50, 1.62)
  const fuaScaling = talent(e, 1.00, 1.10)

  const hitMulti = ASHBLAZING_ATK_STACK * (1 * 1 / 1)

  return {
    display: () => (
      <Flex vertical gap={10} >
      </Flex>
    ),
    defaults: () => ({
    }),
    precomputeEffects: () => {
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling
      x.FUA_SCALING += fuaScaling

      // Boost

      return x
    },
    calculateBaseMultis: (c, request) => {
      const x = c.x

      const { ashblazingMulti, ashblazingAtk } = calculateAshblazingSet(c, request, hitMulti)

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      x.FUA_DMG += x.FUA_SCALING * (x[Stats.ATK] - ashblazingAtk + ashblazingMulti)
      x.FUA_DMG += (e >= 4) ? 0.30 * x[Stats.DEF] : 0
    }
  }
}

function lynx(e) {
  const skillHpPercentBuff = skill(e, 0.075, 0.08)
  const skillHpFlatBuff = skill(e, 200, 223)

  const basicScaling = basic(e, 0.50, 0.55)
  const skillScaling = skill(e, 0, 0)
  const ultScaling = ult(e, 0, 0)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='skillBuff' text='Skill buff' />
      </Flex>
    ),
    defaults: () => ({
      skillBuff: true,
      e4TalentAtkBuff: true,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.HP_P] += (r.skillBuff) ? skillHpPercentBuff : 0
      x[Stats.HP] += (r.skillBuff) ? skillHpFlatBuff : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      // Boost

      return x
    },
    calculateBaseMultis: (c, request) => {
      const r = request.characterConditionals
      const x = c.x

      x[Stats.HP] += (e >= 6 && r.skillBuff) ? 0.06 * x[Stats.HP] : 0
      x[Stats.ATK] += (e >= 4 && r.skillBuff) ? 0.03 * x[Stats.HP] : 0

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.HP]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      // x.FUA_DMG += 0
    }
  }
}

function luocha(e) {
  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 0, 0)
  const ultScaling = ult(e, 2.00, 2.16)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='fieldActive' text='Field active' />
        <FormSwitch name='e6ResReduction' text='E6 res reduction' disabled={e < 6} />
      </Flex>
    ),
    defaults: () => ({
      fieldActive: true,
      e6ResReduction: true,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.ATK_P] += (r >= 1 && r.fieldActive) ? 0.20 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      // Boost
      x.RES_PEN += (e >= 6 && r.e6ResReduction) ? 0.20 : 0

      return x
    },
    calculateBaseMultis: (c) => {
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      // x.FUA_DMG += 0
    }
  }
}

function luka(e) {
  const basicEnhancedHitValue = basic(e, 0.20, 0.22)
  const targetUltDebuffDmgTakenValue = ult(e, 0.20, 0.216)

  const basicScaling = basic(e, 1.00, 1.10)
  const basicEnhancedScaling = basic(e, 0.20 * 3 + 0.80, 0.22 * 3 + 0.88)
  const skillScaling = skill(e, 1.20, 1.32)
  const ultScaling = ult(e, 3.30, 3.564)
  const dotScaling = skill(e, 3.38, 3.718)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='basicEnhanced' text='Basic enhanced' />
        <FormSwitch name='targetUltDebuffed' text='Target ult debuffed' />
        <FormSlider name='basicEnhancedExtraHits' text='Basic extra hits' min={0} max={3} />
        <FormSwitch name='e1TargetBleeding' text='E1 target bleeding' disabled={e < 1} />
        <FormSlider name='e4TalentStacks' text='E4 talent stacks' min={0} max={4} disabled={e < 4} />
      </Flex>
    ),
    defaults: () => ({
      basicEnhanced: true,
      targetUltDebuffed: true,
      e1TargetBleeding: true,
      basicEnhancedExtraHits: 3,
      e4TalentStacks: 4,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.ATK_P] += (e >= 4) ? r.e4TalentStacks * 0.05 : 0

      // Scaling
      x.BASIC_SCALING += (r.basicEnhanced) ? basicEnhancedScaling : basicScaling
      x.BASIC_SCALING += (r.basicEnhanced && r.basicEnhancedExtraHits) * basicEnhancedHitValue
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling
      x.DOT_SCALING += dotScaling

      // Boost
      x.DMG_TAKEN_MULTI += (r.targetUltDebuffed) ? targetUltDebuffDmgTakenValue : 0
      x.ELEMENTAL_DMG += (e >= 1 && r.e1TargetBleeding) ? 0.15 : 0

      return x
    },
    calculateBaseMultis: (c) => {
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      x.DOT_DMG += x.DOT_SCALING * x[Stats.ATK]
      // x.FUA_DMG += 0
    }
  }
}

function kafka(e) {

  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 1.60, 1.76)
  const ultScaling = ult(e, 0.80, 0.864)
  const fuaScaling = talent(e, 1.40, 1.596)
  const dotScaling = ult(e, 2.90, 3.183)

  const hitMulti = ASHBLAZING_ATK_STACK *
    (1 * 0.15 + 2 * 0.15 + 3 * 0.15 + 4 * 0.15 + 5 * 0.15 + 6 * 0.25)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='e1DotDmgReceivedDebuff' text='E1 dot dmg debuff' disabled={e < 1} />
      </Flex>
    ),
    defaults: () => ({
      e1DotDmgReceivedDebuff: true,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling
      x.FUA_SCALING += fuaScaling
      x.DOT_SCALING += dotScaling

      // Boost
      x.DOT_VULNERABILITY += (e >= 1 && r.e1DotDmgReceivedDebuff) ? 0.30 : 0
      x.DOT_BOOST += (e >= 2) ? 0.25 : 0
      x.DOT_SCALING += (e >= 6) ? 1.56 : 0

      return x
    },
    calculateBaseMultis: (c, request) => {
      const x = c.x

      const { ashblazingMulti, ashblazingAtk } = calculateAshblazingSet(c, request, hitMulti)

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      x.FUA_DMG += x.FUA_SCALING * (x[Stats.ATK] - ashblazingAtk + ashblazingMulti)
      x.DOT_DMG += x.DOT_SCALING * x[Stats.ATK]
    }
  }
}

function jingyuan(e) {
  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 1.00, 1.10)
  const ultScaling = ult(e, 2.00, 2.16)
  const fuaScaling = talent(e, 0.66, 0.726)

  let hitMulti = 0

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='skillCritBuff' text='Skill cr buff' />
        <FormSlider name='talentHitsPerAction' text='Talent stacks' min={3} max={10} />
        <FormSlider name='talentAttacks' text='Talent hit on target' min={0} max={10} />
        <FormSwitch name='e2DmgBuff' text='E2 dmg buff' disabled={e < 2} />
        <FormSlider name='e6FuaVulnerabilityStacks' text='E6 vulnerable stacks (applies to all hits)' min={0} max={3} disabled={e < 6} />
      </Flex>
    ),
    defaults: () => ({
      skillCritBuff: true,
      talentHitsPerAction: 10,
      talentAttacks: 10,
      e2DmgBuff: true,
      e6FuaVulnerabilityStacks: 3
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      r.talentHitsPerAction = Math.max(r.talentHitsPerAction, r.talentAttacks)

      // Stats
      x[Stats.CR] += (r.skillCritBuff) ? 0.10 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling
      x.FUA_SCALING += fuaScaling

      // Boost
      x.FUA_CD_BOOST += (r.talentHitsPerAction >= 6) ? 0.25 : 0
      x.BASIC_BOOST += (e >= 2 && r.e2DmgBuff) ? 0.20 : 0
      x.SKILL_BOOST += (e >= 2 && r.e2DmgBuff) ? 0.20 : 0
      x.ULT_BOOST += (e >= 2 && r.e2DmgBuff) ? 0.20 : 0

      x.FUA_VULNERABILITY += (e >= 6) ? r.e6FuaVulnerabilityStacks * 0.12 : 0

      // Lightning lord calcs
      const stacks = r.talentHitsPerAction
      const hits = r.talentAttacks
      const stacksPerMiss = (request.enemyCount >= 3) ? 2 : 0
      const stacksPerHit = (request.enemyCount >= 3) ? 3 : 1
      const stacksPreHit = (request.enemyCount >= 3) ? 2 : 1

      // Calc stacks on miss
      let ashblazingStacks = stacksPerMiss * (stacks - hits)

      // Calc stacks on hit
      ashblazingStacks += stacksPreHit
      let atkBoostSum = 0
      for (let i = 0; i < hits; i++) {
        atkBoostSum += Math.min(8, ashblazingStacks) * (1 / hits)
        ashblazingStacks += stacksPerHit
      }

      hitMulti = atkBoostSum * 0.06

      return x
    },
    calculateBaseMultis: (c, request) => {
      const r = request.characterConditionals
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]

      const { ashblazingMulti, ashblazingAtk } = calculateAshblazingSet(c, request, hitMulti)
      x.FUA_DMG += x.FUA_SCALING * r.talentAttacks * (x[Stats.ATK] - ashblazingAtk + ashblazingMulti)
    }
  }
}

function imbibitorlunae(e) {
  const righteousHeartStackMax = (e >= 1) ? 10 : 6
  const outroarStackCdValue = skill(e, 0.12, 0.132)
  const righteousHeartDmgValue = talent(e, 0.10, 0.11)

  const basicScaling = basic(e, 1.00, 1.10)
  const basicEnhanced1Scaling = basic(e, 2.60, 2.86)
  const basicEnhanced2Scaling = basic(e, 3.80, 4.18)
  const basicEnhanced3Scaling = basic(e, 5.00, 5.50)
  const skillScaling = skill(e, 0, 0)
  const ultScaling = ult(e, 3.00, 3.24)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSlider name='basicEnhancements' text='Basic enhancements' min={0} max={3} />
        <FormSlider name='skillOutroarStacks' text='Outroar stacks (applied to all hits)' min={0} max={4} />
        <FormSlider name='talentRighteousHeartStacks' text='Righteous Heart stacks (applied to all hits)' min={0} max={righteousHeartStackMax} />
        <FormSlider name='e6ResPenStacks' text='E6 RES pen stacks' min={0} max={3} disabled={e < 6} />
      </Flex>
    ),
    defaults: () => ({
      basicEnhancements: 3,
      skillOutroarStacks: 4,
      talentRighteousHeartStacks: righteousHeartStackMax,
      e6ResPenStacks: 3,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.CD] += (request.enemyElementalWeak) ? 0.24 : 0
      x[Stats.CD] += r.skillOutroarStacks * outroarStackCdValue

      // Scaling
      x.BASIC_SCALING += {
        0: basicScaling,
        1: basicEnhanced1Scaling,
        2: basicEnhanced2Scaling,
        3: basicEnhanced3Scaling,
      }[r.basicEnhancements]
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      // Boost
      x.ELEMENTAL_DMG += r.talentRighteousHeartStacks * righteousHeartDmgValue
      x.BASIC_RES_PEN += (e >= 6 && r.basicEnhancements == 3) ? 0.20 * r.e6ResPenStacks : 0

      return x
    },
    calculateBaseMultis: (c) => {
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
    }
  }
}

function huohuo(e) {
  const ultBuffValue = ult(e, 0.40, 0.432)
  const basicScaling = basic(e, 0.50, 0.55)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='ultBuff' text='Ult buff' />
        <FormSwitch name='skillBuff' text='Skill buff' />
        <FormSwitch name='e6DmgBuff' text='E6 dmg buff' disabled={e < 6} />
      </Flex>
    ),
    defaults: () => ({
      ultBuff: true,
      skillBuff: true,
      e6DmgBuff: true,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.SPD_P] += (e >= 1 && r.skillBuff) ? 0.12 : 0
      x[Stats.ATK_P] += (r.ultBuff) ? ultBuffValue : 0

      // Scaling
      x.BASIC_SCALING += basicScaling

      // Boost
      x.ELEMENTAL_DMG += (e >= 6 && r.skillBuff) ? 0.50 : 0

      return x
    },
    calculateBaseMultis: (c) => {
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.HP]
    }
  }
}

function hook(e) {
  const targetBurnedExtraScaling = talent(e, 1.00, 1.10)

  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 2.40, 2.64)
  const skillEnhancedScaling = skill(e, 2.80, 3.08)
  const ultScaling = ult(e, 4.00, 4.32)
  const dotScaling = skill(e, 0.65, 0.715)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='enhancedSkill' text='Enhanced skill' />
        <FormSwitch name='targetBurned' text='Target burned' />
      </Flex>
    ),
    defaults: () => ({
      enhancedSkill: true,
      targetBurned: true,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += (r.enhancedSkill) ? skillEnhancedScaling : skillScaling
      x.ULT_SCALING += ultScaling
      x.BASIC_SCALING += (r.targetBurned) ? targetBurnedExtraScaling : 0
      x.SKILL_SCALING += (r.targetBurned) ? targetBurnedExtraScaling : 0
      x.ULT_SCALING += (r.targetBurned) ? targetBurnedExtraScaling : 0
      x.DOT_SCALING += dotScaling

      // Boost
      x.SKILL_BOOST += (e >= 1 && r.enhancedSkill) ? 0.20 : 0
      x.ELEMENTAL_DMG += (e >= 6 && r.targetBurned) ? 0.20 : 0

      return x
    },
    calculateBaseMultis: (c) => {
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      x.DOT_DMG += x.DOT_SCALING * x[Stats.ATK]
    }
  }
}
function himeko(e) {
  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 2.00, 2.20)
  const ultScaling = ult(e, 2.30, 2.484)
  const fuaScaling = talent(e, 1.40, 1.54)
  const dotScaling = 0.30

  const hitMultiByTargets = {
    1: ASHBLAZING_ATK_STACK * (1 * 0.20 + 2 * 0.20 + 3 * 0.20 + 4 * 0.40), // 0.168
    3: ASHBLAZING_ATK_STACK * (2 * 0.20 + 5 * 0.20 + 8 * 0.20 + 8 * 0.40), // 0.372
    5: ASHBLAZING_ATK_STACK * (3 * 0.20 + 8 * 0.20 + 8 * 0.20 + 8 * 0.40), // 0.42
  }

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='targetBurned' text='Target burned' />
        <FormSwitch name='selfCurrentHp80Percent' text='Self HP >= 80%' />
        <FormSwitch name='e1TalentSpdBuff' text='E1 spd buff' disabled={e < 1} />
        <FormSlider name='e6UltExtraHits' text='E6 ult extra hits' min={0} max={2} disabled={e < 6} />
      </Flex>
    ),
    defaults: () => ({
      targetBurned: true,
      selfCurrentHp80Percent: true,
      e1TalentSpdBuff: true,
      e6UltExtraHits: 2,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.CR] += (r.selfCurrentHp80Percent) ? 0.15 : 0
      x[Stats.SPD_P] += (e >= 1 && r.e1TalentSpdBuff) ? 0.20 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling
      x.ULT_SCALING += (e >= 6) ? r.e6UltExtraHits * ultScaling * 0.40 : 0
      x.FUA_SCALING += fuaScaling
      x.DOT_SCALING += dotScaling

      // Boost
      x.SKILL_BOOST += (r.targetBurned) ? 0.20 : 0
      x.ELEMENTAL_DMG += (e >= 2 && request.enemyHpPercent <= 0.50) ? 0.15 : 0

      return x
    },
    calculateBaseMultis: (c, request) => {
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      x.DOT_DMG += x.DOT_SCALING * x[Stats.ATK]

      const hitMulti = hitMultiByTargets[request.enemyCount]
      const { ashblazingMulti, ashblazingAtk } = calculateAshblazingSet(c, request, hitMulti)
      x.FUA_DMG += x.FUA_SCALING * (x[Stats.ATK] - ashblazingAtk + ashblazingMulti)
    }
  }
}

function herta(e) {
  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 1.00, 1.10)
  const ultScaling = ult(e, 2.00, 2.16)
  const fuaScaling = talent(e, 0.40, 0.43)

  const hitMultiByTargets = {
    1: ASHBLAZING_ATK_STACK * (1 * 1 / 1),
    3: ASHBLAZING_ATK_STACK * (2 * 1 / 1),
    5: ASHBLAZING_ATK_STACK * (3 * 1 / 1)
  }

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='techniqueBuff' text='Technique buff' />
        <FormSwitch name='targetFrozen' text='Target frozen' />
        <FormSlider name='e2TalentCritStacks' text='E2 talent crit stacks' min={0} max={5} disabled={e < 2} />
        <FormSwitch name='e6UltAtkBuff' text='E6 ult atk buff' disabled={e < 6} />
      </Flex>
    ),
    defaults: () => ({
      techniqueBuff: true,
      targetFrozen: true,
      e2TalentCritStacks: 5,
      e6UltAtkBuff: true,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.ATK_P] += (r.techniqueBuff) ? 0.40 : 0
      x[Stats.CR] += (e >= 2) ? r.e2TalentCritStacks * 0.03 : 0
      x[Stats.ATK_P] += (e >= 6 && r.e6UltAtkBuff) ? 0.25 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.BASIC_SCALING += (e >= 1 && request.enemyHpPercent <= 0.50) ? 0.40 : 0
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling
      x.FUA_SCALING += fuaScaling

      x.SKILL_BOOST += (request.enemyHpPercent >= 0.50) ? 0.45 : 0

      // Boost
      x.ULT_BOOST += (r.targetFrozen) ? 0.20 : 0
      x.FUA_BOOST += (e >= 4) ? 0.10 : 0

      return x
    },
    calculateBaseMultis: (c, request) => {
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]

      const hitMulti = hitMultiByTargets[request.enemyCount]
      const { ashblazingMulti, ashblazingAtk } = calculateAshblazingSet(c, request, hitMulti)
      x.FUA_DMG += x.FUA_SCALING * (x[Stats.ATK] - ashblazingAtk + ashblazingMulti)
    }
  }
}

function hanya(e) {
  const ultSpdBuffValue = ult(e, 0.20, 0.21)
  const ultAtkBuffValue = ult(e, 0.60, 0.648)
  let talentDmgBoostValue = talent(e, 0.30, 0.33)

  talentDmgBoostValue += (e >= 6) ? 0.10 : 0

  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 2.40, 2.64)
  const ultScaling = ult(e, 0, 0)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='ultBuff' text='Ult buff active' />
        <FormSwitch name='targetBurdenActive' text='Target burden active' />
        <FormSwitch name='burdenAtkBuff' text='Burden atk buff' />
        <FormSwitch name='e2SkillSpdBuff' text='E2 skill spd buff' disabled={e < 2} />
      </Flex>
    ),
    defaults: () => ({
      ultBuff: true,
      targetBurdenActive: true,
      burdenAtkBuff: true,
      skillSpdBuff: true,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      x[Stats.ATK_P] += (r.ultBuff) ? ultAtkBuffValue : 0
      x[Stats.ATK_P] += (r.burdenAtkBuff) ? 0.10 : 0
      x[Stats.SPD_P] += (e >= 2 && r.e2SkillSpdBuff) ? 0.20 : 0

      // Boost
      x.ALL_DMG_MULTI = (r.targetBurdenActive) ? talentDmgBoostValue : 0

      return x
    },
    calculateBaseMultis: (c, request) => {
      const r = request.characterConditionals
      const x = c.x

      x[Stats.SPD] += (r.ultBuff) ? ultSpdBuffValue * x[Stats.SPD] : 0

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
    }
  }
}

function guinaifen(e) {
  const talentDebuffDmgIncreaseValue = talent(e, 0.07, 0.076)
  const talentDebuffMax = (e >= 6) ? 4 : 3

  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 1.20, 1.32)
  const ultScaling = ult(e, 1.20, 1.296)
  const dotScaling = skill(e, 2.182, 2.40)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSlider name='talentDebuffStacks' text='Talent debuff stacks' min={0} max={talentDebuffMax} />
        <FormSwitch name='enemyBurned' text='Enemy burned' />
        <FormSwitch name='e2BurnMultiBoost' text='E2 burn multi boost' disabled={e < 2} />
      </Flex>
    ),
    defaults: () => ({
      talentDebuffStacks: talentDebuffMax,
      enemyBurned: true,
      e2BurnMultiBoost: true,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling
      x.DOT_SCALING += dotScaling
      x.DOT_SCALING += (e >= 2 && r.e2BurnMultiBoost) ? 0.40 : 0


      // Boost
      x.ELEMENTAL_DMG += (r.enemyBurned) ? 0.20 : 0
      x.DMG_TAKEN_MULTI += r.talentDebuffStacks * talentDebuffDmgIncreaseValue

      return x
    },
    calculateBaseMultis: (c) => {
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      x.DOT_DMG += x.DOT_SCALING * x[Stats.ATK]
    }
  }
}

function gepard(e) {
  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 2.00, 2.20)
  const ultScaling = ult(e, 0, 0)

  return {
    display: () => (
      <Flex vertical gap={10} >
      </Flex>
    ),
    defaults: () => ({
    }),
    precomputeEffects: () => {
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.RES] += 0.20

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      // Boost

      return x
    },
    calculateBaseMultis: (c) => {
      const x = c.x

      x[Stats.ATK] += 0.35 * x[Stats.DEF]

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
    }
  }
}

function fuxuan(e) {
  const skillCrBuffValue = skill(e, 0.12, 0.132)
  const skillHpBuffValue = skill(e, 0.06, 0.066)
  const talentDmgReductionValue = talent(e, 0.18, 0.196)

  const basicScaling = basic(e, 0.50, 0.55)
  const skillScaling = skill(e, 0, 0)
  const ultScaling = ult(e, 1.00, 1.08)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='skillActive' text='Skill active' />
        <FormSlider name='e6TeamHpLostPercent' text='E6 team hp lost' min={0} max={1.2} percent disabled={e < 6} />
      </Flex>
    ),
    defaults: () => ({
      skillActive: true,
      e6TeamHpLostPercent: 1.2,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.CD] += (e >= 1) ? 0.30 : 0
      x[Stats.CR] += (r.skillActive) ? skillCrBuffValue : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      // Boost
      x.DMG_RED_MULTI *= (1 - talentDmgReductionValue)

      return x
    },
    calculateBaseMultis: (c, request) => {
      const r = request.characterConditionals
      const x = c.x

      x[Stats.HP] += (r.skillActive) ? skillHpBuffValue * x[Stats.HP] : 0

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.HP]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.HP]
      x.ULT_DMG += (e >= 6) ? 2.00 * r.e6TeamHpLostPercent * x[Stats.HP] : 0
    }
  }
}
function danheng(e) {
  const extraPenValue = talent(e, 0.36, 0.396)

  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 2.60, 2.86)
  const ultScaling = ult(e, 4.00, 4.32)
  const ultExtraScaling = ult(e, 1.20, 1.296)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='talentPenBuff' text='Talent pen buff' />
        <FormSwitch name='enemySlowed' text='Enemy slowed' />
      </Flex>
    ),
    defaults: () => ({
      talentPenBuff: true,
      enemySlowed: true,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.CR] += (e >= 1 && request.enemyHpPercent >= 0.50) ? 0.12 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling
      x.ULT_SCALING += (r.enemySlowed) ? ultExtraScaling : 0

      // Boost
      x.BASIC_BOOST += (r.enemySlowed) ? 0.40 : 0
      x.RES_PEN += (r.talentPenBuff) ? extraPenValue : 0

      return x
    },
    calculateBaseMultis: (c) => {
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
    }
  }
}

function clara(e) {
  const ultDmgReductionValue = ult(e, 0.25, 0.27)
  const ultFuaExtraScaling = ult(e, 1.60, 1.728)

  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 1.20, 1.32)
  const fuaScaling = talent(e, 1.60, 1.76)

  const hitMultiByTargetsBlast = {
    1: ASHBLAZING_ATK_STACK * (1 * 1 / 1),
    3: ASHBLAZING_ATK_STACK * (2 * 1 / 1),
    5: ASHBLAZING_ATK_STACK * (2 * 1 / 1) // Clara is 1 hit blast when enhanced
  }

  const hitMultiSingle = ASHBLAZING_ATK_STACK * (1 * 1 / 1)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='ultBuff' text='Ult buff' />
        <FormSwitch name='talentEnemyMarked' text='Enemy marked' />
        <FormSwitch name='e2UltAtkBuff' text='E2 ult ATK buff' disabled={e < 2} />
        <FormSwitch name='e4DmgReductionBuff' text='E4 dmg reduction buff' disabled={e < 4} />
      </Flex>
    ),
    defaults: () => ({
      ultBuff: true,
      talentEnemyMarked: true,
      e2UltAtkBuff: true,
      e4DmgReductionBuff: true,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.ATK_P] += (e >= 2 && r.e2UltAtkBuff) ? 0.30 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      // x.SKILL_SCALING += r.talentEnemyMarked ?
      x.FUA_SCALING += fuaScaling
      x.FUA_SCALING += r.ultBuff ? ultFuaExtraScaling : 0

      // Boost
      x.DMG_RED_MULTI *= (1 - 0.10)
      x.DMG_RED_MULTI *= r.ultBuff ? (1 - ultDmgReductionValue) : 1
      x.DMG_RED_MULTI *= (e >= 4 && r.e4DmgReductionBuff) ? (1 - 0.30) : 1
      x.FUA_BOOST += 0.30

      return x
    },
    calculateBaseMultis: (c, request) => {
      const r = request.characterConditionals
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]

      // Calc ashblazing: ult buff -> blast, unbuffed -> single
      if (r.ultBuff) {
        const { ashblazingMulti, ashblazingAtk } = calculateAshblazingSet(c, request, hitMultiByTargetsBlast[request.enemyCount])
        x.FUA_DMG += x.FUA_SCALING * (x[Stats.ATK] - ashblazingAtk + ashblazingMulti)
      } else {
        const { ashblazingMulti, ashblazingAtk } = calculateAshblazingSet(c, request, hitMultiSingle)
        x.FUA_DMG += x.FUA_SCALING * (x[Stats.ATK] - ashblazingAtk + ashblazingMulti)
      }
    }
  }
}

function bronya(e) {
  const skillDmgBoostValue = skill(e, 0.66, 0.726)
  const ultAtkBoostValue = ult(e, 0.55, 0.594)
  const ultCdBoostValue = ult(e, 0.16, 0.168)
  const ultCdBoostBaseValue = ult(e, 0.20, 0.216)

  const basicScaling = basic(e, 1.0, 1.1)
  const fuaScaling = basicScaling * 0.80

  const hitMulti = ASHBLAZING_ATK_STACK * (1 * 1 / 1)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='techniqueBuff' text='Technique buff' />
        <FormSwitch name='battleStartDefBuff' text='Battle start DEF buff' />
        <FormSwitch name='skillBuff' text='Skill buff' />
        <FormSwitch name='ultBuff' text='Ult buff' />
        <FormSwitch name='e2SkillSpdBuff' text='E2 skill SPD buff' disabled={e < 2} />
      </Flex>
    ),
    defaults: () => ({
      techniqueBuff: true,
      battleStartDefBuff: true,
      skillBuff: true,
      ultBuff: true,
      e2SkillSpdBuff: false,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.DEF_P] += (r.battleStartDefBuff) ? 0.20 : 0
      x[Stats.SPD_P] += (r.e2SkillSpdBuff) ? 0.30 : 0
      x[Stats.ATK_P] += (r.techniqueBuff) ? 0.15 : 0
      x[Stats.ATK_P] += (r.ultBuff) ? ultAtkBoostValue : 0
      x.BASIC_CR_BOOST += 1.00

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.FUA_SCALING += (e >= 4) ? fuaScaling : 0

      // Boost
      x.ELEMENTAL_DMG += 0.10
      x.ELEMENTAL_DMG += (r.skillBuff) ? skillDmgBoostValue : 0

      return x
    },
    calculateBaseMultis: (c, request) => {
      const r = request.characterConditionals
      const x = c.x

      // Order matters?
      x[Stats.CD] += (r.ultBuff) ? ultCdBoostValue * x[Stats.CD] : 0
      x[Stats.CD] += (r.ultBuff) ? ultCdBoostBaseValue : 0

      const { ashblazingMulti, ashblazingAtk } = calculateAshblazingSet(c, request, hitMulti)

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.FUA_DMG += x.FUA_SCALING * (x[Stats.ATK] - ashblazingAtk + ashblazingMulti)
    }
  }
}

function blade(e) {
  const enhancedStateDmgBoost = skill(e, 0.40, 0.456)
  const hpPercentLostTotalMax = 0.90

  const basicScaling = basic(e, 1.0, 1.1)
  const basicEnhancedAtkScaling = skill(e, 0.40, 0.44)
  const basicEnhancedHpScaling = skill(e, 1.00, 1.10)
  const ultAtkScaling = ult(e, 0.40, 0.432)
  const ultHpScaling = ult(e, 1.00, 1.08)
  const ultLostHpScaling = ult(e, 1.00, 1.08)
  const fuaAtkScaling = talent(e, 0.44, 0.484)
  const fuaHpScaling = talent(e, 1.10, 1.21)

  const hitMultiByTargets = {
    1: ASHBLAZING_ATK_STACK * (1 * 0.33 + 2 * 0.33 + 3 * 0.34),
    3: ASHBLAZING_ATK_STACK * (2 * 0.33 + 5 * 0.33 + 8 * 0.34),
    5: ASHBLAZING_ATK_STACK * (3 * 0.33 + 8 * 0.33 + 8 * 0.34),
  }

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='enhancedStateActive' text='Enhanced state' />
        <FormSlider name='hpPercentLostTotal' text='HP% lost total' min={0} max={hpPercentLostTotalMax} percent />
        <FormSlider name='e4MaxHpIncreaseStacks' text='E4 max HP stacks' min={0} max={2} disabled={e < 4} />
      </Flex>
    ),
    defaults: () => ({
      enhancedStateActive: true,
      hpPercentLostTotal: hpPercentLostTotalMax,
      e4MaxHpIncreaseStacks: 2,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.CR] += (e >= 2 && r.enhancedStateActive) ? 0.15 : 0
      x[Stats.HP_P] += (e >= 4) ? r.e4MaxHpIncreaseStacks * 0.20 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      // Rest of the scalings are calculated dynamically

      // Boost
      x.ELEMENTAL_DMG += r.enhancedStateActive ? enhancedStateDmgBoost : 0
      x.FUA_BOOST += 0.20

      return x
    },
    calculateBaseMultis: (c, request) => {
      const r = request.characterConditionals
      const x = c.x

      if (r.enhancedStateActive) {
        x.BASIC_DMG += basicEnhancedAtkScaling * x[Stats.ATK]
        x.BASIC_DMG += basicEnhancedHpScaling * x[Stats.HP]
      } else {
        x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      }

      x.ULT_DMG += ultAtkScaling * x[Stats.ATK]
      x.ULT_DMG += ultHpScaling * x[Stats.HP]
      x.ULT_DMG += ultLostHpScaling * r.hpPercentLostTotal * x[Stats.HP]
      x.ULT_DMG += (e >= 1 && request.enemyCount == 1) ? 1.50 * r.hpPercentLostTotal * x[Stats.HP] : 0

      const hitMulti = hitMultiByTargets[request.enemyCount]
      const { ashblazingMulti, ashblazingAtk } = calculateAshblazingSet(c, request, hitMulti)
      x.FUA_DMG += fuaAtkScaling * (x[Stats.ATK] - ashblazingAtk + ashblazingMulti)

      x.FUA_DMG += fuaHpScaling * x[Stats.HP]
      x.FUA_DMG += (e >= 6) ? 0.50 * x[Stats.HP] : 0
    }
  }
}

function bailu(e) {
  const basicScaling = basic(e, 1.0, 1.1)
  const skillScaling = skill(e, 0, 0)
  const ultScaling = ult(e, 0, 0)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='healingMaxHpBuff' text='Healing max HP buff' />
        <FormSwitch name='talentDmgReductionBuff' text='Talent dmg reduced' />
        <FormSwitch name='e2UltHealingBuff' text='E2 ult heal buff' disabled={e < 2} />
        <FormSlider name='e4SkillHealingDmgBuffStacks' text='E4 dmg buff stacks' min={0} max={3} disabled={e < 4} />
      </Flex>
    ),
    defaults: () => ({
      healingMaxHpBuff: true,
      talentDmgReductionBuff: true,
      e2UltHealingBuff: true,
      e4SkillHealingDmgBuffStacks: 0,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.HP_P] += (r.healingMaxHpBuff) ? 0.10 : 0
      x[Stats.OHB] += (e >= 2 && r.e2UltHealingBuff) ? 0.15 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      // Boost
      x.DMG_RED_MULTI *= (r.talentDmgReductionBuff) ? (1 - 0.10) : 1
      x.ALL_DMG_MULTI += (e >= 4) ? r.e4SkillHealingDmgBuffStacks * 0.10 : 0

      return x
    },
    calculateBaseMultis: (c) => {
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += 0
      x.ULT_DMG += 0
      x.FUA_DMG += 0
    }
  }
}

function asta(e) {
  const ultSpdBuffValue = ult(e, 50, 52.8)
  const talentStacksAtkBuff = talent(e, 0.14, 0.154)
  const talentStacksDefBuff = 0.06
  const skillExtraDmgHitsMax = (e >= 1) ? 5 : 4

  const basicScaling = basic(e, 1.0, 1.1)
  const skillScaling = skill(e, 0.50, 0.55)
  const ultScaling = ult(e, 0, 0)
  const dotScaling = basic(e, 0.50, 0.55)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSlider name='skillExtraDmgHits' text='Skill extra hits' min={0} max={skillExtraDmgHitsMax} />
        <FormSlider name='talentBuffStacks' text='Talent ATK buff stacks' min={0} max={5} />
        <FormSwitch name='ultSpdBuff' text='Ult SPD buff active' />
      </Flex>
    ),
    defaults: () => ({
      talentBuffStacks: 5,
      skillExtraDmgHits: skillExtraDmgHitsMax,
      ultSpdBuff: true
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.ATK_P] += (r.talentBuffStacks) * talentStacksAtkBuff
      x[Stats.DEF_P] += (r.talentBuffStacks) * talentStacksDefBuff
      x[Stats.ERR] += (e >= 4 && r.talentBuffStacks >= 2) ? 0.15 : 0
      x[Stats.SPD] += (r.ultSpdBuff) ? ultSpdBuffValue : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling
      x.DOT_SCALING += dotScaling

      // Boost
      x.ELEMENTAL_DMG += 0.18

      return x
    },
    calculateBaseMultis: (c) => {
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += 0
      x.DOT_DMG += x.DOT_SCALING * x[Stats.ATK]
    }
  }
}

function arlan(e) {
  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 2.40, 2.64)
  const ultScaling = ult(e, 3.20, 3.456)

  const talentMissingHpDmgBoostMax = talent(e, 0.72, 0.792)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSlider name='selfCurrentHpPercent' text='Self current HP%' min={0.01} max={1.0} percent />
      </Flex>
    ),
    defaults: () => ({
      selfCurrentHpPercent: 1.00,
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x.ELEMENTAL_DMG += Math.min(talentMissingHpDmgBoostMax, 1 - r.selfCurrentHpPercent)

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      // Boost
      x.SKILL_BOOST += (e >= 1 && r.selfCurrentHpPercent <= 0.50) ? 0.10 : 0
      x.ULT_BOOST += (e >= 6 && r.selfCurrentHpPercent <= 0.50) ? 0.20 : 0

      return x
    },
    calculateBaseMultis: (c) => {
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      x.FUA_DMG += 0
    }
  }
}

function argenti(e) {
  const talentMaxStacks = (e >= 4) ? 12 : 10

  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 1.20, 1.32)
  const ultScaling = ult(e, 1.60, 1.728)
  const ultEnhancedScaling = ult(e, 2.80, 3.024)
  const ultEnhancedExtraHitScaling = ult(e, 0.95, 1.026)
  const talentCrStackValue = talent(e, 0.025, 0.028)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='ultEnhanced' text='Enhanced ult' />
        <FormSlider name='talentStacks' text='Talent stacks' min={0} max={talentMaxStacks} />
        <FormSlider name='ultEnhancedExtraHits' text='Ult extra hits' min={0} max={6} />
        <FormSwitch name='e2UltAtkBuff' text='E2 ult ATK buff' disabled={e < 2} />
      </Flex>
    ),
    defaults: () => ({
      ultEnhanced: true,
      talentStacks: talentMaxStacks,
      ultEnhancedExtraHits: 6,
      e2UltAtkBuff: true
    }),
    precomputeEffects: (request) => {
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      // Skills
      x[Stats.CR] += (r.talentStacks) * talentCrStackValue

      // Traces

      // Eidolons
      x[Stats.CD] += (e >= 1) ? (r.talentStacks) * 0.04 : 0
      x[Stats.ATK_P] += (e >= 2 && r.e2UltAtkBuff) ? 0.40 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += (r.ultEnhanced) ? ultEnhancedScaling : ultScaling
      x.ULT_SCALING += (r.ultEnhancedExtraHits) * ultEnhancedExtraHitScaling

      // BOOST
      x.ULT_BOOST += (request.enemyHpPercent <= 0.5) ? 0.15 : 0
      x.ULT_DEF_PEN += (e >= 6) ? 0.30 : 0

      return x
    },
    calculateBaseMultis: (c) => {
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      x.FUA_DMG += 0
    }
  }
}

function blackswan(e) {
  const arcanaStackMultiplier = talent(e, 0.12, 0.132)
  const stack3ArcanaBlastDmg = talent(e, 1.80, 1.98)
  const epiphanyDmgTakenBoost = ult(e, 0.25, 0.27)
  const defShredValue = skill(e, 0.208, 0.22)

  const basicScaling = basic(e, 0.60, 0.66)
  const skillScaling = skill(e, 0.90, 0.99)
  const ultScaling = ult(e, 1.20, 1.30)
  const dotScaling = talent(e, 2.40, 2.64)


  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='epiphanyDebuff' text='Epiphany debuff' />
        <FormSwitch name='defDecreaseDebuff' text='Def decrease debuff' />
        <FormSlider name='arcanaStacks' text='Arcana stacks' min={0} max={50} />
        <FormSwitch name='e1ResReduction' text='E1 RES reduction' disabled={e < 1} />
      </Flex>
    ),
    defaults: () => ({
      epiphanyDebuff: true,
      defDecreaseDebuff: true,
      arcanaStacks: 7,
      e1ResReduction: true
    }),
    precomputeEffects: (request) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling
      x.DOT_SCALING += dotScaling + arcanaStackMultiplier * r.arcanaStacks
      x.DOT_SCALING += (r.arcanaStacks >= 3) ? stack3ArcanaBlastDmg : 0

      x.DOT_DEF_PEN += (r.arcanaStacks >= 7) ? 0.20 : 0
      x.DEF_SHRED += (r.defDecreaseDebuff) ? defShredValue : 0
      x.DOT_VULNERABILITY += (r.epiphanyDebuff) ? epiphanyDmgTakenBoost : 0

      x.RES_PEN += (e >= 1 && r.e1ResReduction) ? 0.25 : 0

      return x
    },
    calculateBaseMultis: (c) => {
      const x = c.x

      x.ELEMENTAL_DMG += Math.min(0.72, 0.60 * x[Stats.EHR])

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      x.DOT_DMG += x.DOT_SCALING * x[Stats.ATK]
    }
  }
}

function sparkle(e) {
  const skillCdBuffScaling = skill(e, 0.24, 0.264)
  const skillCdBuffBase = skill(e, 0.45, 0.486)
  const cipherTalentStackBoost = ult(e, 0.10, 0.108)
  const talentBaseStackBoost = ult(e, 0.06, 0.066)

  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 0, 0)
  const ultScaling = ult(e, 0, 0)

  const atkBoostByQuantumAllies = {
    0: 0,
    1: 0.05,
    2: 0.15,
    3: 0.30,
  }

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='skillCdBuff' text='Skill CD buff' />
        <FormSwitch name='cipherBuff' text='Cipher buff' />
        <FormSlider name='talentStacks' text='Talent DMG stacks' min={0} max={3} />
        <FormSlider name='quantumAllies' text='Quantum allies' min={0} max={3} />
      </Flex>
    ),
    defaults: () => ({
      skillCdBuff: true,
      cipherBuff: true,
      talentStacks: 3,
      quantumAllies: 3,
    }),
    precomputeEffects: (request) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      x[Stats.ATK_P] += 0.15 + (atkBoostByQuantumAllies[r.quantumAllies] || 0)
      x[Stats.ATK_P] += (e >= 1 && r.cipherBuff) ? 0.40 : 0

      x.ELEMENTAL_DMG += (r.cipherBuff) ? r.talentStacks * (talentBaseStackBoost + cipherTalentStackBoost) : r.talentStacks * talentBaseStackBoost
      x.DEF_SHRED += (e >= 2) ? 0.08 * r.talentStacks : 0

      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      return x
    },
    calculateBaseMultis: (c, request) => {
      const r = request.characterConditionals
      const x = c.x

      x[Stats.CD] += (r.skillCdBuff) ? skillCdBuffBase + skillCdBuffScaling * x[Stats.CD] : 0
      x[Stats.CD] += (e >= 6 && r.skillCdBuff) ? 0.30 * x[Stats.CD] : 0

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
    }
  }
}

function misha(e) {
  const basicScaling = basic(e, 1.00, 1.10)
  const skillScaling = skill(e, 2.00, 2.20)
  let ultStackScaling = ult(e, 0.60, 0.65)
  ultStackScaling += (e >= 4 ? 0.06 : 0)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSlider name='ultHitsOnTarget' text='Ult hits on target' min={1} max={10} />
        <FormSwitch name='enemyFrozen' text='Enemy frozen' />
        <FormSwitch name='e2DefReduction' text='E2 def reduction' disabled={e < 2} />
        <FormSwitch name='e6UltDmgBoost' text='E6 ult dmg boost' disabled={e < 6} />
      </Flex>
    ),
    defaults: () => ({
      ultHitsOnTarget: 10,
      enemyFrozen: true,
      e2DefReduction: true,
      e6UltDmgBoost: true,
    }),
    precomputeEffects: (request) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const r = request.characterConditionals
      const x = Object.assign({}, baseComputedStatsObject)

      x[Stats.CD] += (r.enemyFrozen) ? 0.30 : 0

      x.DEF_SHRED += (e >= 2 && r.e2DefReduction) ? 0.16 : 0
      x.ELEMENTAL_DMG += (e >= 6 && r.e6UltDmgBoost) ? 0.30 : 0

      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultStackScaling * (r.ultHitsOnTarget)

      return x
    },
    calculateBaseMultis: (c) => {
      const x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
    }
  }
}










export const CharacterConditionals = {
  get: (request) => {
    const characterFn = characterOptionMapping[request.characterId]
    return characterFn(request.characterEidolon)
  },

  getDisplayCharacterPassives: (id, eidolon) => {
    if (!id || !characterOptionMapping[id]) {
      return (
        <Flex justify='space-between' align='center'>
          <HeaderText>Character passives</HeaderText>
          <TooltipImage type={Hint.characterPassives()} />
        </Flex>
      )
    }

    const characterFn = characterOptionMapping[id]
    const display = characterFn(eidolon).display();

    return (
      <Flex vertical gap={5} >
        <Flex justify='space-between' align='center'>
          <HeaderText>Character passives</HeaderText>
          <TooltipImage type={Hint.characterPassives()} />
        </Flex>
        {display}
      </Flex>
    )
  },
}