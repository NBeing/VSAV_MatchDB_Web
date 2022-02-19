import { CharNamesEnum } from "@CommonEnums/charNames.enum";
import { MatchLinkTypeEnum } from "@CommonEnums/matchLinkType.enum";

export default interface IMatchData {
  id?: any | null,
  type: MatchLinkTypeEnum,
  url: string,
  p1_char: CharNamesEnum,
  p2_char: CharNamesEnum,
  p1_name?: string,
  p2_name?: string,
  winning_char: CharNamesEnum,
  // YT Data  
  video_title?: string,
  timestamp: number,
  uploader?: string,
  date_uploaded?: string
}