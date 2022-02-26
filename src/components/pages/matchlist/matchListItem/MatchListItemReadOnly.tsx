import React from 'react'
import { CharNamesEnumDisplay } from '@Common/enums/charNames.enum';
import { MatchLinkTypeEnumDisplay } from '@Common/enums/matchLinkType.enum';
import {createUseStyles, useTheme} from 'react-jss'
import  type {CustomTheme} from '@Theme/Theme'
import IMatchData from '@MatchService/MatchData.type'

type RuleNames = 
  'title'         |
  'link'          |
  'p1_char'       |
  'p2_char'       |
  'p1_name'       |
  'p2_name'       |
  'winning_char'  |
  // YT Data 
  'video_title'   |
  'timestamp'     |
  'uploader'      |
  'date_uploaded'

interface MatchListItemReadOnlyProps {
  match: IMatchData,
  key: number
}
const useStyles = createUseStyles<RuleNames, MatchListItemReadOnlyProps, CustomTheme>({
  title: ({theme}) => ({
    background: theme.background || 'black'
  }),
  link:  {},
  p1_char: {},
  p2_char: {},
  p1_name: {},
  p2_name: {},
  winning_char: {},
  // YT Data  
  video_title: {},
  timestamp: {},
  uploader: {},
  date_uploaded: {},
})

export function MatchListItemReadOnly(
  {...props} : MatchListItemReadOnlyProps
){
  const { match, key } = props
  const theme:CustomTheme = useTheme<CustomTheme>()
  const classes = useStyles({...props, theme})

  return (
    <ul key={key}>
      <li className={classes.title}>
        Type: {MatchLinkTypeEnumDisplay[match.type]}
      </li>
      <li className={classes.link}>
        Link: {match.url}
      </li>
      <li className={classes.p1_char}>
        Player 1: {CharNamesEnumDisplay[match.p1_char]}
      </li>
      <li className={ classes.p2_char}>
        Player 2: {CharNamesEnumDisplay[match.p2_char]}
      </li>
      <li className={ classes.winning_char}>
        Winning Character: {match.winning_char}
      </li>
      <li className={ classes.p1_name}>
        Player 1 Name: {match.p1_name}
      </li>
      <li className={ classes.p2_name}>
        Player 2 Name: {match.p2_name}
      </li>
      <li className={ classes.timestamp}>
        Timestamp: {match.timestamp}
      </li>
      <li className={ classes.date_uploaded}>
        Date Uploaded: {match.date_uploaded}
      </li>
      <li className={ classes.video_title}>
        Video Title: {match.video_title}
      </li>
      <li className={ classes.uploader}>
        Uploaded By: {match.uploader}
      </li>
    </ul>
  )
}
