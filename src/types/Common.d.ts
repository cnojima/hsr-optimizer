export type GUID = string; // TODO: match to GUID format
export type CharacterId = string; // "1004"
export type HoyoverseId = number; // 600015194
export type Rarity = 1 | 2 | 3 | 4 | 5;
export type AssetRelativeUrl = string;

export type PathMap = {
  'Warrior': 'Destruction',
  'Warlock': 'Nihility',
  'Knight': 'Preservation',
  'Priest': 'Abundance',
  'Rogue': 'Hunt',
  'Shaman': 'Harmony',
  'Mage': 'Erudition',
}
export type InternalPath = keyof PathMap;
export type ExternalPath = PathMap[InternalPath];

export type Element =
  'Fire' |
  'Ice' |
  'Imaginary' |
  'Physical' |
  'Quantum' |
  'Thunder' |
  'Wind';


export type Promotion = {
  "HP": number;
  "ATK": number;
  "CRIT Rate": number;
  "CRIT DMG": number;
  "DEF": number;
  "SPD": number;
};

export type Promotions = {
  [level: number]: Promotion;
};