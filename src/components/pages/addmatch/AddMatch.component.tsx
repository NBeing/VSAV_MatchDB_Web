import MatchInfoService from "@MatchService/MatchInfo.service";
import React, { useEffect, useMemo, useState } from "react";
import IMatchData from "@MatchService/MatchData.type";
import { allCharOptions, FormItemOnChange, FormState, INITIAL_FORM_STATE, ContentOptions, AllowedFormValue, FormItemState } from "./AddMatch.helpers";
import { FormTextInput } from "./components/FormTextInput.component";
import { FormOptionSelect } from "./components/FormOptionSelect.component";
import { Card } from "@mui/material";
import { FormToggle } from "./components/FormToggle";
import { CharFullNameToShortName } from "@Common/enums/charNames.enum";
import { MatchLinkTypeFullNameToShortName, MatchLinkTypeShortNameToFullName } from "@Common/enums/matchLinkType.enum";
import { FormYoutubeInput } from "./components/FormYoutubeInput.component";
import { YoutubeEmbed } from "./components/YoutubeEmbed.component";
import { Box } from "@mui/system";
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
  }, [formState.p1_char.value, formState.p2_char.value])

  useEffect(() => {
    setFormState((prevState: FormState) => ({
      ...prevState,
      "timestamp": {
        ...prevState["timestamp"],
        required: prevState.type.value === MatchLinkTypeFullNameToShortName.VI
      }
    }))
  }, [formState.type.value])

  const checkRequired = () => {
    const required_and_not_dirty = Object.keys(formState).reduce((requiredItemsAcc, cur) => {
      const formItem = formState[cur]
      if (!formItem.dirty && formItem.required) {
        return [...requiredItemsAcc, cur]
      } else {
        return requiredItemsAcc
      }
    }, [] as string[])
    return required_and_not_dirty
  }

  const [areAllValid, setAreAllValid] = useState(false)
  // Make this less imperative lol
  const checkValid = (formState: FormState) => {
    let areAllValid = true

    const stateWithValidationErrors = Object.keys(formState).reduce((acc, key) => {
      acc[key] = { ...formState[key], validationErrors: [] }

      const validationErrors = formState[key].validators.reduce((acc, validator) => {

        if (!validator(formState[key].value as string)) {
          acc = [...acc, validator.name]
          areAllValid = false
        }
        return acc
      }, [] as string[])

      acc[key].validationErrors = validationErrors
      acc[key].valid = validationErrors.length == 0

      return acc
    }, {} as Record<keyof FormState, FormItemState>)

    setAreAllValid(areAllValid)
    return stateWithValidationErrors
  }

  const handleChange = (_event: unknown, formItemOnChange: FormItemOnChange | null) => {
    if (!formItemOnChange) {
      return
    }
    const newValue = formItemOnChange.value;
    const inputName = formItemOnChange.name;
    console.log("New", newValue, "Inp", inputName)

    setFormState((prevState: FormState) => {
      const newState = {
        ...prevState,
        [inputName]: {
          ...prevState[inputName],
          value: newValue,
          dirty: true
        }
      };
      return checkValid(newState)
    })

  }
  const formDataToPostData = (formState: FormState) => {
    const data = Object.keys(formState).reduce((acc, key) => {
      acc[key] = formState[key].value
      return acc
    }, {} as Record<keyof FormState, AllowedFormValue>)

    data.p1_char = CharFullNameToShortName[formState.p1_char.value as string]
    data.p2_char = CharFullNameToShortName[formState.p2_char.value as string]
    data.winning_char = CharFullNameToShortName[formState.winning_char.value as string]
    data.type = MatchLinkTypeFullNameToShortName[formState.type.value as string]
    if (data.type === MatchLinkTypeFullNameToShortName.FC2) {
      data.timestamp = null
    }
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

    const postData: IMatchData = formDataToPostData(formState)
    try {
      await MatchInfoService.create(postData)
    } catch (e) {
      console.log("Errors:", e)
    }
  }

  const updateTimestamp = (timestamp: number) => {
    setFormState((prevState: FormState) => {
      const newState = {
        ...prevState,
        ['timestamp']: {
          ...prevState['timestamp'],
          value: timestamp,
          dirty: true
        }
      };
      return checkValid(newState)
    })
  }
  const ContentInputType = () => {
    if (formState.type.value === MatchLinkTypeShortNameToFullName.VI) {
      const formItemState = {
        url: formState.url,
        timestamp: formState.timestamp,
      }
      return (
        <FormYoutubeInput
          onChange={handleChange}
          formState={formItemState}
        />)
    } else {
      return (<FormTextInput onChange={handleChange} formItemState={formState.url}></FormTextInput>)
    }
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'row', backgroundColor: 'black', maxWidth: "800px" }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <form onSubmit={onSubmit} style={{ flexGrow: 1 }}>
          <FormToggle
            onChange={handleChange}
            options={ContentOptions}
            formItemState={formState.type}
            defaultValue={MatchLinkTypeShortNameToFullName.VI}
          />
          {ContentInputType()}

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
          {(formState.p1_char.value && formState.p2_char.value) &&
            <FormToggle
              onChange={handleChange}
              options={winningCharOptions}
              formItemState={formState.winning_char}
              defaultValue={null}
            >{formState.p1_char.value}{formState.p2_char.value}</FormToggle>
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
          <input type="submit" disabled={!areAllValid} />
        </form>
      </Box>
      {formState.url.value !== '' && (formState.type.value === MatchLinkTypeShortNameToFullName.VI) && 

        (<Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 2 }}>
          <YoutubeEmbed
            updateTimestamp={updateTimestamp}
            formState={{
              url: formState.url,
              timestamp: formState.timestamp,
            }}
          />
        </Box>)
      }

    </Card>
  );
}
