import MatchInfoService from "@MatchService/MatchInfo.service";
import React, { useEffect, useMemo, useState } from "react";
import IMatchData from "@MatchService/MatchData.type";
import { FormState, ADD_MATCH_FORM_DEFAULTS } from "./AddMatch.helpers";
import { FormTextInput } from "./components/FormTextInput.component";
import { FormOptionSelect } from "./components/FormOptionSelect.component";
import { Button, Card } from "@mui/material";
import { FormToggle } from "./components/FormToggle";
import { MatchLinkTypeFullNameToShortName, MatchLinkTypeShortNameToFullName } from "@Common/enums/matchLinkType.enum";
import { FormYoutubeInput } from "./components/FormYoutubeInput.component";
import { YoutubeEmbed } from "./components/YoutubeEmbed.component";
import { Box } from "@mui/system";
import { allCharOptions, ContentOptions } from "./components/FormDefaults.const";
import { checkRequired, checkValid, formDataToPostData, undecoratedHandleChange } from "./components/FormHelpers";

export interface AddMatchProps { }
export const AddMatch: React.FC = () => {
  const [formState, setFormState] = useState<FormState>(ADD_MATCH_FORM_DEFAULTS)
  const [areAllValid, setAreAllValid] = useState(false)
  const handleChange = undecoratedHandleChange(setAreAllValid, setFormState)
  
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

  const [submitErrors, setSubmitErrors] = useState<string[]>([])
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const required_and_not_dirty = checkRequired(formState)
    if (required_and_not_dirty.length) {
      setSubmitErrors(required_and_not_dirty)
      return
    }

    const { stateWithValidationErrors, areAllValid } = checkValid(formState)
    setAreAllValid(areAllValid)
    if ( areAllValid){
      const postData: IMatchData = formDataToPostData(stateWithValidationErrors)
      try {
        await MatchInfoService.create(postData)
      } catch (e) {
        console.log("Errors:", e)
      }
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
      const { stateWithValidationErrors, areAllValid } = checkValid(newState)
      setAreAllValid(areAllValid)
      return stateWithValidationErrors
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
      return (
        <FormTextInput 
          onChange={handleChange} 
          formItemState={formState.url} 
        />)
    }
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'row', backgroundColor: 'black', padding: "20px" }}>
      <Box sx={{ display: 'flex', flexGrow: 1, maxWidth: "500px", padding: "20px" }}>
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
          <FormTextInput 
            onChange={handleChange} 
            formItemState={formState.p1_name} 
          />
          <FormTextInput 
            onChange={handleChange} 
            formItemState={formState.p2_name} 
            />
          {
            submitErrors.length > 0 &&
            <div>
              <p>
                The following fields were required but not supplied:
              </p>
              {submitErrors.map((error, i) => <div key={i}> {error}</div>)}
            </div>
          }
          <Button
            type="submit"
            disabled={!areAllValid}
            fullWidth
          > Submit </Button>
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
