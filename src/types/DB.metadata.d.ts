import { CharacterId, MetadataCharacter } from "./Character";
import { AssetRelativeUrl, HoyoverseId, Promotion } from "./Common";
import { } from "./DB";
import { LightCone } from "./LightCone";

export type RelicProperty =
  'AttackAddedRatio' |
  'AttackDelta' |
  'BreakDamageAddedRatioBase' |
  'CriticalDamageBase' |
  'CriticalChanceBase' |
  'DefenceAddedRatio' |
  'DefenceDelta' |
  'StatusProbabilityBase' |
  'SPRatioBase' |
  'FireAddedRatio' |
  'HPAddedRatio' |
  'HPDelta' |
  'IceAddedRatio' |
  'ImaginaryAddedRatio' |
  'ThunderAddedRatio' |
  'HealRatioBase' |
  'PhysicalAddedRatio' |
  'QuantumAddedRatio' |
  'StatusResistanceBase' |
  'SpeedDelta' |
  'WindAddedRatio';

export type RelicAffix = {
  affix_id: HoyoverseId;
  property: RelicProperty;
  base: number;
  step: number;
  step_num?: number;
};

export type Metadata = {
  characters: { [key: CharacterId]: MetadataCharacter };
  characterPromotions?: { [key: CharacterId]: Promotion };
  lightCones: { [key: number]: LightCone };
  relicMainAffixess: {
    [ID: HoyoverseId]: {
      id: HoyoverseId;
      affixes: {
        [ID: HoyoverseId]: RelicAffix
      };
    };
  };
  relicSubAffixes: {
    [ID: HoyoverseId]: {
      id: HoyoverseId;
      affixes: {
        [ID: HoyoverseId]: RelicAffix
      };
    };
  };
  relicSets: {
    [ID: HoyoverseId]: {
      id: HoyoverseId;
      name: string;
      desc: string[];
      icon: AssetRelativeUrl
      properties: [{
        type: RelicProperty;
        value: number;
      }][]
    };
  };
};