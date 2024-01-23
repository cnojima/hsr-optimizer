import { StatsKeys, StatsValues } from "lib/constants";

import { AssetRelativeUrl, GUID, CharacterId, HoyoverseId, InternalPath, Rarity } from "types/Common";
import { Relic } from "./Relic";
import { MetadataCharacter } from "./Character";

export type Metadata = {
  characters: { [key: CharacterId]: MetadataCharacter };
  characterPromotions: { [key: CharacterId]: CharacterPromotion };
  // TODO: BUG?! this has the same object as characterPromotions
  nicknames: { [key: CharacterId]: CharacterPromotion };
  lightCones: { [key: number]: LightCone };
  relics: relics;
}

export type State = {
  relics: Relic[];
  characters: Character[];
  metadata: {};
  relicsById: { [key: GUID]: Relic };
  scorerId: HoyoverseId;
  selectedOptimizerCharacter: CharacterId;
}

export interface HsrDB {
  addCharacter: (x: any) => void;
  addFromForm: (form: any) => void;
  deleteRelic: (id: any) => void;
  equipRelic: (relic: any, characterId: any) => void;
  equipRelicIdsToCharacter: (relicIds: any, characterId: any) => void;
  getCharacterById: (id: any) => any;
  getCharacters: () => any;
  getMetadata: () => any;
  getRelicById: (id: any) => any;
  getRelics: () => any[];
  getRelicsById: () => any;
  getScoringMetadata: (id: any) => void;
  getState: () => any;
  insertCharacter: (id: any, index: any) => void;
  mergeRelicsWithState: (newRelics: any, newCharacters: any) => void;
  mergeVerifiedRelicsWithState: (newRelics: any) => void;
  refreshCharacters: () => void;
  refreshRelics: () => void;
  removeCharacter: (characterId: any) => void;
  resetStore: () => void;
  setCharacter: (x: any) => void;
  setCharacters: (x: any) => void;
  setMetadata: (x: any) => void;
  setRelic: (relic: any) => void;
  setRelics: (x: any) => void;
  setStore: (x: any) => void;
  unequipCharacter: (id: any) => void;
  unequipRelicById: (id: any) => void;
  updateCharacterScoreOverrides: (id: any, updated: any) => void;
}

type PromtionAttributes = 'atk' | 'def' | 'hp' | 'spd' | 'crit_rate' | 'crit_dmg' | 'taunt';
export type CharacterPromotion = {
  id: CharacterId;
  materials: Materials[];
  values: {
    [key in PromtionAttributes]: {
      base: number;
      step: number;
    }
  }[]
}

type Materials = {
  id: number;
  num: number;
}[];


export type LightConePromotion = {
  [key in StatsKeys]: number;
}

export type LightCone = {
  id: number;
  name: string;
  desc: string;
  path: InternalPath;
  rarity: Rarity;
  icon: AssetRelativeUrl;
  portrait: AssetRelativeUrl;
  preview: AssetRelativeUrl;
  promotions: {
    [level: number]: LightConePromotion
  };
  superimpositions: {
    [superimp: number]: {
      [key in StatsValues]: number
    }
  };
};