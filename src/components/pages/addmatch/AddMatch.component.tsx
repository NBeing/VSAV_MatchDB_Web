import MatchInfoService from "@MatchService/MatchInfo.service";
import React, { ChangeEvent, useMemo, useState } from "react";
// import IMatchData from "@MatchService/MatchData.type";
import { CharNamesEnum, CharNamesEnumDisplay } from "@Common/enums/charNames.enum";
import { MatchLinkTypeEnum, MatchLinkTypeEnumDisplay } from "@Common/enums/matchLinkType.enum";

import { createUseStyles, useTheme } from 'react-jss'
import type { CustomTheme } from '@Theme/Theme'
import IMatchData from "@MatchService/MatchData.type";
import YoutubeUtil from "@Common/util/youtube.util"
import { useDebouncedEffect } from "@Common/hooks/useDebouncedEffect"

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
const NoneOptionDisplay = { [NoneOption.NA]: "None Selected" }

type CharNamesOptions = CharNamesEnum | NoneOption
const CharNamesOptions = { ...NoneOption, ...CharNamesEnum }

const CharNamesDisplayOptions = { ...NoneOptionDisplay, ...CharNamesEnumDisplay, }
type AllowedFormValue = MatchLinkTypeEnum | number | string | null
type FormItemState = {
  value: AllowedFormValue,
  dirty: false,
  valid: boolean,
  validators: ((allowedFormValue: AllowedFormValue) => boolean)[],
  required: boolean,
}
interface FormState {
  [key: string]: FormItemState
}
export const AddMatch: React.FC = ({ ...props }: AddMatchProps) => {
  const theme: CustomTheme = useTheme<CustomTheme>()
  const classes = useStyles({ ...props, theme })
  const [formState, setFormState] = useState<FormState>({
    type: {
      value: MatchLinkTypeEnum.VI,
      dirty: false,
      valid: false,
      validators: [],
      required: true,
    },
    url: {
      value: '',
      dirty: false,
      valid: false,
      validators: [],
      required: true
    },
    timestamp: {
      value: -1,
      dirty: false,
      valid: false,
      validators: [],
      required: true
    },
    p1_char: {
      value: CharNamesOptions.NA,
      dirty: false,
      valid: false,
      validators: [],
      required: true
    },
    p2_char: {
      value: CharNamesOptions.NA,
      dirty: false,
      valid: false,
      validators: [],
      required: true
    },
    winning_char: {
      value: CharNamesOptions.NA,
      dirty: false,
      valid: false,
      validators: [],
      required: true,
    },
    p1_name: {
      value: '',
      dirty: false,
      valid: false,
      validators: [],
      required: false
    },
    p2_name: {
      value: '',
      dirty: false,
      valid: false,
      validators: [],
      required: false
    },
    videoTitle: {
      value: '',
      dirty: false,
      valid: false,
      validators: [],
      required: false
    },
    uploader: {
      value: '',
      dirty: false,
      valid: false,
      validators: [],
      required: false
    },
    dateUploaded: {
      value: '',
      dirty: false,
      valid: false,
      validators: [],
      required: false
    }
  })
  const allCharOptions = Object.keys(CharNamesOptions)
    .map(key => (
      <option key={key} value={key}>
        {CharNamesDisplayOptions[key]}
      </option>
    ))
  const winningCharOptions = useMemo(() => {
    return allCharOptions.filter(x => {
      if (x.key == formState.p1_char.value || x.key == formState.p2_char.value) {
        return x
      }
    })
  }, [formState.p1_char, formState.p2_char, allCharOptions])

  const handleChange = (event: (ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>)) => {
    const newValue = event.target.value;
    const inputName = event.target.name;
    // console.log(`${inputName} changed: ${newValue}`)
    if (formState[inputName].validators.length) {
      // console.log("Has validator")
    }
    setFormState((prevState) => {
      // console.log("Setting form state", prevState)
      const newState = {
        ...prevState,
        [inputName]: {
          ...prevState[inputName],
          value: newValue,
          dirty: true
        }
      };
      // console.log("New State", newState)
      return newState
    })
    // console.log("After update", formState)
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    // function checkRequired() {
    //   const not_dirty = Object.keys(formState).reduce((prev, cur) => {
    //     if (!formState[cur].dirty && formState[cur].required) {
    //       return [...prev, cur]
    //     } else {
    //       return prev
    //     }
    //   }, [] as string[])
    //   // console.log("Required And Not Dirty", not_dirty)
    // }
    // function checkValid() {
    //   const invalid = Object.keys(formState).reduce((prev, cur) => {
    //     if (!formState[cur].validators.length && formState[cur].dirty) {
    //       formState[cur].validators.filter(validator => {
    //         if (validator(formState[cur].value)) {
    //           return `${cur} is not valid`
    //         } else {
    //           return prev
    //         }
    //       })
    //     }
    //   }, [] as string[])
    //   // console.log("Invalid", invalid)
    // }
    // checkRequired()
    // checkValid()
    const data = Object.keys(formState).reduce((acc, key) => {
      console.log(acc, key)
      acc[key] = formState[key].value
      return acc
    }, {} as IMatchData)
    console.log(data)
    await MatchInfoService.create(data)
  }

  useDebouncedEffect(async () => {
    const url = formState.url.value as string
    if (url && YoutubeUtil.isYoutube(url)) {
      const { uploader, date_uploaded, video_title} = await MatchInfoService.ytDetails(url)
      setFormState( (state) => {
      return {
        ...state ,
        uploader: {...state.uploader, value: uploader },
        dateUploaded: {...state.dateUploaded, value: date_uploaded },
        videoTitle: {...state.uploader, value: video_title }
        
        }
      })
    }
  }, [formState.url], 1000)


  return (
    <div className={classes.container}>
      <pre style={{backgroundColor: "white"}}>{ JSON.stringify(formState,null,2)}</pre>
      <form className={classes.form} onSubmit={onSubmit}>

        <select
          name="type"
          onChange={e => handleChange(e)}
          className={classes.select} >
          <option key={MatchLinkTypeEnum.VI} value={MatchLinkTypeEnum.VI}>{MatchLinkTypeEnumDisplay['VI']}</option>
          <option key={MatchLinkTypeEnum.FC2} value={MatchLinkTypeEnum.FC2}>{MatchLinkTypeEnumDisplay['FC2']}</option>
        </select >

        <label className={classes.textInput}>
          URL
          <input name="url" value={formState.url.value} onChange={e => handleChange(e)} type="text" />
        </label>
        <label className={classes.textInput}>
          Timestamp
          <input name="timestamp" value={formState.timestamp.value} onChange={e => handleChange(e)} type="number" />
        </label>

        <select
          name='p1_char'
          onChange={e => handleChange(e)}
          className={classes.select}>
          {allCharOptions}
        </select>

        <select
          name='p2_char'
          onChange={e => handleChange(e)}
          className={classes.select}>
          {allCharOptions}
        </select>

        <select
          name='winning_char'
          onChange={e => handleChange(e)}
          className={classes.select}>
          {winningCharOptions}
        </select>


        <label className={classes.textInput}>
          Player 1 Gamertag
          <input name="p1_name" value={formState.p1_name.value} onChange={e => handleChange(e)} type="text" />
        </label>
        <label className={classes.textInput}>
          Player 2 Gamertag
          <input name="p2_name" value={formState.p2_name.value} onChange={e => handleChange(e)} type="text" />
        </label>

        <label className={classes.textInput}>
          Video Title
          <input name="videoTitle" value={formState.videoTitle.value} onChange={e => handleChange(e)} type="text" />
        </label>
        <label className={classes.textInput}>
          Uploader
          <input name="uploader" value={formState.uploader.value} onChange={e => handleChange(e)} type="text" />
        </label>
        <label className={classes.textInput}>
          Date Uploaded
          <input name="dateUploaded" value={formState.dateUploaded.value} onChange={e => handleChange(e)} type="text" />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}
