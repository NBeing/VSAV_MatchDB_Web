import MatchInfoService from "@MatchService/MatchInfo.service";
import React, { ChangeEvent, useState } from "react";
import IMatchData from "@MatchService/MatchData.type";
import { CharNamesEnum, CharNamesEnumDisplay } from "@Common/enums/charNames.enum";
import { MatchLinkTypeEnum, MatchLinkTypeEnumDisplay } from "@Common/enums/matchLinkType.enum";

import { createUseStyles, useTheme } from 'react-jss'
import type { CustomTheme } from '@Theme/Theme'

type RuleNames =
  'title' |
  'textInput' |
  'description' |
  'container' |
  'form' |
  'select'

interface AddMatchProps { }

const useStyles = createUseStyles<RuleNames, AddMatchProps, CustomTheme>({
  title: ({ theme }) => ({
    background: theme.background || 'black'
  }),
  textInput: {
    color: "white",
    // alignSelf: "flex-start",
    // '& input':{
    //   alignSelf: "stretch",
    // } 
  },
  select: {},
  description: {},
  container: ({ theme }) => ({
    backgroundColor: 'black' || theme.background,
  }),
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  }
})

enum NoneOption { NA = "NA" }
const NoneOptionDisplay = {[NoneOption.NA] : "None Selected"} 

type CharNamesOptions = CharNamesEnum | NoneOption
const CharNamesOptions = { ...NoneOption, ...CharNamesEnum }

const CharNamesDisplayOptions = { ...NoneOptionDisplay, ...CharNamesEnumDisplay, }

console.log(CharNamesDisplayOptions)
export const AddMatch: React.FC = ({ ...props }: AddMatchProps) => {
  const theme: CustomTheme = useTheme<CustomTheme>()
  const classes = useStyles({ ...props, theme })

  // Required Fields
  const [contentType, setContentType] = useState(MatchLinkTypeEnum.VI)
  const [url, setUrl] = useState('');
  const [timestamp, setTimestamp] = useState(0);
  const [char1, setChar1] = useState<CharNamesOptions>(CharNamesOptions.NA)
  const [char2, setChar2] = useState<CharNamesOptions>(CharNamesOptions.NA)
  const [winningChar, setWinningChar] = useState<CharNamesOptions>(CharNamesOptions['NA'])

  // Optional Fields
  const [p1Name, setp1Name] = useState('');
  const [p2Name, setp2Name] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [uploader, setUploader] = useState('');
  const [dateUploaded, setDateUploaded] = useState('');

  const handleContentTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setContentType(MatchLinkTypeEnum[e.target.value as MatchLinkTypeEnum])
  }

  const handleChar1Change = (e: ChangeEvent<HTMLSelectElement>) => {
    setChar1(CharNamesEnum[e.target.value as CharNamesEnum])
  }

  const handleChar2Change = (e: ChangeEvent<HTMLSelectElement>) => {
    setChar2(CharNamesEnum[e.target.value as CharNamesEnum])
  }

  const handleWinningCharChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setWinningChar(CharNamesEnum[e.target.value as CharNamesEnum])
  }

  const charOptions = Object.keys(CharNamesOptions)
    .map(key => (
      <option key={key} value={key}>
        {CharNamesDisplayOptions[key]}
      </option>
    ))

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    console.log("Submit!", event)
    const formData: IMatchData = {
      type: contentType as MatchLinkTypeEnum,
      url,
      p1_char: char1 as CharNamesEnum,
      p2_char: char2 as CharNamesEnum,
      p1_name: p1Name,
      p2_name: p2Name,
      winning_char: winningChar as CharNamesEnum,
      timestamp: timestamp,
      // YT Data  
      video_title: videoTitle,
      uploader: uploader,
      date_uploaded: dateUploaded
    }
    console.log(formData);
    await MatchInfoService.create(formData)
  }

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={onSubmit}>

        <select
          onChange={e => handleContentTypeChange(e)}
          className="browser-default custom-select" >
          {
            Object.keys(MatchLinkTypeEnumDisplay).map(key => {
              return <option key={key} value={key}>{MatchLinkTypeEnumDisplay[key]}</option>
            })
          }
        </select >
        <label className={classes.textInput}>
          URL
          <input value={url} onChange={e => setUrl(e.target.value)} type="text" />
        </label>
        <label className={classes.textInput}>
          Timestamp
          <input value={timestamp} onChange={e => setTimestamp(parseInt(e.target.value))} type="number" />
        </label>

        <select
          onChange={e => handleChar1Change(e)}
          className={classes.select}>
          {charOptions}
        </select>

        <select
          onChange={e => handleChar2Change(e)}
          className={classes.select}>
          {charOptions}
        </select>

        <select
          onChange={e => handleWinningCharChange(e)}
          className={classes.select}>
          {charOptions}
        </select>


        <label className={classes.textInput}>
          Player 1 Gamertag
          <input value={p1Name} onChange={e => setp1Name(e.target.value)} type="text" />
        </label>
        <label className={classes.textInput}>
          Player 2 Gamertag
          <input value={p2Name} onChange={e => setp2Name(e.target.value)} type="text" />
        </label>

        <label className={classes.textInput}>
          Video Title
          <input value={videoTitle} onChange={e => setVideoTitle(e.target.value)} type="text" />
        </label>
        <label className={classes.textInput}>
          Uploader
          <input value={uploader} onChange={e => setUploader(e.target.value)} type="text" />
        </label>
        <label className={classes.textInput}>
          Date Uploaded
          <input value={dateUploaded} onChange={e => setDateUploaded(e.target.value)} type="text" />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}