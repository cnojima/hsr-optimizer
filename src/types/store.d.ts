import { Relic, RelicEnhance } from "types/Relic";
import { RelicSet } from "./RelicSet";
import { MainStats, Parts, SubStats } from "lib/constants";
import { Character } from "./Character";
import { HoyoverseId, CharacterId } from "./Common";


type PermutationDetails = {
  [K in keyof Parts]: number;
} & {
  HeadTotal: number;
  HandsTotal: number;
  BodyTotal: number;
  FeetTotal: number;
  PlanarSphereTotal: number;
  LinkRopeTotal: number;
}

type RelicTabFilters = {
  set: RelicSet[];
  part: Parts[];
  enhance: RelicEnhance[];
  mainStats: MainStats[];
  subStats: SubStats[];
}


export interface HsrOptimizerStore {
  relicsById: { [key: string]: Relic };
  setRelicsById: (x: { [key: string]: Relic }) => void;

  characters: Character[];
  setCharacters: (x: Character[]) => void;

  charactersById: { [key: CharacterId]: Character };
  setCharactersById: (x: { [key: CharacterId]: Character }) => void;

  characterTabSelectedId: CharacterId | undefined;
  setCharacterTabSelectedId: (x: CharacterId) => void;

  characterTabBlur: boolean;
  setCharacterTabBlur: (x: boolean) => void;

  permutationDetails: {
    Head: number;
    Hands: number;
    Body: number;
    Feet: number;
    PlanarSphere: number;
    LinkRope: number;
    HeadTotal: number;
    HandsTotal: number;
    BodyTotal: number;
    FeetTotal: number;
    PlanarSphereTotal: number;
    LinkRopeTotal: number;
  };
  setPermutationDetails: (x: PermutationDetails) => void;

  permutations: number;
  setPermutations: (x: number) => void;

  permutationsSearched: number;
  setPermutationsSearched: (x: number) => void;

  permutationsResults: number;
  setPermutationsResults: (x: number) => void;

  statDisplay: string;
  setStatDisplay: (x: string) => void;

  activeKey: string;
  setActiveKey: (x: string) => void;

  scorerId: HoyoverseId | undefined;
  setScorerId: (x: HoyoverseId | undefined) => void;

  // TODO: get type definition
  scoringMetadataOverrides: Record<string, unknown>;
  setScoringMetadataOverrides: (x: any) => void;

  conditionalSetEffectsDrawerOpen: boolean;
  setConditionalSetEffectsDrawerOpen: (x: boolean) => void;

  selectedScoringCharacter: CharacterId | undefined;
  setSelectedScoringCharacter: (x: CharacterId | undefined) => void;

  selectedOptimizerCharacter: Character | undefined;
  setSelectedOptimizerCharacter: (char: Character | undefined) => void;

  relicTabFilters: {
    set: RelicSet[];
    part: Parts[];
    enhance: RelicEnhance[];
    mainStats: MainStats[];
    subStats: SubStats[];
  };
  setRelicTabFilters: (x: RelicTabFilters) => void;
}