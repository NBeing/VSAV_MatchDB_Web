import MatchInfoService from "@MatchService/MatchInfo.service";
import React, { useEffect, useMemo, useState } from "react";
import IMatchData from "@MatchService/MatchData.type";
import { allCharOptions, FormItemOnChange, FormState, INITIAL_FORM_STATE, ContentOptions, AllowedFormValue } from "./AddMatch.helpers";
import { FormTextInput } from "./components/FormTextInput.component";
import { FormOptionSelect } from "./components/FormOptionSelect.component";
import { Card } from "@mui/material";
import { FormToggle } from "./components/FormToggle";
import { CharFullNameToShortName } from "@Common/enums/charNames.enum";
import { MatchLinkTypeFullNameToShortName, MatchLinkTypeShortNameToFullName } from "@Common/enums/matchLinkType.enum";
import { FormYoutubeInput } from "./components/FormYoutubeInput.component";
// import IMatchData from "@MatchService/MatchData.type";

export interface AddMatchProps { }
export const AddMatch: React.FC = () => {
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE)

  // Update the options for the winning character when p1 or p2 char
  const winningCharOptions = useMemo(() => {
    return allCharOptions.filter(charOption => {
      if (charOption.key == formState.p1_char.value || charOption.key == formState.p2_char.value) {
        return charOption
      }
    })
  }, [formState.p1_char, formState.p2_char])

  // Set the winning char to null automatically when p1 or p2 changes
  useEffect(() => {
    setFormState((prevState: FormState) => ({
        ...prevState,
        "winning_char": {
          ...prevState["winning_char"],
          value: null,
          dirty: true
        }
      }))
  }, [formState.p1_char, formState.p2_char])

  const checkRequired = () => {
    const required_and_not_dirty = Object.keys(formState).reduce((prev, cur) => {
      const formItem = formState[cur]
      let required:boolean
      if ( 
        formItem.name === "timestamp" && 
        formItem.value === MatchLinkTypeFullNameToShortName.FC2
      ){
        required = false
      } else {
        required = formItem.required
      }
  
      if (!formItem.dirty && required) {
        return [...prev, cur]
      } else {
        return prev
      }
    }, [] as string[])
    return required_and_not_dirty
  }

  const [allValid, setAllValid] = useState(false) 
  // Make this less imperative lol
  const checkValid = (formState: FormState) => {
    let allAreValid = true
    Object.keys(formState).forEach(cur => {
      const currentFormItem = formState[cur]
      // Kludge for fc2 timestamp
      const isFC2wTimestamp = currentFormItem.name === "timestamp" && currentFormItem.value === MatchLinkTypeFullNameToShortName.FC2
      if(isFC2wTimestamp) {
        currentFormItem.required = false
        currentFormItem.validators = []
      }

      console.log("Looking at", cur, currentFormItem)
      if (currentFormItem.validators.length && currentFormItem.dirty) {
        console.log("Checking for", cur)
        currentFormItem.validationErrors = []
        currentFormItem.validators.forEach(validator => {
          console.log(validator(currentFormItem.value as string))
          if (!validator(currentFormItem.value as string)) {
            console.log(validator)
            currentFormItem.validationErrors = [...currentFormItem.validationErrors, validator.name]
            currentFormItem.valid = false
            allAreValid = false
          }
        })
        if (currentFormItem.validationErrors.length === 0){
            currentFormItem.valid = true
        }
      }
      if (
        currentFormItem.dirty && currentFormItem.validationErrors.length === 0 ||
        !currentFormItem.dirty && !currentFormItem.required
      ){
        currentFormItem.valid = true
      }
    }, formState)
    setAllValid(allAreValid)
    return formState
  }
  
  const handleChange = (_event: unknown, formItemOnChange:FormItemOnChange | null) => {
    // console.log("Handle change", formItemOnChange)
    if ( !formItemOnChange ) {
      return
    }
    const newValue  = formItemOnChange.value;
    const inputName = formItemOnChange.name;
    console.log("New", newValue,"Inp", inputName)

    setFormState((prevState: FormState) => {
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
  const formDataToPostData = (formState:FormState) => {
    console.log("formstate before", formState)
    const data = Object.keys(formState).reduce((acc, key) => {
      acc[key] = formState[key].value
      return acc
    }, {} as Record<keyof FormState, AllowedFormValue>)

    data.p1_char      = CharFullNameToShortName[formState.p1_char.value as string]
    data.p2_char      = CharFullNameToShortName[formState.p2_char.value as string]
    data.winning_char = CharFullNameToShortName[formState.winning_char.value as string]
    data.type         = MatchLinkTypeFullNameToShortName[formState.type.value as string]
    if ( data.type === MatchLinkTypeFullNameToShortName.FC2 ){
      delete data.timestamp
    }
    
    console.log("Data type", data.type, MatchLinkTypeFullNameToShortName[formState.type.value as string] )
    // Ugh
    return data as unknown as IMatchData
  }
  const [submitErrors, setSubmitErrors] = useState<string[]>([])
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const required_and_not_dirty = checkRequired()
    if (required_and_not_dirty.length) {
      setSubmitErrors(required_and_not_dirty)
      return
    }
    checkRequired()
    checkValid(formState)

    const postData:IMatchData = formDataToPostData(formState)
    try {
      await MatchInfoService.create(postData)
    } catch (e){
      console.log("Errors:" , e)
    }
  }

  const ContentInputType = () => {
    if ( formState.type.value === MatchLinkTypeShortNameToFullName.VI ){
      const formItemState = {
        url: formState.url,
        timestamp: formState.timestamp,
      }
      return (<FormYoutubeInput onChange={handleChange} formItemState ={formItemState}/>)
    } else { 
      return (<FormTextInput onChange={handleChange} formItemState={formState.url}></FormTextInput>)
    } 
  }

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <FormToggle 
          onChange={handleChange}
          options={ ContentOptions }
          formItemState={formState.type}
          defaultValue={MatchLinkTypeShortNameToFullName.VI}
        />
        { ContentInputType() }

        <FormOptionSelect 
          onChange={handleChange}
          options={allCharOptions}
          formItemState={formState.p1_char}
        />
        <FormOptionSelect 
          onChange={handleChange}
          options={allCharOptions}
          formItemState={formState.p2_char} 
        />
        { ( formState.p1_char.value && formState.p2_char.value ) &&
          <FormToggle 
            onChange={handleChange}
            options={ winningCharOptions }
            formItemState={formState.winning_char}
            defaultValue={null}
          >{formState.p1_char.value}{ formState.p2_char.value}</FormToggle>
        }
        <FormTextInput onChange={handleChange} formItemState={formState.p1_name}></FormTextInput>
        <FormTextInput onChange={handleChange} formItemState={formState.p2_name}></FormTextInput>
        {
          submitErrors.length &&
          <div>
            <p>
              The following fields were required but not supplied:
            </p>
            {submitErrors.map((error, i) => <div key={i}> {error}</div>)}
          </div>
        }
        <input type="submit" disabled={!allValid} />
      </form>
    </Card>
  );
}
