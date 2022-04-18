import MatchInfoService from "@MatchService/MatchInfo.service";
import React, { ChangeEvent, useMemo, useState } from "react";
// import IMatchData from "@MatchService/MatchData.type";
import { MatchLinkTypeEnum, MatchLinkTypeEnumDisplay } from "@Common/enums/matchLinkType.enum";

import { useTheme } from 'react-jss'
import type { CustomTheme } from '@Theme/Theme'
import IMatchData from "@MatchService/MatchData.type";
import YoutubeUtil from "@Common/util/youtube.util"
import { useDebouncedEffect } from "@Common/hooks/useDebouncedEffect"
import { allCharOptions, FormState, INITIAL_FORM_STATE } from "./AddMatch.helpers";
import { useStyles } from "./AddMatch.styles";
import { FormTextInput } from "./components/FormTextInput.component";
import { FormOptionSelect } from "./components/FormOptionSelect.component";


export interface AddMatchProps { }
export const AddMatch: React.FC = ({ ...props }: AddMatchProps) => {
  const theme: CustomTheme = useTheme<CustomTheme>()
  const classes = useStyles({ ...props, theme })
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE)

  const winningCharOptions = useMemo(() => {
    return allCharOptions.filter(charOption => {
      if (charOption.key == formState.p1_char.value || charOption.key == formState.p2_char.value) {
        return charOption.key
      }
    })
  }, [formState.p1_char, formState.p2_char])

  const checkRequired = () => {
    const required_and_not_dirty = Object.keys(formState).reduce((prev, cur) => {
      if (!formState[cur].dirty && formState[cur].required) {
        return [...prev, cur]
      } else {
        return prev
      }
    }, [] as string[])
    return required_and_not_dirty
  }

  const checkValid = (formState: FormState) => {
    Object.keys(formState).forEach(cur => {
      console.log("Looking at", cur, formState[cur])
      if (formState[cur].validators.length && formState[cur].dirty) {
        console.log("Checking for", cur)
        formState[cur].validationErrors = []
        formState[cur].validators.forEach(validator => {
          console.log(validator(formState[cur].value))
          if (!validator(formState[cur].value)) {
            console.log(validator)
            formState[cur].validationErrors = [...formState[cur].validationErrors, validator.name]
            formState[cur].valid = false
          }
        })
        if (formState[cur].validationErrors.length === 0){
            formState[cur].valid = true
        }
      }
      if (formState[cur].validationErrors.length === 0){
        formState[cur].valid = true
      }
    }, formState)
    console.log("new formstate", formState)
    return formState
  }
  const handleChange = (event: (ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>)) => {
    const newValue = event.target.value;
    const inputName = event.target.name;

    setFormState((prevState: FormState) => {
      // console.log("Setting form state", prevState)
      let newState = {
        ...prevState,
        [inputName]: {
          ...prevState[inputName],
          value: newValue,
          dirty: true
        }
      };
      newState = checkValid(newState)
      return newState
    })
  }

  const [submitErrors, setSubmitErrors] = useState<string[]>([])
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const required_and_not_dirty = checkRequired()
    if (required_and_not_dirty.length) {
      console.log("Required And Not Dirty", required_and_not_dirty)
      setSubmitErrors(required_and_not_dirty)
      return
    }
    checkRequired()
    // checkValid()
    const data = Object.keys(formState).reduce<IMatchData>((acc, key) => {
      console.log(acc, key)
      acc[key] = formState[key].value
      return acc
    }, {} as IMatchData)
    console.log(data)
    await MatchInfoService.create(data)
  }

  const [loadingVideoDetail, setLoadingVideoDetail] = useState({ isLoading: false, isLoaded: false })
  useDebouncedEffect(async () => {
    const url = formState.url.value as string
    if (url && YoutubeUtil.isYoutube(url)) {
      setLoadingVideoDetail((state) => ({ ...state, isLoading: true }))
      const { uploader, date_uploaded, video_title } = await MatchInfoService.ytDetails(url)
      setFormState((state) => {
        return {
          ...state,
          uploader: { ...state.uploader, value: uploader },
          dateUploaded: { ...state.dateUploaded, value: date_uploaded },
          videoTitle: { ...state.uploader, value: video_title }

        }
      })
      setLoadingVideoDetail((state) => ({ ...state, isLoaded: true }))
    }
  }, [formState.url], 1000)


  return (
    <div className={classes.container}>
      {/* <pre style={{backgroundColor: "white"}}>{ JSON.stringify(formState,null,2)}</pre> */}
      <select
        name="type"
        onChange={e => handleChange(e)}
        className={classes.select} >
        <option key={MatchLinkTypeEnum.VI} value={MatchLinkTypeEnum.VI}>{MatchLinkTypeEnumDisplay['VI']}</option>
        <option key={MatchLinkTypeEnum.FC2} value={MatchLinkTypeEnum.FC2}>{MatchLinkTypeEnumDisplay['FC2']}</option>
      </select >

      <form className={classes.form} onSubmit={onSubmit}>
        <FormTextInput onChange={e => handleChange(e)} formItemState={formState.url}></FormTextInput>
        <FormTextInput onChange={e => handleChange(e)} formItemState={formState.timestamp}></FormTextInput>
        {((formState.type.value == MatchLinkTypeEnum.VI) && loadingVideoDetail.isLoaded) &&
          <>
            <FormTextInput onChange={e => handleChange(e)} formItemState={formState.videoTitle}></FormTextInput>
            <FormTextInput onChange={e => handleChange(e)} formItemState={formState.uploader}></FormTextInput>
            <FormTextInput onChange={e => handleChange(e)} formItemState={formState.dateUploaded}></FormTextInput>
          </>
        }
        <FormOptionSelect 
          onChange={e => handleChange(e)}
          options={allCharOptions}
          formItemState={formState.p1_char}
        />
        <FormOptionSelect 
          onChange={e => handleChange(e)}
          options={allCharOptions}
          formItemState={formState.p2_char} 
        />
        <FormOptionSelect 
          onChange={e => handleChange(e)}
          options={winningCharOptions}
          formItemState={formState.winning_char} 
        />
        <FormTextInput onChange={e => handleChange(e)} formItemState={formState.p1_name}></FormTextInput>
        <FormTextInput onChange={e => handleChange(e)} formItemState={formState.p2_name}></FormTextInput>
        {
          submitErrors.length &&
          <div>
            <p style={{ color: "white" }}>
              The following fields were required but not supplied:
            </p>
            {submitErrors.map((error, i) => <div key={i} style={{ color: "white" }}> {error}</div>)}
          </div>
        }
        <input type="submit" />
      </form>
    </div>
  );
}
