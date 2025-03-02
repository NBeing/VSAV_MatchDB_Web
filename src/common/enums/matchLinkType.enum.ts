export enum MatchLinkTypeEnum {
    VI = 'VI',
    FC2 = 'FC2'
}

export const MatchLinkTypeEnumDisplay: { [index: string]: string } = {
    [MatchLinkTypeEnum.VI]  : 'Video',
    [MatchLinkTypeEnum.FC2] : 'Fightcade2'
}

export const MatchLinkTypeShortNameToFullName:Record<string, string> = {
    ["VI"]  : "Youtube",
    ["FC2"] : "Fightcade 2",
  }
  export type MatchLinkTypeShortName = keyof typeof MatchLinkTypeShortNameToFullName
  export type MatchLinkTypeFullName = keyof typeof MatchLinkTypeFullNameToShortName
  
  export const MatchLinkTypeFullNameToShortName:Record<string, string> = {
    ["Youtube"] : "VI",
    ["Fightcade 2"]   : "FC2",
  }