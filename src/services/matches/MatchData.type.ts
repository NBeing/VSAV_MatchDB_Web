import { CharShortName } from "@CommonEnums/charNames.enum";
import { MatchLinkTypeShortName } from "@CommonEnums/matchLinkType.enum";

export default interface IMatchData {
  id?: any | null,
  type: MatchLinkTypeShortName,
  url: string,
  p1_char: CharShortName,
  p2_char: CharShortName,
  p1_name?: string,
  p2_name?: string,
  winning_char: CharShortName,
  // YT Data  
  video_title?: string,
  timestamp: number,
  uploader?: string,
  date_uploaded?: string
}