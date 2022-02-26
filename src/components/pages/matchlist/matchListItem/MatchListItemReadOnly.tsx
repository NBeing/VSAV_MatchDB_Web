import React from 'react'
import { CharNamesEnumDisplay } from '@Common/enums/charNames.enum';
import { MatchLinkTypeEnumDisplay } from '@Common/enums/matchLinkType.enum';
import PropTypes from 'prop-types'
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
  title: {},
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

export function MatchListItemReadOnly({...props}){
  const { match, id } = props
  const classes = useStyles()
  return (
    <ul key={id}>
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
MatchListItemReadOnly.propTypes = {
  id: PropTypes.string,
  match: PropTypes.object
}
