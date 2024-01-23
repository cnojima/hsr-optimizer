import { Parts, SetsOrnaments, SetsRelics, StatsValues } from "lib/constants";
import { AssetRelativeUrl, CharacterId, Element, ExternalPath, InternalPath, Promotions, Rarity } from "types/Common";





export type Traces = {
  [key in StatsValues]: number;
};

// DB.getMetadata().characters
export type MetadataCharacter = {
  id: CharacterId;
  name: string;  // "Dan Heng"
  tag: string; // "danheng"
  rarity: Rarity;
  path: InternalPath | ExternalPath;
  element: Element;
  max_sp: number;
  icon: AssetRelativeUrl;
  preview: AssetRelativeUrl;
  portrait: AssetRelativeUrl;
  promotions: Promotions;
  traces: Traces;
  imageCenter: { x: number, y: number };
  displayName: string; // injected on hydration
  scoringMetadata: {
    stats: { [key in StatsValues]: number };
    parts: { [key in Parts]: StatsValues[] };
    relicSets: SetsRelics[],
    ornamentSets: SetsOrnaments[],
    characterId: CharacterId,
  };
};