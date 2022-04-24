import Anakaris_Icon  from "@Root/assets/icons/Anak_Icon.png"
import Aulbath_Icon   from "@Root/assets/icons/Aulbath_Icon.png"
import Bishamon_Icon  from "@Root/assets/icons/Bishamon_Icon.png"
import Bulleta_Icon   from "@Root/assets/icons/Bulleta_Icon.png"
import Demitri_Icon   from "@Root/assets/icons/Demitri_Icon.png"
import Felicia_Icon   from "@Root/assets/icons/Felicia_Icon.png"
import Gallon_Icon    from "@Root/assets/icons/Gallon_Icon.png"
import Jedah_Icon     from "@Root/assets/icons/Jedah_Icon.png"
import LeiLei_Icon    from "@Root/assets/icons/LeiLei_Icon.png"
import Lillith_Icon   from "@Root/assets/icons/Lillith_Icon.png"
import Morrigan_Icon  from "@Root/assets/icons/Morrigan_Icon.png"
import Sasquatch_Icon from "@Root/assets/icons/Sasquatch_Icon.png"
import Victor_Icon    from "@Root/assets/icons/Victor_Icon.png"
import QBee_Icon      from "@Root/assets/icons/QBee_Icon.png"
import Zabel_Icon     from "@Root/assets/icons/Zabel_Icon.png"

export enum CharNamesEnum {
  AN = "AN",
  AU = "AU",
  BI = "BI",
  BU = "BU",
  DE = "DE",
  FE = "FE",
  GA = "GA",
  JE = "JE",
  LE = "LE",
  LI = "LI",
  MO = "MO",
  SA = "SA",
  VI = "VI",
  QB = "QB",
  ZA = "ZA",
}

export const CharShortNameToFullName:Record<string, string> = {
  ["AN"] : "Anakaris",
  ["AU"] : "Aulbath",
  ["BI"] : "Bishamon",
  ["BU"] : "Bulleta",
  ["DE"] : "Demitri",
  ["FE"] : "Felicia",
  ["GA"] : "Gallon",
  ["JE"] : "Jedah",
  ["LE"] : "Lei-Lei",
  ["LI"] : "Lillith",
  ["MO"] : "Morrigan",
  ["SA"] : "Sasquatch",
  ["VI"] : "Victor",
  ["QB"] : "Q-Bee",
  ["ZA"] : "Zabel",
}
export type CharShortName = keyof typeof CharShortNameToFullName
export type CharFullName = keyof typeof CharFullNameToShortName

export const CharFullNameToShortName:Record<string, string> = {
  ["Anakaris" ] : "AN",
  ["Aulbath"  ] : "AU",
  ["Bishamon" ] : "BI",
  ["Bulleta"  ] : "BU",
  ["Demitri"  ] : "DE",
  ["Felicia"  ] : "FE",
  ["Gallon"   ] : "GA",
  ["Jedah"    ] : "JE",
  ["Lei-Lei"  ] : "LE",
  ["Lillith"  ] : "LI",
  ["Morrigan" ] : "MO",
  ["Sasquatch"] : "SA",
  ["Victor"   ] : "VI",
  ["Q-Bee"    ] : "QB",
  ["Zabel"    ] : "ZA",
}
export const CharNamesEnumDisplay: { [index: string]: string } = {
  [CharNamesEnum.AN] : "Anakaris",
  [CharNamesEnum.AU] : "Aulbath",
  [CharNamesEnum.BI] : "Bishamon",
  [CharNamesEnum.BU] : "Bulleta",
  [CharNamesEnum.DE] : "Demitri",
  [CharNamesEnum.FE] : "Felicia",
  [CharNamesEnum.GA] : "Gallon",
  [CharNamesEnum.JE] : "Jedah",
  [CharNamesEnum.LE] : "Lei-Lei",
  [CharNamesEnum.LI] : "Lillith",
  [CharNamesEnum.MO] : "Morrigan",
  [CharNamesEnum.SA] : "Sasquatch",
  [CharNamesEnum.VI] : "Victor",
  [CharNamesEnum.QB] : "Q-Bee",
  [CharNamesEnum.ZA] : "Zabel",
};
export const CharFullNameToIcon:Record<string, string> = {
  ["Anakaris" ] : Anakaris_Icon,
  ["Aulbath"  ] : Aulbath_Icon,
  ["Bishamon" ] : Bishamon_Icon,
  ["Bulleta"  ] : Bulleta_Icon,
  ["Demitri"  ] : Demitri_Icon,
  ["Felicia"  ] : Felicia_Icon,
  ["Gallon"   ] : Gallon_Icon,
  ["Jedah"    ] : Jedah_Icon,
  ["Lei-Lei"  ] : LeiLei_Icon,
  ["Lillith"  ] : Lillith_Icon,
  ["Morrigan" ] : Morrigan_Icon,
  ["Sasquatch"] : Sasquatch_Icon,
  ["Victor"   ] : Victor_Icon,
  ["Q-Bee"    ] : QBee_Icon,
  ["Zabel"    ] : Zabel_Icon,
}
